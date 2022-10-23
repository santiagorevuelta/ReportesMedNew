import React, {useState} from 'react';
import {
    Dimensions,
    Image,
    Platform,
    Keyboard,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const styles = require('../../styles/Style');
const slyleios = require('../../styles/styleIos');
const slyleAndroid = require('../../styles/styleAndroid');

const {width, height} = Dimensions.get('window');

const inputAlto = width <= 380 ? 35 : 40;
const fontSizeInput = width <= 380 ? 12 : 15;
const segoeI = Platform.OS !== 'ios' ? 'segoeui' : 'SegoeUI';

export default props => {
    const [valid, setValid] = useState(false);
    // const [validDir, setValidDir] = useState(false);
    let datosState = props.searchState();
    // if (datosState.selectedItem !== null && validDir === false) {
    //     console.log(datosState.selectedItem);
    //     props.ubicarDireccion(datosState.selectedItem);
    //     setValidDir(true);
    // }
    return (
        <View
            style={[
                {height: inputAlto},
                Platform.OS === 'ios' ? {zIndex: 10} : {},
            ]}>
            <Pressable
                style={
                    datosState.data.location === undefined ||
                    datosState.data.location === ''
                        ? styles.btnOculto
                        : styles.btnUbic
                }>
                <Image
                    style={styles.iconoText}
                    source={require('../../../iconos/ubicacion.png')}
                />
            </Pressable>
            <Autocomplete
                autoCapitalize="none"
                defaultValue={datosState.selectedItem}
                data={datosState.filterData}
                style={{
                    backgroundColor: 'transparent',
                    height: inputAlto,
                    fontSize: fontSizeInput,
                    fontFamily: segoeI,
                }}
                containerStyle={
                    Platform.OS === 'ios'
                        ? slyleios.containerStyle
                        : slyleAndroid.containerStyle
                }
                placeholder={props.placeholder}
                inputContainerStyle={
                    Platform.OS === 'ios'
                        ? slyleios.inputContainerStyle
                        : slyleAndroid.inputContainerStyle
                }
                listContainerStyle={
                    Platform.OS === 'ios'
                        ? slyleios.listContainerStyle
                        : slyleAndroid.listContainerStyle
                }
                listStyle={
                    Platform.OS === 'ios'
                        ? slyleios.listStyle
                        : slyleAndroid.listStyle
                }
                hideResults={false}
                keyExtractor={(item, i) => i.toString()}
                onChangeText={text => {
                    props.onchangeInputs(text, 'direccion');
                    props.searchDirection(text);
                }}
                onEndEditing={e => {
                    if (props.searchState.location !== '' && !valid) {
                        props.ubicarDireccion(e.nativeEvent.text);
                    }
                }}
                onSubmitEditing={e => {
                    if (props.searchState.location !== '' && !valid) {
                        props.ubicarDireccion(e.nativeEvent.text);
                    }
                }}
                renderItem={({item, i}) => (
                    <TouchableOpacity
                        key={i}
                        style={
                            Platform.OS === 'ios'
                                ? slyleios.SearchBoxTouch
                                : slyleAndroid.SearchBoxTouch
                        }
                        onPress={() => {
                            setValid(true);
                            Keyboard.dismiss();
                            props.searchCoordinates(item);
                            props.setLocation(item);
                        }}>
                        <View style={styles.imgDir}>
                            <Image
                                style={styles.iconoText}
                                source={require('../../../iconos/ubicacion.png')}
                            />
                        </View>
                        <Text
                            style={
                                Platform.OS === 'ios'
                                    ? slyleios.SearchBoxTextItem
                                    : slyleAndroid.SearchBoxTextItem
                            }>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <Pressable
                style={
                    datosState.data.location === undefined ||
                    datosState.data.location === ''
                        ? styles.btnOculto
                        : styles.btnLimpiar
                }
                onPress={props.limpiar}>
                <Image
                    style={styles.iconoText}
                    source={require('../../../iconos/ElipseX.png')}
                />
            </Pressable>
        </View>
    );
};
