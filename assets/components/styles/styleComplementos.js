import {Dimensions, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenFontSize,
    responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const {width, height} = Dimensions.get('window');

const fontSizeText = responsiveFontSize(1.6);
const fontSizeTitle = responsiveFontSize(1.4);
const fontSizeAyudas = responsiveFontSize(1);
const fontSizeInput = responsiveFontSize(1.6);
const fontSizeTextHeader = responsiveFontSize(1.8);

const inputAlto = width <= 380 ? 35 : 40;
const segoeBold = Platform.OS !== 'ios' ? 'segoeuib' : 'SegoeUI-Bold';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

module.exports = {
    WebviewMapa: {
        flex: 1,
        height: responsiveHeight(16),
        width: width,
        margin: 0,
        padding: 0,
        backgroundColor: '#fff',
        zIndex: 1,
        marginBottom: '2%',
    },
    TextFooter: {
        color: '#575a5d',
        paddingTop: 0,
        fontSize: fontSizeTitle,
        fontFamily: momserratBold,
        textAlign: 'center',
        paddingBottom: 0,
        marginBottom: 10,
        marginTop: 10,
    },
    divider: {
        border: 'solid',
        borderBottomColor: '#9b9b9b',
        borderBottomWidth: 1,
        justifyContent: 'center',
        marginVertical: responsiveHeight(1),
        marginHorizontal: responsiveScreenWidth(5),
    },
    textStyle: {
        color: '#03AED8',
        top: -8,
        textAlign: 'center',
        fontSize: 22,
    },
    viewCamposBtn: {
        width: '40%',
    },
    viewCamposFotos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        margin: 0,
        bottom: 0,
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: '0%',
        marginTop: 10,
    },
    viewicono: {
        width: '100%',
        textAlign: 'center',
        height: 40,
        borderRadius: 50,
        borderColor: '#08517F',
        borderWidth: 1,
        zIndex: 1,
        backgroundColor: '#fff',
    },
    btn: {
        height: 35,
        zIndex: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    Container: {
        backgroundColor: '#fff',
    },
    campoImagen: {
        width: 90,
        height: 90,
        flexDirection: 'row',
    },
    captures: {
        marginLeft: 10,
        flex: 1,
        height: 100,
        width: 100,
        padding: 5,
        borderRadius: 15,
        justifyContent: 'center',
        resizeMode: 'cover',
    },
    TextInput: {
        width: 'auto',
        height: inputAlto,
        borderRadius: 5,
        borderColor: '#B7B7B7',
        fontSize: fontSizeInput,
        zIndex: -1,
        borderWidth: 1,
        margin: 0,
        padding: 0,
        paddingLeft: 18,
        paddingRight: 18,
    },
    TextInputDescrip: {
        width: 'auto',
        height: 60,
        borderRadius: 5,
        borderColor: '#B7B7B7',
        fontSize: fontSizeInput,
        zIndex: -1,
        borderWidth: 1,
        margin: 0,
        padding: 0,
        paddingLeft: 18,
        paddingRight: 18,
    },
    Text: {
        color: Colors.black,
        fontSize: fontSizeTitle,
        fontFamily: segoeBold,
        textAlign: 'left',
        left: 0,
        margin: 0,
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 5,
        padding: 0,
        zIndex: 1,
    },
    TextHeader: {
        color: Colors.black,
        fontSize: fontSizeTextHeader,
        fontFamily: segoeBold,
        textAlign: 'left',
        left: 0,
        margin: 0,
        paddingLeft: 3,
        paddingTop: 5,
        paddingBottom: 10,
        padding: 0,
        zIndex: 1,
    },
    ayuda: {
        color: '#9A9393',
        textAlign: 'left',
        paddingBottom: 1,
        paddingTop: 4,
        fontSize: fontSizeAyudas,
        width: '100%',
        zIndex: 1,
    },
    viewCampos: {
        flexDirection: 'column',
        padding: 0,
        elevation: -1,
        zIndex: -1,
    },
    contenedor: {
        backgroundColor: '#fff',
        width: width,
        position: 'absolute',
        zIndex: 2,
        elevation: -1,
    },
    viewCampospad: {
        zIndex: 2,
        paddingLeft: 20,
        paddingRight: 20,
    },
    body: {
        fontFamily: momserratI,
        textAlign: 'center',
        //maxheight: responsiveHeight(Platform.OS === 'ios' ? 80 : 90),
        zIndex: 2,
        //marginBottom: responsiveHeight(2),
    },
    viewFooter: {
        alignItems: 'center',
    },
    TextIni: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: segoeBold,
    },
    footer: {
        textAlign: 'center',
        width: width,
        alignItems: 'center',
        position: 'absolute',
        marginBottom: responsiveHeight(1),
        zIndex: 4,
        bottom: 0,
        height: 'auto',
    },
    buttonReportar: {
        width: '90%',
        height: 45,
        borderRadius: 50,
        backgroundColor: '#08517F',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
        zIndex: 10,
    },
    buttonOk: {
        fontSize: responsiveScreenFontSize(2),
        fontFamily: momserratBold,
        color: '#fff',
        zIndex: 10,
    },
    //contenedor imagenes
    contenedorImagenes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'red',
    },
    Txtfoto: {
        color: '#575a5d',
        fontSize: fontSizeText,
        textAlign: 'center',
        marginBottom: 7,
    },
    iconoText: {
        height: '60%',
        width: '60%',
    },
    iconoX: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        width: '25%',
    },
    btnLimpiar: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: -1,
        top: -5,
        width: 35,
        height: 35,
        zIndex: 10,
    },
    viewImages: {
        height: 100,
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        marginBottom: 15,
    },
};
