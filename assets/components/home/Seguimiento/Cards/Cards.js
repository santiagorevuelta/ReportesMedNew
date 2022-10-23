import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {theme} from '../../../../theme';
import {Card, ActivityIndicator} from 'react-native-paper';
import {
    responsiveFontSize,
    responsiveScreenHeight,

} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import styleCard from './cardsCss';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {notifyMessage} from '../../../../libs/general';
import PaperButton from '../PaperButton';

const monserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const monserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

export default function (props) {
    return (
        <View style={styles.container}>
            <Text style={[styles.txtRes]}>Tus reportes realizados</Text>
            <ScrollView style={[styles.containerBtns]} horizontal>
                {props.list.map((item, index) => (
                    <PaperButton
                        key={index}
                        check={item.check}
                        style={item.check ? styles.btn : styles.btnOff}
                        onPress={() => {
                            props.setEstado(item);
                            props.getConsulta();
                        }}>
                        {item.label}
                    </PaperButton>
                ))}
            </ScrollView>
            <View style={[styles.containerCards]}>
                <ScrollView
                    persistentScrollbar={true}
                    style={[styles.containerCards]}>
                    <Mycards {...props} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: '6%',
        paddingTop: '2%',
        paddingBottom: '10%',
    },
    containerBtns: {
        flexDirection: 'row',
        paddingBottom: 6,
    },
    btn: {
        marginRight: 5,
        backgroundColor: theme.colors.primary,

    },
    btnOff: {
        marginRight: 5,
        borderColor: theme.colors.primary,
        color: theme.colors.primary,
    },
    containerCards: {
        paddingTop: 5,
        flexDirection: 'column',
        height:
            Platform.OS === 'ios'
                ? responsiveScreenHeight(44)
                : responsiveScreenHeight(32),
    },
    txtRes: {
        paddingBottom: '2%',
        paddingHorizontal: '0%',
        fontFamily: monserratI,
        fontWeight: '900',
        color: theme.colors.negro,
        fontSize: responsiveFontSize(2),
    },
});

function Mycards(props) {
    const [load, setLoad] = useState(false);
    // setTimeout(() => {
    //     setLoad(!load);
    // }, 8000);
    return props.data?.length === 0 ? (
        load ? (
            <ActivityIndicator animating={true} color={theme.colors.primary} />
        ) : null
    ) : (
        props.data?.map((item, index) => (
            <Card
                key={'card' + index}
                style={styleCard.containerC}
                onPress={() => {
                    props.setItem(item);
                    props.setSearch(true);
                    AsyncStorage.setItem('items', JSON.stringify(item));
                }}>
                <View style={styleCard.cardt}>
                    <View style={styleCard.cardtext}>
                        <View
                            style={[
                                styleCard.cardtextChild,
                                styleCard.cardtextChildL,
                            ]}>
                            <Text style={[theme.textos.Label, styleCard.titleNB]}>
                                Código del reporte:
                            </Text>
                            <Text style={[theme.textos.Label, styleCard.titleNB]}>
                                Tipo reporte:
                            </Text>
                        </View>
                        <View
                            style={[
                                styleCard.cardtextChild,
                                styleCard.cardtextChildR,
                            ]}>
                            <Text
                                style={[
                                    theme.textos.Label,
                                    styleCard.title,
                                    styleCard.tipo,
                                ]}>
                                {item.codigo_reporte}
                            </Text>
                            <Text
                                style={[
                                    theme.textos.Label,
                                    styleCard.title,
                                    styleCard.tipo,
                                ]}>
                                {item.tipo_reporte}
                            </Text>
                        </View>
                    </View>
                    <View style={[styleCard.iconC]}>
                        <EvilIcons
                            name={'chevron-right'}
                            color={theme.colors.primary}
                            size={responsiveFontSize(5)}
                        />
                    </View>
                </View>
            </Card>
        ))
    );
}
