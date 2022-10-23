import {Platform, StyleSheet} from 'react-native';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

export const styles = StyleSheet.create({
    placeholder: {
        fontFamily: momserratI,
        color: '#000',
    },

    value: {
        color: '#000',
    },

    selector: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 18,
        paddingRight: 18,
        paddingHorizontal: responsiveWidth(2),
        borderWidth: 1,
        borderColor: '#B7B7B7',
        borderRadius: 5,
        zIndex: 8,
    },
    containerList: {
        position: 'absolute',
        maxHeight: responsiveHeight(35),
        top: 40,
        zIndex: 10,
        borderRadius: 0,
        width: responsiveWidth(90),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        backgroundColor: '#fff',
        shadowRadius: 4.65,
        borderWidth: 0.2,
        borderTopWidth: 0,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        elevation: 10,
    },

    containerItemList: {
        padding: responsiveWidth(2),
        paddingHorizontal: responsiveWidth(6),
        borderBottomWidth: 1,
        borderColor: '#CAD6D3',
        zIndex: 8,
    },

    textItem: {
        color: '#333333',
    },
});
