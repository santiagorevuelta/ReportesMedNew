import {Dimensions, Platform} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');

const fontSizeText = responsiveFontSize(1.6); //width <= 380 ? 8 : 12;
const fontSizeTitle = responsiveFontSize(1.5); // width <= 380 ? 10 : 13;
const inputAlto = width <= 380 ? 35 : 40;

const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';
module.exports = {
    containerStyle: {
        position: 'absolute',
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#B7B7B7',
        marginBottom: 50,
    },
    inputContainerStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        borderWidth: 0,
        height: inputAlto,
        borderRadius: 5,
    },
    listStyle: {
        margin: 0,
        overflow: 'scroll',
        borderColor: '#B7B7B7',
        maxHeight: 200,
        borderWidth: 1,
        zIndex: 8,
        borderRadius: 1,
        opacity: 10,
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
        fontSize: fontSizeText,
        zIndex: 9,
    },
    SearchBoxTextItem: {
        margin: 3,
        fontSize: fontSizeTitle,
        fontFamily: momserratI,
        marginLeft: 20,
        right: 2,
        width: '90%',
    },
};
