import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from '../../../theme';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';

const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

export default function PaperButton({mode, style, ...props}) {
    return (
        <Button
            uppercase={false}
            compact={true}
            mode="text"
            color={props.check ? theme.colors.primary : theme.colors.blanco}
            style={[style, styles.button]}
            labelStyle={[
                styles.text,
                props.check
                    ? {color: theme.colors.blanco}
                    : {color: theme.colors.primary},
            ]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.radius + 10,
        marginLeft:3,
        marginRight:3,
        borderWidth: 1,
        color: theme.colors.primary,
    },
    text: {
        fontWeight: 'normal',
        fontFamily: momserratI,
        fontSize: responsiveScreenFontSize(theme.fontbtn),
        marginLeft:15,
        marginRight:15
    },
});
