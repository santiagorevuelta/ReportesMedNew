import React, {useState} from 'react';

import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {renderFileData} from '../../../libs/general';
import {WebView} from 'react-native-webview';
import html from '../../mapa/MapComponent';
import AutoCompleteScreen from './AutoComplete';
import PickerImageAcction from '../screenDos/PickerImageAcction';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Renderload} from '../../../libs/LoadApp';

const styles = require('../../styles/Style');

const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

export default props => {
  const [initial, setInitial] = useState(false);
  const datosState = props.searchState();
  const jsonheader = datosState.template.header;
  return (
    <View style={styles.Container}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Renderload load={props.load} setLoadVisible={props.setLoadVisible} />
      <WebView
        ref={props.Map_Ref}
        onMessage={event => {
          if (initial) {
            props.coordinatesFromMap(event.nativeEvent.data);
          } else {
            setInitial(!initial);
          }
        }}
        source={{html}}
        style={styles.WebviewMapa}
      />
      <View style={[styles.contenedor]}>
        <View style={[styles.viewCampos, styles.viewCampospad]}>
          <Text style={[styles.Text, Platform.OS === 'ios' ? {zIndex: 1} : {}]}>
            {props.template.secciones?.mapa.labeldireccion}
          </Text>
          <AutoCompleteScreen
            {...props}
            placeholder={props.template.secciones?.mapa.placeholderdir}
          />
          <Text style={styles.ayuda}>
            {props.template.secciones?.mapa.ayudadir}
          </Text>
        </View>
        <View
          style={[
            styles.viewCampos,
            styles.viewCampospad,
            Platform.OS === 'ios' ? {zIndex: -1} : {},
          ]}>
          <Text style={[styles.Text, {paddingTop: 0}]}>
            {props.template.secciones?.mapa.labelref}
            <Text
              style={{
                fontFamily: momserratI,
                fontWeight: 'normal',
              }}>
              {props.template.secciones?.mapa.requeridoref === '1'
                ? null
                : ' - Opcional'}
            </Text>
          </Text>
          <TextInput
            style={[styles.TextInput]}
            value={datosState.data.description}
            autoCapitalize={'none'}
            autoCorrect={true}
            multiline={false}
            maxLength={40}
            placeholder={props.template.secciones?.mapa.placeholderref}
            onChangeText={event => {
              let obtrude = true;
              let texture =
                /^[A-Za-z0-9\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1\u00A0 ]+$/;
              if (
                !texture.test(event) &&
                event !== '' &&
                event !== null &&
                event !== undefined
              ) {
                obtrude = false;
              }
              if (obtrude) {
                props.onchangeInputs(event.trimStart(), 'description');
              }
            }}
          />
          <Text style={styles.ayuda}>
            {props.template.secciones?.mapa.ayudaref}
          </Text>
        </View>
      </View>
      <Pressable style={{display: 'none'}} onPress={() => props.getCapas}>
        <Image
          style={styles.iconoCapa}
          source={require('../../../iconos/grupo3/capax2.png')}
        />
      </Pressable>
      <TouchableOpacity
        disabled={datosState.local}
        style={styles.btnCapas}
        onPress={() => {
          props.getLocalizac();
        }}>
        <Image
          style={styles.iconoCapa}
          source={require('../../../iconos/grupo3/ubicarx2.png')}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.footer,
          datosState.data.imagenes.length !== 0
            ? {height: 'auto', maxHeight: responsiveHeight(40)}
            : null,
        ]}>
        {datosState.data.imagenes.length !== 0 ? (
          <View style={styles.viewImages}>
            <ScrollView horizontal>
              {renderFileData(props, datosState)}
            </ScrollView>
          </View>
        ) : null}
        {datosState.data.imagenes.length >=
        props.template.secciones?.fotos.cantidad ? null : (
          <PickerImageAcction
            searchState={props.searchState}
            onchangeInputs={props.onchangeInputs}
            setImagenes={props.setImagenes}
            template={props.template}
          />
        )}
        <TouchableOpacity
          disabled={!datosState.validReport}
          setValidReport={datosState.setValidReport}
          style={[
            styles.buttonReportar,
            {
              backgroundColor:
                jsonheader?.background
                ? (datosState.validReport ? jsonheader.background : '#c3c3c3')
                : (datosState.validReport ? '#08517F' : '#c3c3c3'),
              color: jsonheader?.color ? jsonheader.color : '#fff',
            },
          ]}
          onPress={() => props.validarReporte()}>
          <Text style={styles.buttonOk}>{datosState.items.SIGUIENTE}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
