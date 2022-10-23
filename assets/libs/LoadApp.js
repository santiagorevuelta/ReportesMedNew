import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

export const Renderload = ({load, setLoadVisible}) => {
    return (
        <Modal
            transparent={true}
            visible={load}
            onRequestClose={() => {
                setLoadVisible(false);
            }}>
            <View style={stylesLoad.contenedor}>
                <Image
                    source={require('../iconos/loading.gif')}
                    style={stylesLoad.loadGif}
                />
            </View>
        </Modal>
    );
};

const stylesLoad = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
    },
    loadGif: {
        opacity: 10,
        resizeMode: 'center',
    },
});
