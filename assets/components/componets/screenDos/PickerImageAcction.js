import {
    Image,
    PermissionsAndroid,
    Platform,
    Pressable,
    Text,
    View,
} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import * as RNFS from 'react-native-fs';
import {setLoadVisible} from '../../../libs/general';
import {Divider} from 'react-native-paper';

const styles = require('../../styles/styleComplementos');
let datosState = [];
let images = [];

export default ({searchState, setImagenes, template = {}}) => {
    datosState = searchState();
    images = datosState.data.imagenes;
    return (
        <View style={{flex: 1}}>
            <Text style={styles.TextFooter}>
                {datosState.items.AGREGARFOTO +
                    (template?.secciones?.fotos.requeridas > 0
                        ? ''
                        : ' - Opcional')}
            </Text>
            <Divider style={styles.divider} />
            <View style={styles.viewCamposFotos}>
                <View style={styles.viewCamposBtn}>
                    <Text style={styles.Txtfoto}>{datosState.items.FOTO}</Text>
                    <View style={styles.viewicono}>
                        <Pressable
                            style={styles.btn}
                            onPress={() => {
                                camaraPress(setImagenes, template);
                            }}>
                            <Image
                                style={styles.icono}
                                source={require('../../../iconos/grupo4/001-camara-fotografica.png')}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.viewCamposBtn}>
                    <Text style={styles.Txtfoto}>
                        {datosState.items.GALERIA}
                    </Text>
                    <View style={styles.viewicono}>
                        <Pressable
                            style={styles.btn}
                            onPress={() => {
                                galleryPress(setImagenes, template);
                            }}>
                            <Image
                                source={require('../../../iconos/grupo4/002-foto.png')}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

async function galleryPress(setImagenes, template) {
    await requestCameraPermission();
    setLoadVisible(true);
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'ReportesMed',
            privateDirectory: true,
        },
        compressImageMaxHeight: 1024,
        compressImageMaxWidth: 768,
        width: 1024,
        height: 768,
        mediaType: 'photo',
        cropping: false,
        multiple: false,
    };
    await ImagePicker.openPicker(options)
        .then(async image => {
            renderFile(image, setImagenes, template).then();
        })
        .catch(e => {
            console.log(e);
            setLoadVisible(false);
        });
    setLoadVisible(false);
}

async function camaraPress(setImagenes, template) {
    await requestCameraPermission();
    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'ReportesMed',
            quality: 0,
            privateDirectory: true,
        },
        compressImageMaxHeight: 1024,
        compressImageMaxWidth: 768,
        width: 1024,
        height: 768,
        mediaType: 'photo',
        cropping: false,
        multiple: false,
    };
    ImagePicker.openCamera(options)
        .then(image => {
            renderFile(image, setImagenes, template).then();
        })
        .catch(() => {
            console.log('');
            setLoadVisible(false);
        });
    setLoadVisible(false);
}

async function renderFile(response, setImagenes, template) {
    if (response !== undefined) {
        let pathImg = response.path == undefined ? response.uri : response.path;
        const resizedImageUrl = await ImageResizer.createResizedImage(
            pathImg,
            1024,
            768,
            'JPEG',
            40,
            0,
            RNFS.DocumentDirectoryPath,
        );
        const base64 = await RNFS.readFile(resizedImageUrl.uri, 'base64');
        if (images.length <= template.secciones?.fotos.cantidad) {
            images.push({urlFoto: pathImg, base64: base64});
        }
    }
    setImagenes(images);
    //notifyMessage(datosState.items.FOTOSUBIDA);
    setLoadVisible(false);
}

async function requestCameraPermission() {
    if (Platform.OS !== 'ios') {
        try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);

            const permissionCamera = await PermissionsAndroid.check(
                'android.permission.CAMERA',
            );
            const permissionWriteStorage = await PermissionsAndroid.check(
                'android.permission.WRITE_EXTERNAL_STORAGE',
            );
            if (permissionCamera && permissionWriteStorage) {
                await requestCameraPermission;
            }
            if (!permissionCamera || !permissionWriteStorage) {
                return {
                    error: 'Failed to get the required permissions.',
                };
            }
        } catch (error) {
            return {
                error: 'Failed to get the required permissions.',
            };
        }
    }
}
