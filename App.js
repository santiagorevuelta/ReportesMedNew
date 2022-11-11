import React, {createRef, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import SliderView from './assets/components/home/Swiper';
import PlantillaUnoUbic from './assets/components/screens/PlantillaScreenUno';
import PlantillaUnoRep from './assets/components/screens/PlantillaScreenDos';
import HomeView from './assets/components/home/GetHome';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Image, Platform} from 'react-native';
import {theme} from './assets/theme';
import ModalAlert from './assets/Alerta';
import VariablesState from './Context/variables/VariablesState';
import {enableScreens} from 'react-native-screens';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

//import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();
const alerta = React.createRef();
export const subscribeTopic = async topic => {
  messaging()
    .subscribeToTopic(topic)
    .then(() => console.log(topic))
    .catch(e => {
      console.log(e);
    });
};
let intento = 0;
// const firebaseConfig = {
//   apiKey: "AIzaSyCitT0d-8UP-0j8jYaHcYhlJXtiaYRHotE",
//   authDomain: "reportesmed-3b4f9.firebaseapp.com",
//   projectId: "reportesmed-3b4f9",
//   storageBucket: "reportesmed-3b4f9.appspot.com",
//   messagingSenderId: "1046828790681",
//   appId: "1:1046828790681:web:07b31a50a613da4d741908"
// };
async function requestUserPermission() {
  if (!firebase.apps.length) {
    await firebase.initializeApp({
      apiKey: 'AIzaSyBSmM2io-karSZA8YIZAhT-hKaAJnAatDg',
      appId: '1:1046828790681:android:2ddbe69d5945f7a6741908',
      databaseURL: 'https://reportesmed-3b4f9.firebaseio.com',
      messagingSenderId: '1046828790681',
      projectId: 'reportesmed-3b4f9',
      storageBucket: 'reportesmed-3b4f9.appspot.com',
    });
  }
  const authorizationStatus = await messaging().requestPermission();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  if (authorizationStatus) {
    const token = await messaging().getToken();
    console.log('Permission Token:', token);
  }
  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   // console.log('Message handled in the background!', remoteMessage);
  //   return;
  // });
  enableScreens(true);
}
const showNotification = notification => {
  PushNotification.localNotification({
    title: notification.title,
    message: notification.body,
  });
  window.modalAlerta(
    notification.title,
    notification.body,
    [{text: 'Aceptar'}],
    true,
    true,
    2,
  );
};
window.modalAlerta = function (
  _title = '',
  _msg = '',
  _btns = [{text: 'Aceptar'}],
  _modalVisible = true,
  _typeModal = false,
  _imgModal = 1,
) {
  try {
    alerta.current?.mostrarAlerta(
      _title,
      _msg,
      _btns,
      _modalVisible,
      _typeModal,
      _imgModal,
    );
  } catch {
    if (intento === 0) {
      window.modalAlerta(
        _title,
        _msg,
        _btns,
        _modalVisible,
        _typeModal,
        _imgModal,
      );
    }
    intento++;
  }
};

const navigationOptions = {
  title: '',
  headerShown: false,
  headerLeft: null,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
  gesturesEnabled: false,
  headerTransparent: true,
};

const App: () => Node = () => {
  subscribeTopic('ReportesMed');
  requestUserPermission();
  // useEffect(() => {
  //   messaging()
  //     .getDidOpenSettingsForNotification()
  //     .then(async didOpenSettingsForNotification => {
  //       if (didOpenSettingsForNotification) {
  //         navigate('NotificationsSettingsScreen');
  //       }
  //     });
  // }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (Platform.OS !== 'ios') {
        showNotification(remoteMessage.notification);
      } else {
        PushNotificationIOS.requestPermissions().then(() =>
          showNotification(remoteMessage.notification),
        );
      }
    });
    return unsubscribe;
  }, []);
  return (
    <VariablesState>
      <ModalAlert ref={alerta} />
      <NavigationContainer independent={true} theme={theme} ref={createRef()}>
        <Stack.Navigator
          initialRouteName={'Slider'}
          screenOptions={{gestureEnabled: false}}>
          <Stack.Screen
            name="Slider"
            component={SliderView}
            options={navigationOptions}
          />
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={navigationOptions}
          />
          <Stack.Screen
            name="PlantillaUno"
            component={PlantillaUnoUbic}
            options={({route}) => res(route)}
          />
          <Stack.Screen
            name="PlantillaUnoReporte"
            component={PlantillaUnoRep}
            options={({route}) => res(route)}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </VariablesState>
  );
};

const res = route => {
  let t = route.params.title ? route.params.title.length > 10 : false;
  let json = route.params.modulo.json_plantilla.header;

  return {
    title: route.params.title ? route.params.title : 'Ubicación del reporte',
    headerTintColor: json?.color ? json.color : '#EBF3FA',
    headerBackTitle: ' ',
    headerTitleAlign: t ? 'left' : 'center',
    headerTitleStyle: {
      textAlign: 'left',
      marginRight: '16%',
      marginBottom: Platform.OS === 'ios' ? 19 : 0,
      fontSize: responsiveFontSize(2.2),
    },
    animationTypeForReplace: 'push',
    headerLeftContainerStyle: {
      marginLeft: 10,
      marginBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    headerRight: props => <LogoTitle {...props} />,
    headerStyle: {
      height: responsiveHeight(10),
      backgroundColor: json?.background ? json.background : '#08517F',
      borderWidth: 0,
    },
    colors: {
      backgroundColor: '#E0E0E0',
      background: '#E0E0E0',
    },
  };
};

function LogoTitle() {
  return (
    <Image
      style={{
        width: 100,
        marginRight: 10,
        marginBottom: Platform.OS === 'ios' ? 50 : 0,
        height: 45,
        resizeMode: 'contain',
      }}
      source={require('./assets/iconos/tittleAlcaldiaSin.png')}
    />
  );
}

export default App;
