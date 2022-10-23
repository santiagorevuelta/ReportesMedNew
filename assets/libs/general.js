import React from 'react';
import {
    Text,
    View,
    Platform,
    Pressable,
    Image,
    Alert,
    Modal,
    StyleSheet,
    Dimensions,
    ToastAndroid,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = require('../components/styles/styleComplementos');
import ModalImage from '../components/componets/screenDos/modal/modalImage';
import VersionCheck from 'react-native-version-check';

function renderFileData(props, datosState) {
    let ImagesScroll = [];
    let images = datosState.data.imagenes;
    function setModalVisible(b, i) {
        props.setDatosState('modalVisible', b);
        props.setDatosState('imageVisible', i);
    }
    for (let i = 0; i < images.length; i++) {
        ImagesScroll.push(
            <Pressable
                key={'imagen' + i}
                onPress={() => {
                    setModalVisible(true, images[i].urlFoto);
                }}>
                <ModalImage
                    modalVisible={datosState.modalVisible}
                    onModalVisible={b => {
                        setModalVisible(b, null);
                    }}
                    url={datosState.imageVisible}
                />
                <Image
                    source={{uri: images[i].urlFoto}}
                    style={styles.captures}
                />
                <Pressable
                    style={styles.btnLimpiar}
                    onPress={() => {
                        props.FileDeleteData(i);
                    }}>
                    <Image
                        style={styles.iconoText}
                        source={require('../../assets/iconos/ElipseX.png')}
                    />
                </Pressable>
            </Pressable>,
        );
    }
    return ImagesScroll;
}

var load = false;

function setLoadVisible(visible) {
    load = visible;
    renderload(load);
}

function renderload() {
    return (
        <Modal
            transparent={true}
            visible={false}
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
}

const stylesLoad = StyleSheet.create({
    contenedor: {
        flex: 1,
        width: width,
        height: height,
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

function notifyMessage(msg) {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    } else {
        Alert.alert(msg);
    }
}

module.exports = {
    renderFileData,
    setLoadVisible,
    renderload,
    notifyMessage,
};
