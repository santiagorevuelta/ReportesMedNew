import {theme} from '../../../../theme';

const {
    responsiveWidth,
    responsiveScreenWidth,
    responsiveFontSize,
} = require('react-native-responsive-dimensions');
import {Platform, StyleSheet} from 'react-native';
const monserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';
const monserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';

module.exports = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: theme.radius,
        marginBottom: 10,
        borderColor: theme.colors.border,
        color: theme.colors.secondary,
        flexDirection: 'column',
        alignItems: 'center',
    },
    containerC: {
        borderWidth: 1,
        borderRadius: theme.radius,
        marginBottom: 10,
        padding: 20,
        borderColor: theme.colors.border,
        color: theme.colors.secondary,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'left',
        color: '#000',
        fontFamily: monserratBold,
        fontWeight: 'normal',
        fontSize: responsiveFontSize(1.5),
    },
    titleNB: {
        textAlign: 'left',
        color: '#000',
        fontFamily: monserratI,
        fontWeight: 'normal',
        fontSize: responsiveFontSize(1.5),
    },
    tipo: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '700',
        fontFamily: monserratI,
        color: theme.colors.negro,
    },
    icon: {
        resizeMode: 'contain',
        height: '50%',
    },
    cardt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardtext: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
    },
    cardtextChild: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardtextChildL: {
        alignItems: 'flex-end',
    },
    cardtextChildR: {
        alignItems: 'flex-start',
        paddingLeft: 10,
    },
    iconC: {
        justifyContent: 'center',
    },
    buttons: {
        marginLeft: 2,
        width: responsiveWidth(10),
        height: responsiveWidth(10),
    },
    labelStyle: {
        fontSize: responsiveFontSize(3.5),
        fontStyle: 'italic',
    },
});
