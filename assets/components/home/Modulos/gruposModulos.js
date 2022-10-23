import React from 'react';
import {
    StatusBar,
    Image,
    Platform,
    StyleSheet,
    Text,
    Pressable,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import general from '../../../libs/general';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const {width, height} = Dimensions.get('window');
const fontSizeText = responsiveFontSize(1.5); //width <= 380 ? 10 : 14;
const fontSizeTextSec = responsiveFontSize(1.2); ///width <= 380 ? 9 : 13;
const segoeBold = Platform.OS !== 'ios' ? 'segoeuib' : 'SegoeUI-Bold';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'montserratb';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'montserratreg';

export default props => {
    
    let datos = props.searchState().hijos;
    return (
        <View>
            <StatusBar hidden={true} barStyle="dark-content" />
            <View style={styles.contenedorTop}>
                <Pressable
                    onPress={() => {
                        props.setStateGroup();
                    }}>
                    <Image
                        source={require('../../../iconos/flecha.png')}
                        style={styles.iconAtras}
                    />
                </Pressable>
                <View>
                    <Text
                        style={{
                            color: '#fff',
                            fontFamily: momserratI,
                            fontSize: width / 30,
                        }}>
                        {'Reportar daño en'}
                    </Text>
                    <Text
                        style={{
                            color: '#fff',
                            fontFamily: momserratBold,
                            fontSize: width / 8,
                        }}>
                        {'Servicios'}
                    </Text>
                    <Text
                        style={{
                            color: '#fff',
                            fontFamily: momserratBold,
                            fontSize: width / 10,
                        }}>
                        {'Públicos'}
                    </Text>
                </View>
            </View>
            <View style={styles.contenedor}>
                <Image
                    source={require('../../../iconos/panel2.png')}
                    style={styles.image}
                />
                <View style={stylestop.contenedor}>
                    <Text style={stylestop.textayuda}>
                        {
                            'Acá podrás reportar daños en espacio público de servicios asociados a Gas Natural, Energía y Aguas'
                        }
                    </Text>
                    <Text style={stylestop.textayuda}>{'\nCuéntanos'}</Text>
                    <Text style={stylestop.tipoayuda}>
                        {'¿En qué servicio deseas reportar el daño?'}
                    </Text>
                </View>
                {datos.map(items => (
                    <TouchableOpacity
                        style={stylesCards.padre}
                        onPress={() => {
                            general.setLoadVisible(true);
                            props.searchModuloRes(items);
                        }}
                        key={'viewHijo' + items.id_reporte}>
                        <Image
                            source={{uri: items.icono}}
                            style={stylesCards.imagenSeccion}
                        />
                        <View style={stylesCards.contenedor}>
                            <Text style={stylesCards.nameSeccion}>
                                {items.nombre}
                            </Text>
                            <Text style={stylesCards.detalleSeccion}>
                                {items.descripcion}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const stylestop = StyleSheet.create({
    contenedor: {
        width: width,
        textAlign: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: 'transparent',
        zIndex: 5,
    },
    textayuda: {
        fontSize: width / 35,
        fontFamily: momserratI,
        color: '#595E62',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    tipoayuda: {
        fontSize: width / 30,
        fontFamily: momserratBold,
        color: '#030303',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
});

const styles = StyleSheet.create({
    image: {
        zIndex: -1,
        bottom: 0,
        position: 'absolute',
        width: width,
        height: height,
        opacity: 0.2,
        top: '0%',
        paddingTop: '0%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    iconAtras: {
        height: 20,
        width: 20,
        padding: 0,
        margin: 10,
        marginTop: 0,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    contenedor: {
        width: width,
        top: height / 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: '15%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#eaf3fa',
        bottom: 0,
        zIndex: 3,
        position: 'absolute',
    },
    contenedorTop: {
        width: width,
        height: height,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: '10%',
        backgroundColor: '#049D56',
        zIndex: 1,
    },
});

const stylesCards = StyleSheet.create({
    imagenSeccion: {
        height: '90%',
        width: '90%',
        padding: 0,
        margin: 2,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    padre: {
        borderWidth: 0,
        width: width / 2 - 31,
        height: width / 2 - 25,
        textAlign: 'center',
        margin: 8,
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
    },
    contenedor: {
        textAlign: 'center',
    
    },
    nameSeccion: {
        fontSize: fontSizeText,
        fontFamily: segoeBold,
        color: '#030303',
        textAlign: 'center',
        
    },
    detalleSeccion: {
        fontSize: fontSizeTextSec,
        fontFamily: momserratI,
        color: '#8B8888',
        textAlign: 'center',
    },
});
