import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import ImageRender from './RenderImagen';

export default function ModalImage({
    modalVisible = false,
    onModalVisible,
    url = null,
}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                onModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.closeModal}>
                        <Button
                            icon={'close'}
                            mode={'outlined'}
                            labelStyle={{fontSize: responsiveFontSize(3.2)}}
                            style={styles.closeButton}
                            compact={true}
                            color={'#08517F'}
                            onPress={() => {
                                onModalVisible(false);
                            }}
                        />
                    </View>
                    <ImageRender url={url} style={styles.fotoModal} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
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
    fotoModal: {
        resizeMode: 'contain',
        borderRadius: 5,
        zIndex: 1,
        width: responsiveScreenWidth(80),
        height: responsiveHeight(50),
    },
    closeModal: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        height: 0,
    },
    closeButton: {
        borderWidth: 0,
        borderRadius: 50,
        height: 40,
        width: 40,
        right: -20,
        top: '5%',
        zIndex: 2,
    },
});
