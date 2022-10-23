import React, {useState} from 'react';
import {Image, View, Pressable, Modal, Platform, Text} from 'react-native';
import {styles} from './modalImageStyle';

const ModalImage = ({modalVisible = false, onModalVisible, url = null}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                onModalVisible(false, null);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={{uri: url}} style={styles.fotoModal} />
                    <Pressable
                        style={styles.openButton}
                        onPress={() => {
                            onModalVisible(false, null);
                        }}>
                        <Text style={styles.textStyle}>x</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

export default ModalImage;
