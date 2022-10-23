import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const fontSizeTitle = responsiveFontSize(1.4); // width <= 380 ? 10 : 13;
const fontSizeAyudas = responsiveFontSize(1); // width <= 380 ? 7 : 10;
const inputAlto = width <= 380 ? 35 : 40;
const fontSizeInput = responsiveFontSize(1.6); //width <= 380 ? 12 : 15;
const ubicarMe = width <= 380 ? height / 2 : height / 3 + 30;
const segoeBold = Platform.OS !== 'ios' ? 'segoeuib' : 'SegoeUI-Bold';
const segoeI = Platform.OS !== 'ios' ? 'segoeui' : 'SegoeUI';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

module.exports = {
    Container: {
        flex: 1,
    },
    imgDir: {
        left: 0,
        width: 27,
        height: 25,
        zIndex: 9,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    WebviewMapa: {
        height: height,
        width: width,
        margin: 0,
        padding: 0,
        zIndex: 0,
        backgroundColor: 'gray',
    },
    btnOculto: {
        display: 'none',
    },
    btnLimpiar: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: -1,
        width: 40,
        height: 40,
        zIndex: 10,
    },
    btnUbic: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        width: 35,
        height: 35,
        bottom: 0,
        zIndex: 10,
    },
    iconoX: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        width: '25%',
    },
    TextUbic: {
        paddingLeft: 35,
    },
    iconoText: {
        height: '55%',
        width: '55%',
    },
    btnCapas: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        zIndex: 1,
        right: 16,
        top: ubicarMe,
        borderRadius: 50,
    },
    iconoCapa: {
        height: '100%',
        width: '100%',
    },
    TextInput: {
        width: '100%',
        height: inputAlto,
        fontFamily: segoeI,
        borderRadius: 5,
        fontSize: fontSizeInput,
        backgroundColor: '#ffffff',
        margin: 0,
        padding: 0,
        borderColor: '#B7B7B7',
        borderWidth: 1,
        paddingLeft: 18,
    },
    Text: {
        color: Colors.black,
        fontSize: fontSizeTitle,
        fontFamily: segoeBold,
        textAlign: 'left',
        left: 0,
        margin: 0,
        paddingLeft: 5,
        paddingTop: 3,
        paddingBottom: 5,
        padding: 0,
        zIndex: 1,
    },
    ayuda: {
        color: '#9A9393',
        textAlign: 'left',
        paddingBottom: 1,
        paddingTop: 4,
        fontSize: fontSizeAyudas,
        fontFamily: segoeI,
        width: '100%',
        zIndex: 1,
    },
    viewCampos: {
        flexDirection: 'column',
        padding: 0,
        marginTop: 7,
        marginBottom: 7,
    },
    contenedor: {
        backgroundColor: '#fff',
        opacity: 1,
        width: width,
        position: 'absolute',
        zIndex: 2,
    },
    viewCampospad: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    body: {
        fontFamily: momserratI,
        textAlign: 'center',
    },
    footer: {
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: width,
        height: responsiveHeight(23),
        backgroundColor: '#ffffff',
        alignItems: 'center',
        zIndex: 1,
    },
    viewicono: {
        width: '100%',
        textAlign: 'center',
        height: 39,
        borderRadius: 50,
        borderColor: '#08517F',
        borderWidth: 2,
        zIndex: 1,
        backgroundColor: '#ffffff',
    },
    viewCamposBtn: {
        marginLeft: '5%',
        marginRight: '5%',
    },
    btn: {
        height: 35,
        zIndex: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icono: {
        top: 5,
        position: 'relative',
        alignItems: 'center',
        zIndex: 3,
    },
    buttonReportar: {
        zIndex: 3,
        height: 45,
        bottom: responsiveHeight(1),
        width: '90%',
        marginTop: 0,
        borderRadius: 50,
        backgroundColor: '#08517F',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonOk: {
        fontSize: responsiveScreenFontSize(2.5),
        fontFamily: momserratBold,
        color: '#fff',
    },
    viewImages: {
        marginTop: 10,
        height: 100,
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        marginBottom: 15,
    },
};
