import {Dimensions, Platform, StyleSheet} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');

const fontSizeText = responsiveFontSize(1.6); //width <= 380 ? 8 : 12;
const fontSizeTitle = responsiveFontSize(1.5); // width <= 380 ? 10 : 13;
const fontSizeAyudas = responsiveFontSize(1); // width <= 380 ? 7 : 10;
const fontSizeInput = responsiveFontSize(1.6); //width <= 380 ? 12 : 15;
const inputAlto = width <= 380 ? 35 : 40;
const segoeI = Platform.OS !== 'ios' ? 'segoeui' : 'SegoeUI';

module.exports = {
    containerStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#B7B7B7',
        marginBottom: 50,
        zIndex: 9,
    },
    inputContainerStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 0,
        height: inputAlto,
        borderRadius: 18,
        zIndex: 4,
    },
    listContainerStyle: {
        backgroundColor: 'transparent',
        width: '100%',
        zIndex: 9,
    },
    listStyle: {
        borderWidth: 0,
        zIndex: 9,
    },
    SearchBoxTouch: {
        margin: 5,
        borderWidth: 1,
        borderColor: '#B7B7B7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        paddingTop: 2,
        zIndex: 10,
        fontSize: fontSizeText,
    },
    SearchBoxTextItem: {
        margin: 3,
        fontSize: fontSizeTitle,
        fontFamily: segoeI,
        marginLeft: 20,
        right: 2,
        width: '90%',
        zIndex: 9,
    },
};
