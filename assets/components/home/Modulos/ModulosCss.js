import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenHeight,
    responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const fontSizeTextSec = responsiveFontSize(1.5);
const fontSizeText = responsiveFontSize(1.6);
const segoeBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const segoeI = Platform.OS !== 'ios' ? 'montserrat' : 'Montserrat';
const montserratb = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const {width, height} = Dimensions.get('window');

export const stylesSlide = StyleSheet.create({
    slide: {
        width: width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 25,
        marginBottom: '20%',
        paddingRight: 25,
    },
});

export const stylestop = StyleSheet.create({
    contenedor: {
        width: width,
        textAlign: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'center',
        flex: 1,
        zIndex:10
    },
     contentHeader: {
        top: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveScreenWidth(100),
        paddingTop:'2%',
        paddingBottom:'5%',
        backgroundColor: '#DCEAF7',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
        position: 'absolute',
        flex: 1,
    },
    logo: {
        height: responsiveScreenHeight(12),
        marginTop: Platform.OS === 'ios' ? responsiveScreenHeight(4) : 0,
        resizeMode: 'contain',
    },
    huecosImg: {
        height: responsiveScreenHeight(6),
        resizeMode: 'contain',
    },
    textayuda: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: montserratb,
        color: '#595E62',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    tipoayuda: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: montserratb,
        color: '#030303',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
});

export const stylesCards = StyleSheet.create({
    contenedorImagen: {
        height: responsiveScreenWidth(25),
        width: responsiveScreenWidth(25),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#171717',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: Platform.OS === 'ios' ?8:0,
        zIndex: Platform.OS === 'ios' ?2:10,
    },
    imagenSeccion: {
        height: responsiveScreenHeight(9),
        width: responsiveScreenWidth(13),
        padding: -50,
        margin: 10,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    padre: {
        borderWidth: 0,
        width: responsiveScreenWidth(40),
        height: responsiveScreenWidth(40),
        marginVertical: 10,
        marginTop: 30,
        textAlign: 'center',
        alignItems: 'center',
    },
    contenedor: {
        textAlign: 'center',
        marginTop:10
    },
    nameSeccion: {
        fontSize: fontSizeText,
        fontFamily: segoeBold,
        color: '#030303',
        textAlign: 'center',
    },
    detalleSeccion: {
        fontSize: fontSizeTextSec,
        fontFamily: segoeI,
        color: '#8B8888',
        textAlign: 'center',
        marginTop:2
    },
    nameSeccionProx: {
        fontSize: 25,
        fontFamily: segoeBold,
        position: 'absolute',
        color: '#030303',
        textAlign: 'center',
        marginTop: 200,
    },
});

export const styles = StyleSheet.create({
    Container: {
        height: height,
        width: width,
        alignItems: 'center',
        backgroundColor: '#EBF3FA',
        paddingTop:  0,
        paddingBottom: Platform.OS === 'ios' ?responsiveScreenHeight(10) : responsiveScreenHeight(8),
    },
    image: {
        zIndex: -1,
        width: width,
        bottom: responsiveHeight(0.5),
        position: 'absolute',
        backgroundColor: 'rgba(125,161,193,0.49)',
        opacity: 0.2,
    },
});
