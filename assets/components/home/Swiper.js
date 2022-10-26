import React from 'react';
import {
  Alert,
  Image,
  BackHandler,
  RNExitApp,
  Platform,
  Pressable,
  StatusBar,
  Linking,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {styles, stylesSlide} from './styleSwiper';
import VersionCheck from 'react-native-version-check';
import tsconfig from '../../tsconfig.json';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Renderload} from '../../libs/LoadApp';

let txtLaApp = '';
let txtReporta = '';
let txtReportaDan = '';
let txtReportaAyuda = '';
let txtRecibe = '';
let txtRecibeNotif = '';
let txtRecibeAyuda = '';
let txtSaltar = '';
let txtversion = tsconfig[tsconfig.use].type;

class SliderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.swiper = React.createRef();
    this.state = {
      slider: true,
      saltar: false,
      paramsTrue: false,
      home: false,
      slideTrue: true,
      parametros: [],
      load: false,
      tiempoCarga: 2000,
    };
  }

  setLoadVisible = load => {
    this.setState({load});
  };
  saltarPress = () => {
    this.props.navigation.navigate('Home', {
      dato: JSON.stringify({...this.state}),
    });
    AsyncStorage.setItem('slide', 'Ok').then();
  };

  async componentDidMount() {
    try {
      let objTue = await AsyncStorage.getItem('slide');
      if (objTue === 'Ok') {
        this.props.navigation.navigate('Home', {
          dato: JSON.stringify({...this.state}),
        });
      }
    } catch (e) {}
    this.setLoadVisible(true);
    let res = await this.comprobarInternet();
    if (res) {
      await this.cargarParametros().then(() => {});
      this.setLoadVisible(false);
      this.verified();
    } else if (!res) {
      window.modalAlerta(
        'ReportesMed',
        'Se necesita acceso a una conexión internet para continuar.',
        [
          {text: 'Aceptar', onPress: () => this.componentDidMount()},
          {
            text: 'Cerrar',
            onPress: () => {
              Platform.OS === 'ios'
                ? RNExitApp.exitApp()
                : BackHandler.exitApp();
            },
          },
        ],
      );
    }
  }

  verified = () => {
    // if (Platform.OS !== 'ios') {
    // console.log('Version actual: ' + VersionCheck.getCurrentVersion());
    try {
      VersionCheck.needUpdate()
        .then(res => {
          // console.log(res);
          if (res.isNeeded) {
            this.setState({saltar: false});

            window.modalAlerta(
              this.state.parametros.titleUpdate,
              this.state.parametros.msgUpdate,
              [
                {
                  text: 'Actualizar Ahora',
                  onPress: () => {
                    if (Platform.OS !== 'ios') {
                      Linking.openURL(
                        'https://play.google.com/store/apps/details?id=co.com.hyg.HuecosMed&hl=es_CO&gl=US',
                      );
                    } else {
                      Linking.openURL(
                        'https://apps.apple.com/co/app/reportesmed/id1182410336',
                      );
                    }
                  },
                },
              ],
              true,
              true,
              2,
            );
          } else {
            this.cambioSlide().then();
          }
        })
        .catch(e => {
          this.cambioSlide().then();
        });
    } catch (e) {
      console.log(e.message);
    }
    // } else {
    //     this.cambioSlide().then();
    // }
  };

  async cambioSlide() {
    let objTue = await AsyncStorage.getItem('slide');
    // setTimeout(async () => {
    if (this.state.slider) {
      if (objTue === 'Ok') {
        this.props.navigation.navigate('Home', {
          dato: JSON.stringify({...this.state}),
        });
        this.setState({slideTrue: true});
        this.setState({slider: true});
      } else {
        this.props.navigation.navigate('Slider', {
          dato: JSON.stringify({...this.state}),
        });
        this.setState({slider: false});
      }
    }
    // }, this.state.tiempoCarga);
  }

  async comprobarInternet() {
    // this.setLoadVisible(true);
    try {
      let res = await axios.get('https://www.medellin.gov.co/', {});
      if (res.status === 200) {
        // this.setLoadVisible(false);
        this.setState({saltar: true});
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  async cargarParametros() {
    let response = await fetch(tsconfig[tsconfig.use].params);
    let textos = await response.json();
    AsyncStorage.setItem('params', JSON.stringify(textos));
    this.setState({parametros: textos});
    txtSaltar = textos.SALTAR;
    txtReporta = textos.REPORTA;
    txtReportaDan = textos.REPORTADAN;
    txtReportaAyuda = textos.REPORTAINFO;
    txtRecibe = textos.RECIBE;
    txtRecibeNotif = textos.NOTIF;
    txtRecibeAyuda = textos.RECIBEINFO;
    txtLaApp = textos.LAAPP;
    if (textos.TIEMPO) {
      this.setState({tiempoCarga: parseInt(textos.TIEMPO)});
    }
    this.setState({paramsTrue: true});
  }

  async componentDidUpdate() {
    if (!this.state.paramsTrue) {
      await this.cargarParametros();
    }
  }

  renderSlider() {
    return (
      <Swiper
        autoplay={false}
        showsButtons={false}
        showsPagination={true}
        ref={this.swiper}
        effect="Fade"
        dot={
          <View
            style={{
              backgroundColor: '#fff',
              width: 10,
              height: 10,
              borderRadius: 50,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: '#03AED8',
              width: 25,
              height: 25,
              borderRadius: 50,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
        paginationStyle={{
          bottom: '13%',
        }}
        preloadImages={false}
        loop={false}>
        <View style={stylesSlide.slide}>
          <Image
            source={require('../../iconos/splash/slideUno.png')}
            style={[styles.iconFooter]}
          />
          <View style={styles.contenedor}>
            <Text style={styles.reportar}>{txtReporta}</Text>
            <Text style={styles.reportarDanos}>{txtReportaDan}</Text>
            <Text style={styles.reportarTxt}>{txtReportaAyuda}</Text>
            </View>
        </View>
        <View style={stylesSlide.slide}>
          <Image
            source={require('../../iconos/splash/SlideDos.png')}
            style={[styles.iconFooter]}
          />
          <View style={styles.contenedor}>
            <Text style={styles.reportar}>{txtRecibe}</Text>
            <Text style={styles.reportarDanos}>{txtRecibeNotif}</Text>
            <Text style={styles.reportarTxt}>{txtRecibeAyuda}</Text>
          </View>
        </View>
      </Swiper>
    );
  }

  renderSplit() {
    return (
      <View style={styles.Container}>
        <Text style={styles.version}>{txtversion}</Text>
        <View style={styles.content}>
          <Image
            source={require('../../iconos/splash/REPORTESMEDHOME2.png')}
            style={styles.iconHuecos}
          />
          <Image
            source={require('../../iconos/splash/logo-alcaldia2.png')}
            style={styles.iconLogo}
          />
          <Text style={styles.textLaApp}>
            {'LA APP '}
            <Text style={styles.textBold}>{'DE LA ALCALDÍA DE MEDELLÍN '}</Text>
            {' QUE LE PERMITE A LA COMUNIDAD'}
            <Text style={styles.textBold}>
              {' REPORTAR DIFERENTES TIPOS DE DAÑOS'}
            </Text>
            {' EN SECTORES DE LA CIUDAD'}
          </Text>
        </View>
        <Image
          source={require('../../iconos/panel.png')}
          style={styles.iconPanel}
        />

        {this.state.saltar && (
          <Pressable
            style={{
              bottom: '1%',
              position: 'absolute',
              alignContent: 'flex-end',
              padding: 3,
              right: responsiveWidth(-45),
            }}
            onPress={() => {
              this.setState({slider: false});
              this.saltarPress();
            }}>
            <Text style={{color: '#08517F'}}>
              Saltar
              <IconAntDesign
                name={'forward'}
                color={'#08517F'}
                size={responsiveFontSize(2)}
              />
            </Text>
          </Pressable>
        )}
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.Container,
          this.state.slider ? {backgroundColor: 'transparent'} : {},
        ]}>
        <StatusBar hidden={true} barStyle="dark-content" />
        <Renderload
          load={this.state.load}
          setLoadVisible={this.setLoadVisible}
        />
        {this.state.slider ? this.renderSplit() : this.renderSlider()}
        {this.state.slider ? null : (
          <Pressable style={styles.btn} onPress={this.saltarPress}>
            <Text style={styles.btnText}>{txtSaltar}</Text>
          </Pressable>
        )}
      </View>
    );
  }
}

export default SliderScreen;
