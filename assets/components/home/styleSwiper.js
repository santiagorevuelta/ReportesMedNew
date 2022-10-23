import {Dimensions, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
    responsiveFontSize,
    responsiveScreenWidth,
    responsiveScreenHeight,
    responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');
const fontSizeText = responsiveScreenFontSize(3);
const fontSizeTextSec = responsiveScreenFontSize(2);
const fontSizeInfo = responsiveScreenFontSize(1.6);
const monserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const monserrarI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

const stylesSlide = {
    slide: {
        flex: 1,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d6589',
    },
};

const styles = {
    Container: {
        flex: 1,
        alignItems: 'center',
    },
    version: {
        top: '1%',
        position: 'absolute',
        right: '-40%',
    },
    content: {
        flex: 1,
        width: width,
        height: responsiveScreenHeight(80),
        flexDirection: 'column',
        position: 'absolute',
        alignItems: 'center',
    },
    iconLogo: {
        top: responsiveScreenHeight(-5),
        width: responsiveScreenWidth(50),
        height: responsiveScreenHeight(30),
        resizeMode: 'contain',
    },
    iconHuecos: {
        top: responsiveScreenHeight(5),
        width: responsiveScreenWidth(60),
        resizeMode: 'contain',
    },
    txtApp: {
        bottom: 2,
        fontSize: fontSizeTextSec,
        textAlign: 'center',
    },
    textLaApp: {
        fontSize: fontSizeInfo,
        color: '#747474',
        fontFamily: monserrarI,
        textAlign: 'center',
        paddingRight: 50,
        paddingLeft: 50,
    },
    textBold: {
        fontFamily: monserratBold,
    },
    iconPanel: {
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(125),
        zIndex: -1,
        bottom: height < 600 ? '0%' : '-12%',
        position: 'absolute',
        resizeMode: 'contain',
    },
    iconFooter: {
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(110),
        zIndex: -1,
        bottom: height < 600 ? '0%' : '-12%',
        position: 'absolute',
        resizeMode: 'contain',
    }, //Fin split
    centerImage: {
        top: '1%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    iconFondo: {
        top: 5,
        zIndex: 2,
        height: height / 2,
        resizeMode: 'center',
        position: 'absolute',
    },
    contentSlide: {
        flex: 1,
        alignItems: 'center',
        width: width / 2,
        position: 'absolute',
    },
    contenedor: {
        position: 'absolute',
        alignItems: 'center',
        fontFamily: monserratBold,
        textAlign: 'center',
        paddingRight: 50,
        paddingLeft: 50,
        bottom: '10%',
        zIndex: 5,
    },
    reportar: {
        fontSize: fontSizeText,
        bottom: 80,
        color: '#fff',
        fontFamily: monserratBold,
    },
    reportarDanos: {
        fontSize: fontSizeTextSec,
        bottom: 80,
        color: '#fff',
        fontFamily: monserratBold,
    },
    reportarTxt: {
        fontSize: fontSizeInfo,
        bottom: 70,
        color: '#fff',
        fontFamily: monserrarI,
        textAlign: 'center',
        opacity: 1,
    },
    btnText: {
        fontSize: responsiveFontSize(2),
        color: '#fff',
        fontFamily: monserrarI,
        textAlign: 'center',
    },
    btn: {
        textAlign: 'center',
        bottom: '5%',
        alignItems: 'center',
        padding: 10,
        fontFamily: monserratBold,
        zIndex: 10,
        position: 'absolute',
    },
    image: {
        zIndex: 1,
        width: width,
        height: height,
        position: 'relative',
    },
};

module.exports = {
    styles,
    stylesSlide,
};
