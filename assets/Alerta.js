import React, {forwardRef, useImperativeHandle, useState} from 'react';

import {Modal, Platform, StyleSheet, Text, View, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {theme} from './theme';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';
const segoeBold = Platform.OS !== 'ios' ? 'segoeuib' : 'SegoeUI-Bold';
const segoeI = Platform.OS !== 'ios' ? 'segoeui' : 'SegoeUI';

function ModalAlerta(props, ref) {
    const [title, setTitle] = useState('');
    const [msg, setMsg] = useState('');
    const [btns, setBtns] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(false);
    const [modalImg, setModalImg] = useState(1);

    const btnApplerender = () => {
        if (modalImg === 2) {
            return (
                <>
                    <Image
                        source={require('./iconos/notification.png')}
                        style={[styles.iconReportUpdate]}
                    />
                </>
            );
        }
        if (modalImg === 3) {
            return (
                <>
                    <Image
                        source={require('./iconos/002-like.png')}
                        style={[styles.iconReport]}
                    />
                </>
            );
        }
    };

    useImperativeHandle(ref, () => ({
        mostrarAlerta(_title, _msg, _btns = [], _modalVisible, _typeModal, _imgModal) {
            setTimeout(() => {
                setTitle(_title);
                setMsg(_msg);
                setBtns(_btns);
                setModalVisible(_modalVisible);
                setModalType(_typeModal);
                setModalImg(_imgModal);
            }, 1000);
        },
    }));
    return (
        modalType ?
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
            <View style={styles.centeredViewUpdate}>
                <View style={styles.modalViewUpdate}>
                    {/* <Image
                        source={require('./iconos/002-like.png')}
                        style={[styles.iconReport]}
                    /> */}
                    {btnApplerender()}
                    <Text style={styles.titleUpdate}>{title}</Text>
                    <Text
                        style={[
                            styles.msgUpdate,
                            msg.length >= 120
                                ? {fontSize: responsiveFontSize(1.9)}
                                : {},
                        ]}>
                        {msg}
                    </Text>
                    <View style={styles.btnUpdate}>
                        {btns?.map((item, i) => (
                            <Button
                                key={i}
                                onPress={
                                    item.onPress
                                        ? () => {
                                              item.onPress();
                                              setModalVisible(false);
                                          }
                                        : () => {
                                              setModalVisible(false);
                                          }
                                }
                                uppercase={false}
                                labelStyle={{
                                    color: '#fff',
                                    fontFamily: momserratBold,
                                    fontSize: 18,
                                    letterSpacing: 0,
                                    fontWeight: Platform.OS === 'ios' ? '400' : '600',
                                }}
                                color={'gray'}>
                                {item.text}
                            </Button>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
        :
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* <Image
                        source={require('./iconos/002-like.png')}
                        style={[styles.iconReport]}
                    /> */}
                    {btnApplerender()}
                    <Text style={styles.title}>{title}</Text>
                    <Text
                        style={[
                            styles.msg,
                            msg.length >= 120
                                ? {fontSize: responsiveFontSize(1.9)}
                                : {},
                        ]}>
                        {msg}
                    </Text>
                    <View style={styles.divider} />
                    <View style={styles.btn}>
                        {btns?.map((item, i) => (
                            <Button
                                key={i}
                                onPress={
                                    item.onPress
                                        ? () => {
                                              item.onPress();
                                              setModalVisible(false);
                                          }
                                        : () => {
                                              setModalVisible(false);
                                          }
                                }
                                uppercase={false}
                                labelStyle={{
                                    color: theme.colors.alerta,
                                    fontFamily: momserratBold,
                                    fontSize: 18,
                                    letterSpacing: 0,
                                }}
                                color={'gray'}>
                                {item.text}
                            </Button>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default forwardRef(ModalAlerta);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalView: {
        margin: 20,
        width: '90%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 16,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'space-around',
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
    btn: {
        width: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontFamily: momserratBold,
        fontSize: responsiveFontSize(2.5),
        marginVertical: 5,
        width: '90%',
        textAlign: 'center',
    },
    msg: {
        fontFamily: momserratI,
        fontSize: responsiveFontSize(1.9),
        marginVertical: '4%',
        fontWeight: Platform.OS === 'ios' ? '400' : '600',
        textAlign: 'center',
        padding: 5,
        width: '90%',
    },
    divider: {
        height: 0.5,
        backgroundColor: 'gray',
        width: '106%',
    },
    centeredViewUpdate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalViewUpdate: {
        marginTop: 'auto',
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 10,
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
    btnUpdate: {
        width: '70%',
        paddingVertical: 5,
        backgroundColor: '#0D6589',
        borderRadius: 50,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    titleUpdate: {
        fontWeight: 'bold',
        fontFamily: momserratBold,
        fontSize: responsiveFontSize(2),
        paddingBottom: 25,
    },
    msgUpdate: {
        fontFamily: momserratI,
        fontSize: responsiveFontSize(1.9),
        marginTop: '0%',
        marginBottom: '5%',
        width: '75%',
        fontWeight: Platform.OS === 'ios' ? '400' : '600',
        textAlign: 'center',
        paddingBottom: 25,
        paddingHorizontal: 5,
    },
    dividerUpdate: {
        height: 0.5,
        backgroundColor: 'gray',
        width: '106%',
        marginBottom: 20,
    },
    iconReportUpdate: {
        width: '20%',
        height: '20%',
        marginVertical: 20,
        padding: 10,
        resizeMode: 'contain',
    },
    iconReport: {
        width: '20%',
        height: '20%',
        padding: 10,
        resizeMode: 'contain',
    },
});
