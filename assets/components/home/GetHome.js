import React from 'react';
import {Image, Platform, StyleSheet} from 'react-native';

import HomeScreen from './Modulos/modulos';
import SeguimientoScreen from './Seguimiento/Seguimiento';
const segoei = Platform.OS !== 'ios' ? 'segoeui' : 'SegoeUI-Bold';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    if (Platform.OS !== 'ios') {
      showNotification(remoteMessage.notification);
    } else {
      PushNotificationIOS.requestPermissions().then(() =>
        showNotification(remoteMessage.notification),
      );
    }
  });
  const showNotification = notification => {
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body,
    });
  };
  return unsubscribe;
}

const Tab = createBottomTabNavigator();

class GetHome extends React.Component {
  constructor() {
    super();
    this.state = {
      texts: {},
      mainView: true,
      int: true,
    };
  }

  async componentDidMount() {
    this.initial().then();
  }

  initial = async () => {
    if (this.state.init) {
      let res = await AsyncStorage.getItem('params');
      this.setState({texts: JSON.parse(res), init: false});
      requestUserPermission();
    }
  };

  render() {
    return (
      <Tab.Navigator
        theme={theme}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'rgb(220,219,219)',
          tabBarStyle: {
            position: 'absolute',
            paddingBottom: 10,
            backgroundColor: '#08517F',
            fontFamily: segoei,
            height: responsiveScreenHeight(9),
            zIndex: 1,
          },
        }}
        initialRouteName={'HomeMod'}>
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          listeners={{
            tabPress: e => {
              e.preventDefault();
            },
          }}
          options={{
            title: '',
            tabBarVisible: false,
            tabBarIcon: () => {
              return null;
            },
          }}
        />
        <Tab.Screen
          name="HomeMod"
          component={HomeScreen}
          options={{
            title: ' ',
            tabBarIcon: () => {
              return (
                <Image
                  source={require('../../iconos/tabs/homeActive.png')}
                  style={styles.iconHomeActive}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Seguimiento"
          component={SeguimientoScreen}
          options={{
            tabBarLabel: 'Seguir Reporte',
            tabBarIcon: ({color, focused}) => (
              <Image
                source={require('../../iconos/iconSeguimiento.png')}
                style={styles.iconActive}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabHome: {
    backgroundColor: 'rgba(125,161,193,0.49)',
  },
  icon: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(5),
    resizeMode: 'contain',
  },
  iconHomeActive: {
    width: '130%',
    height: '130%',
    top: -2,
    resizeMode: 'contain',
  },
  iconActive: {
    width: responsiveScreenWidth(14),
    height: responsiveScreenWidth(5),
    resizeMode: 'contain',
  },
  image: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(80),
    resizeMode: 'contain',
    opacity: 0.2,
  },
});
export default GetHome;
