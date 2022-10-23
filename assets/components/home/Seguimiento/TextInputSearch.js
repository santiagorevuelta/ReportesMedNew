import React from 'react';
import {StyleSheet, TextInput as Input, View} from 'react-native';
import {
    responsiveScreenFontSize,
    responsiveScreenWidth,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {theme} from '../../../theme';
import PaperButton from './PaperButton';

export default function TextInput({...props}) {
    return (
        <View style={styles.container}>
            <Input style={styles.input} placeholder={props.label} {...props} />
            <PaperButton
                style={styles.btn}
                check={true}
                disabled={!props.searchlabel}
                onPress={() => {
                    props.getConsulta();
                }}>
                {props.searchlabel ? 'Consultar' : 'Buscando...'}
            </PaperButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '100%',
        height: responsiveWidth(10),
        borderWidth: 1,
        paddingLeft: 15,
        borderColor: '#C4C4C4',
        fontSize: responsiveScreenFontSize(1.5),
        color: 'gray',
        paddingRight: 25,
        marginTop: 5,
        marginBottom: 10,
    },
    btn: {
        width: responsiveScreenWidth(30),
        backgroundColor: theme.colors.primary,
    },
    btnD: {
        width: responsiveScreenWidth(30),
        backgroundColor: '#E3E3E3',
        borderColor: '#E3E3E3'
        
    }
});
