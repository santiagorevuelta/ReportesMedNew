import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Text} from 'react-native-paper';
import {
    responsiveFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
export default function Header({navigation, label, search, setSearch}) {
    return (
        <View style={styles.body}>
            <BackBotton navigation={navigation} />
            <TextApp label={label} />
            <LogoTitle />
        </View>
    );

    function TextApp() {
        return (
            <Text
                style={{
                    color: '#fff',
                    fontFamily: momserratBold,
                    fontWeight: '500',
                    fontSize: responsiveFontSize(2.2),
                }}>
                {label}
            </Text>
        );
    }

    function BackBotton() {
        return (
            <Button
                icon={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left'}
                mode={'text'}
                style={styles.btnContain}
                color={'#fff'}
                labelStyle={{
                    fontSize: responsiveFontSize(
                        Platform.OS === 'ios' ? 5 : 3.5,
                    ),
                }}
                compact={true}
                onPress={() => {
                    if (search) {
                        setSearch(!search);
                    } else {
                        navigation.navigate('HomeMod');
                    }
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        height: responsiveScreenHeight(10),
        position: 'absolute',
        paddingTop: Platform.OS !== 'ios' ? 0 : 20,
        width: responsiveScreenWidth(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#08517F',
        elevation: 10,
    },
    btnContain: {
        height: responsiveScreenWidth(10),
        width: responsiveScreenWidth(10),
        paddingTop: Platform.OS !== 'ios' ? 0 : 0,
        marginLeft: 10,
    },
});

function LogoTitle() {
    return (
        <Image
            style={{
                width: 100,
                marginRight: 10,
                marginBottom: 0,
                height: 50,
                resizeMode: 'contain',
            }}
            source={require('../../../iconos/tittleAlcaldiaSin.png')}
        />
    );
}
