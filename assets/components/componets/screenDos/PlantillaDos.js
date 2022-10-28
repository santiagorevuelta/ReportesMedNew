import React, {useRef} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

import {WebView} from 'react-native-webview';
import general from '../../../libs/general';
import PickerImageAcction from './PickerImageAcction';
import Selector from './SelectSimpleIOS';
import SelectSimple from './SelectSimple';
import WebHtml from '../../mapa/MapComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Renderload} from '../../../libs/LoadApp';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const styles = require('../../styles/styleComplementos');

const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';
let datosState = [];

export default props => {
  datosState = props.searchState();
  let jsonheader = {};
  try {
    jsonheader = datosState.template.header;
  } catch (e) {
    jsonheader = {};
  }

  const Map_Ref = useRef();
  setTimeout(function () {
    if (Map_Ref.current) {
      Map_Ref.current.injectJavaScript(
        `setTimeout(function(){
                    mymap.setView([${datosState.data.latitude}, ${datosState.data.longitude}], 18);
                },1000)`,
      );
    }
  }, 1000);
  return (
    <View style={styles.Container}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <SafeAreaView style={styles.body}>
        <Renderload load={props.load} setLoadVisible={props.setLoadVisible} />
        <View style={styles.footer}>
          {datosState.guardar ? (
            <Pressable
              style={[
                styles.buttonReportar,
                {
                  backgroundColor: jsonheader?.background
                    ? jsonheader.background
                    : '#08517F',
                  color: jsonheader?.color ? jsonheader.color : '#fff',
                },
              ]}
              onPress={() => {
                general.setLoadVisible(true);
                props.setDatosState('guardar', false);
                props.guardarinfo().then();
              }}>
              <Text style={styles.buttonOk}>
                {datosState.items.GUARDAREPORTE}
              </Text>
            </Pressable>
          ) : null}
        </View>
        <KeyboardAwareScrollView
          style={{marginBottom: responsiveHeight(8)}}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
          enableResetScrollToCoords={true}>
          {camposScroll(props, Map_Ref)}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

const camposScroll = (props, Map_Ref) => {
  return (
    <ScrollView>
      <View pointerEvents="none" style={[{marginBottom: -10}]}>
        <WebView
          ref={Map_Ref}
          source={{
            html: WebHtml,
          }}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          style={styles.WebviewMapa}
          injectedJavaScript={null}
        />
      </View>
      <View
        style={[
          {
            marginTop: -10,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingTop: 10,
            backgroundColor: '#fff',
          },
          styles.viewCampos,
          styles.viewCampospad,
        ]}>
        <Text style={[styles.TextHeader, {paddingTop: 0}]}>
          {props.template?.secciones.mapa.labelheaderform}
        </Text>
        <Text style={[styles.Text, {paddingTop: 0}]}>
          {props.template?.secciones.mapa.labeldireccion}
        </Text>
        <TextInput
          style={[styles.TextInput]}
          editable={false}
          value={datosState.data.location}
        />
      </View>
      <View
        style={[styles.viewCampos, styles.viewCampospad, {marginBottom: 5}]}>
        <Text style={[styles.Text, {paddingTop: 0}]}>
          {props.template?.secciones.mapa.labelref}
          <Text
            style={{
              fontFamily: momserratI,
              fontWeight: 'normal',
            }}>
            {props.template?.secciones.mapa.requeridoref === '1'
              ? null
              : ' - Opcional'}
          </Text>
        </Text>
        <TextInput
          style={[styles.TextInput]}
          value={datosState.data.description}
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
      </View>
      {/*Imagenes */}
      {datosState.data.imagenes.length !== 0 ? (
        <View style={styles.viewImages}>
          <ScrollView horizontal>
            {general.renderFileData(props, datosState)}
          </ScrollView>
        </View>
      ) : null}
      {/* {datosState.data.imagenes.length >=
            props.template?.secciones.fotos.cantidad ? null : (
                <PickerImageAcction
                    searchState={props.searchState}
                    onchangeInputs={props.onchangeInputs}
                    setImagenes={props.setImagenes}
                    template={props.template}
                />
            )} */}
      {renderCampoSelect(props)}
      {renderCamposText(props)}
      {general.renderload()}
    </ScrollView>
  );
};

const renderCamposText = props => {
  let camposView = [];
  let totalCampos = props.template?.secciones.reporte.cajas;
  if (totalCampos === undefined) {
    return null;
  }
  for (let i = 0; i < totalCampos.length; i++) {
    let item = totalCampos[i];
    camposView.push(
      <View
        key={'View' + i}
        style={[
          styles.viewCampos,
          styles.viewCampospad,
          item?.ayuda === ''
            ? {marginBottom: -5, zIndex: -1, elevation: -1}
            : {zIndex: -1},
        ]}>
        <Text style={[styles.Text, {paddingTop: 0}]}>
          {item?.label}
          {item?.requerido === 1 ? null : (
            <Text
              style={{
                fontFamily: momserratI,
                fontWeight: 'normal',
              }}>
              {' - Opcional'}
            </Text>
          )}
        </Text>
        <TextInput
          style={
            item?.tipocampo === 'SA'
              ? styles.TextInputDescrip
              : styles.TextInput
          }
          autoCorrect={true}
          value={
            !datosState.data[item?.alias] ? '' : datosState.data[item?.alias]
          }
          keyboardType={typesInput(item?.tipocampo)}
          multiline={item?.tipocampo === 'SA'}
          maxLength={item?.tipocampo === 'N' ? 10 : 1000}
          placeholder={item?.placeholder}
          onChangeText={async event => {
            let valid = await params(event, item.tipocampo);
            if (valid) {
              props.onchangeInputs(event.trimStart(), item.alias);
            }
          }}
        />
        <Text style={styles.ayuda}>{item?.ayuda}</Text>
      </View>,
    );
  }
  return camposView;
};

async function params(event, type) {
  let objtrue = true;
  let numreg = /^[0-9]+$/;
  let textreg =
    /^[A-Za-z0-9\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1\u00A0 ]+$/;
  // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let EMAIL =
    /^[A-Za-z0-9;:.,s@+*<>()\u00C1\u00E1\u00C9\u00E9\u00CD\u00ED\u00D3\u00F3\u00DA\u00FA\u00DC\u00FC\u00D1\u00F1\u00A0 ]+$/;
  if (type === 'N' && !numreg.test(event) && event !== '') {
    objtrue = false;
  } else if (type === 'S' && !textreg.test(event) && event !== '') {
    objtrue = false;
  } else if (type === 'C' && !EMAIL.test(event) && event !== '') {
    objtrue = false;
  }
  return objtrue;
}

function typesInput(dato) {
  let type = 'default';
  if (Platform.OS !== 'ios') {
    if (dato === 'S' || dato === 'SA') {
      type = 'default';
    } else if (dato === 'N') {
      type = 'numeric';
    } else if (dato === 'C') {
      type = 'default';
    }
  } else {
    if (dato === 'S' || dato === 'SA') {
      type = 'ascii-capable';
    } else if (dato === 'N') {
      type = 'numbers-and-punctuation';
    } else if (dato === 'C') {
      type = 'default';
    }
  }
  return type;
}

const renderCampoSelect = props => {
  let camposView = [];
  let totalCampos = props.template?.secciones.reporte.selects;
  if (totalCampos === undefined) {
    return null;
  }
  for (let i = 0; i < totalCampos.length; i++) {
    let item = totalCampos[i];
    camposView.push(
      <View
        key={'ViewSelect' + i}
        style={[
          styles.viewCampos,
          styles.viewCampospad,
          item?.ayuda === '' ? {marginBottom: -5, zIndex: 5} : null,
        ]}>
        <Text style={[styles.Text, {paddingTop: 0}]}>
          {item?.label}
          {item?.requerido === 1 ? null : (
            <Text style={{fontWeight: 'normal'}}>{' - Opcional'}</Text>
          )}
        </Text>
        {Platform.OS === 'ios' ? (
          <Selector
            onSelected={items => {
              let id = null;
              if (items != null) {
                id = items.value;
              }
              props.onchangeInputs(id, item?.alias);
            }}
            valueSelected={datosState.data[item?.alias]}
            list={item?.opciones}
          />
        ) : (
          <SelectSimple
            searchState={props.searchState}
            onchangeInputs={props.onchangeInputs}
            index={i}
            list={item?.opciones}
            alias={item?.alias}
          />
        )}
        <Text style={styles.ayuda}>{item?.ayuda}</Text>
      </View>,
    );
  }
  return camposView;
};
