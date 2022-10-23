import {DefaultTheme} from 'react-native-paper';
import {
    responsiveFontSize,
    responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const theme = {
    ...DefaultTheme,
    dark: false,
    backgroundColor: 'red',
    pressed: '#d9d9d9',
    offPressed: '#fff',
    radius: 15,
    roboto: 'roboto',
    altoCampos: 5,
    altoSelect: 5,
    font: 1.5,
    fontbtn: 1.7,
    colors: {
        ...DefaultTheme.colors,
        dark: {
            backgroundColor: 'white',
            backgroundCard: '#25282c',
            color: 'black',
        },
        light: {
            backgroundColor: 'white',
            backgroundCard: 'rgba(125,161,193,0.49)',
            color: 'black',
        },
        text: '#000000',
        primary: '#08517F',
        alerta: '#007AFF',
        primaryBg: 'rgba(8,81,127,0.71)',
        secondary: '#414757',
        error: '#f13a59',
        focus: 'rgba(37,139,32,0.15)',
        headers: '#959595',
        border: 'rgba(149,149,149,0.24)',
        gray: 'gray',
        fondo: 'rgba(149,149,149,0.61)',
        blanco: '#fff',
        negro: '#000',
        hover: 'rgb(125,211,122)',
    },
    buttons: {
        principales: {
            height: 25,
            width: 56,
            borderRadius: 23,
            color: '#08517F',
        },
        Secundarios: {
            height: 25,
            width: 56,
            borderRadius: 23,
            color: '#ffffff',
            borderWidth: 1,
            borderColor: '#08517F',
        },
    },
    textos: {
        Label: {
            fontSize: responsiveFontSize(1.5),
            color: '#08517F',
            fontWeight: 'bold',
            fontFamily: 'robotoBold',
        },
        LabelIn: {
            fontSize: responsiveFontSize(1.5),
            color: '#08517F',
            fontWeight: 'bold',
            fontFamily: 'robotoBold',
        },
        Textos: {
            color: '#959595',
            textAlign: 'center',
            fontSize: responsiveFontSize(1),
            fontFamily: 'robotoBold',
        },
        img: {
            fontSize: responsiveScreenFontSize(1.6),
            color: '#414757',
        },
    },
    ver: {
        Label: {
            fontSize: responsiveFontSize(1.7),
            color: '#08517F',
        },
        Textos: {
            fontSize: responsiveFontSize(1.5),
            color: '#959595',
            textAlign: 'left',
            fontFamily: 'robotoBold',
        },
    },
    input: {
        height: 25,
        width: 140,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#959595',
    },
};
