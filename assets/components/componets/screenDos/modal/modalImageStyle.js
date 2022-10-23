import {Platform, StyleSheet, Dimensions} from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        top: '1%',
        right: '1%',
        width: 25,
        position: 'absolute',
        textAlign: 'center',
    },
    textStyle: {
        color: '#08517F',
        top: -10,
        textAlign: 'center',
        fontSize: responsiveFontSize(3.5),
    },
    fotoModal: {
        width: width / 2 + 100,
        height: height / 2,
        borderRadius: 5,
    },
    viewCamposBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
