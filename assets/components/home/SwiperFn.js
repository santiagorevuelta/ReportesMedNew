import React, {createRef, useContext, useEffect, useState} from 'react';
import {
    Alert,
    Image,
    BackHandler,
    RNExitApp,
    Platform,
    Pressable,
    StatusBar,
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
import VariableContext from '../../../Context/variables/VariableContext';

let txtLaApp = '';
let txtReporta = '';
let txtReportaDan = '';
let txtReportaAyuda = '';
let txtRecibe = '';
let txtRecibeNotif = '';
let txtRecibeAyuda = '';
let txtSaltar = '';
let txtversion = tsconfig[tsconfig.use].type;
let tiempoCarga = 4000;

function SliderScreen({navigation}) {
    const [slider, setSlider] = useState(true);
    const [saltar, setSaltar] = useState(false);
    const [paramsTrue, setParamsTrue] = useState(false);
    const [parametros, setParametros] = useState([]);
    const [load, setLoad] = useState(false);
    const {variables, updateVariables, deleteVariables} =
        useContext(VariableContext);

    const setLoadVisible = load => {
        setLoad({load});
    };

    const saltarPress = () => {
        navigation.navigate('Home', {
            dato: JSON.stringify({parametros}),
        });
        AsyncStorage.setItem('slide', 'Ok');
    };

    async function componentDidMount() {
        let res = await comprobarInternet();
        if (res) {
            setLoadVisible(false);
            await cargarParametros().then(() => {});
            verified();
        } else if (!res) {
            window.modalAlerta(
                'ReportesMed',
                'Se necesita acceso a una conexión internet para continuar.',
                [
                    {text: 'Aceptar', onPress: () => componentDidMount()},
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

    const verified = () => {
        if (Platform.OS !== 'ios') {
            try {
                VersionCheck.needUpdate()
                    .then(res => {
                        if (res.isNeeded) {
                            window.modalAlerta(
                                '',
                                'Nueva actualización disponible',
                                [
                                    {
                                        text: 'Aceptar',
                                        onPress: () => {
                                            cambioSlide().then();
                                        },
                                    },
                                    {
                                        text: 'Actualizar',
                                        onPress: () => {
                                            VersionCheck.getAppStoreUrl().then();
                                        },
                                    },
                                ],
                            );
                        } else {
                            cambioSlide().then();
                        }
                    })
                    .catch(e => {
                        cambioSlide().then();
                    });
            } catch (e) {
                //console.log(e.message);
            }
        } else {
            cambioSlide().then();
        }
    };

    async function cambioSlide() {
        let objTue = await AsyncStorage.getItem('slide');
        setTimeout(() => {
            if (slider) {
                if (objTue === 'Ok') {
                    navigation.navigate('Home', {
                        dato: JSON.stringify({params: parametros}),
                    });
                    setSlider(true);
                } else {
                    navigation.navigate('Slider', {
                        dato: JSON.stringify({params: parametros}),
                    });
                    setSlider(false);
                }
            }
        }, tiempoCarga);
    }

    async function comprobarInternet() {
        setLoadVisible(true);
        try {
            let res = await axios.get('https://www.medellin.gov.co/', {});
            if (res.status === 200) {
                setLoadVisible(false);
                setSaltar(true);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }

    async function cargarParametros() {
        let response = await fetch(tsconfig[tsconfig.use].params);
        let textos = await response.json();
        AsyncStorage.setItem('params', JSON.stringify(textos));
        updateVariables(textos);
        setParametros(textos);
        txtSaltar = textos.SALTAR;
        txtReporta = textos.REPORTA;
        txtReportaDan = textos.REPORTADAN;
        txtReportaAyuda = textos.REPORTAINFO;
        txtRecibe = textos.RECIBE;
        txtRecibeNotif = textos.NOTIF;
        txtRecibeAyuda = textos.RECIBEINFO;
        txtLaApp = textos.LAAPP;
        tiempoCarga = parseInt(textos.TIEMPO);
        setParamsTrue(true);
    }

    useEffect(() => {
        async function componentDidUpdate() {
            if (!paramsTrue) {
                await cargarParametros();
            }
        }
        componentDidMount().then();
        return () => {};
    }, []);

    function renderSlider() {
        return (
            <Swiper
                autoplay={false}
                showsButtons={false}
                showsPagination={true}
                ref={createRef()}
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
                    bottom: '10%',
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
                        <Text style={styles.reportarDanos}>
                            {txtReportaDan}
                        </Text>
                        <Text style={styles.reportarTxt}>
                            {txtReportaAyuda}
                        </Text>
                    </View>
                </View>
                <View style={stylesSlide.slide}>
                    <Image
                        source={require('../../iconos/splash/SlideDos.png')}
                        style={[styles.iconFooter]}
                    />
                    <View style={styles.contenedor}>
                        <Text style={styles.reportar}>{txtRecibe}</Text>
                        <Text style={styles.reportarDanos}>
                            {txtRecibeNotif}
                        </Text>
                        <Text style={styles.reportarTxt}>{txtRecibeAyuda}</Text>
                    </View>
                </View>
            </Swiper>
        );
    }

    function renderSplit() {
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
                        <Text style={styles.textBold}>
                            {'DE LA ALCALDÍA DE MEDELLÍN '}
                        </Text>
                        {' QUE LE PERMITE A LA COMUNIDAD'}
                        <Text style={styles.textBold}>
                            {' REPORTAR DIFERENTES TIPOS DE DAÑOS'}
                        </Text>
                        {' EN SECTORES DE LA CIUDAD'}
                    </Text>
                </View>
                <Image
                    source={require('../../iconos/panel.png')}
                    style={styles.iconFooter}
                />

                {saltar && (
                    <Pressable
                        style={{
                            bottom: '1%',
                            position: 'absolute',
                            alignContent: 'flex-end',
                            padding: 3,
                            right: responsiveWidth(-45),
                        }}
                        onPress={() => {
                            setSlider(false);
                            saltarPress();
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

    return (
        <View
            style={[
                styles.Container,
                slider ? {backgroundColor: 'transparent'} : {},
            ]}>
            <StatusBar hidden={true} barStyle="dark-content" />
            <Renderload load={load} setLoadVisible={setLoadVisible} />
            {slider ? renderSplit() : renderSlider()}
            {slider ? null : (
                <Pressable style={styles.btn} onPress={saltarPress}>
                    <Text style={styles.btnText}>{txtSaltar}</Text>
                </Pressable>
            )}
        </View>
    );
}

export default SliderScreen;
