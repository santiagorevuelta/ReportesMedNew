import React from 'react';
import {
  StatusBar,
  Image,
  Platform,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import ViewGrupos from './gruposModulos';

import {notifyMessage} from '../../../libs/general';

import tsconfig from '../../../tsconfig.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {stylesCards, stylesSlide, styles, stylestop} from './ModulosCss';
import {Renderload} from '../../../libs/LoadApp';
import {ActivityIndicator} from 'react-native-paper';
import {theme} from '../../../theme';
import VersionCheck from 'react-native-version-check';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

class HomeReportes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      texts: {},
      hijo: false,
      loadData: true,
      load: false,
      hijos: [],
      json: [],
    };
    this.load = false;
  }

  setLoad = load => {
    this.setState({load});
  };

  searchModulo = async item => {
    this.setLoad(true);
    /* this.setState({hijos: []});
        this.setState({hijo: false});
        const json = this.state.json;
        let hijosDatos = [];
        let idPadre = null;
        console.log(json);
        for (let items of json) {
            if (item.id_reporte === items.id_padre && items.id_padre !== null) {
                idPadre = item.id_reporte;
                hijosDatos.push(items);
            }
        }*/
    // this.setState({hijos: hijosDatos});
    //if (idPadre !== null) {
    //     this.setState({hijo: true});
    // } else {
    //   this.setState({hijo: false});
    this.searchModuloRes(item);
    //}
    this.setLoad(false);
  };

  searchModuloRes = item => {
    this.setLoad(true);
    if (item.json_plantilla.plantilla) {
        console.log("click")
        this.props.navigation.navigate('PlantillaUno', {modulo: item});
    } else {
      notifyMessage(this.state.texts.NOFOUND);
    }
    // this.setLoad(false);
  };

  searchState = () => {
    return this.state;
  };

  setStateGroup = () => {
    this.setState({hijos: []});
    this.setState({hijo: false});
  };

  setLoadData = loadData => {
    this.setState({loadData});
  };

  async componentDidMount() {
    this.initial().then();
    // setTimeout(() => {
    //     this.setLoad(!this.state.loadData);
    // }, 5000);
  }

  initial = async () => {
    let res = await AsyncStorage.getItem('params');
    this.setState({texts: JSON.parse(res)});
    axios
      .get(tsconfig[tsconfig.use].modules)
      .then(async result => {
        let json = result.data;
        let jsonRes = [];
        this.setState({json});
        if (json.length > 0) {
          let sw = 1;
          jsonRes.push({datos: json, key: sw++});
        } else {
          let jsonRe = await AsyncStorage.getItem('jsonmodulos');
          jsonRes = jsonRe == null ? [] : JSON.parse(jsonRe);
        }
        AsyncStorage.setItem('jsonmodulos', JSON.stringify(jsonRes));
        this.setState({data: jsonRes});
      })
      .catch(async () => {
        let jsonRes = await AsyncStorage.getItem('jsonmodulos');
        jsonRes = jsonRes == null ? [] : JSON.parse(jsonRes);
        this.setState({json: jsonRes});
        this.setState({data: jsonRes});
      });
  };

  setLoadVisible = load => {
    this.setState({load});
  };

  RenderSlider() {
    return (
      <ScrollView style={{marginHorizontal: 3}}>
        {this.state.data?.length === 0 ? (
          this.state.loadData ? (
            <ActivityIndicator
              animating={true}
              style={{marginTop: 10}}
              color={theme.colors.primary}
            />
          ) : null
        ) : (
          this.state.data.map((item, i) => (
            <View style={stylesSlide.slide} key={'viewPadre' + i}>
              {item.datos.map(items => (
                <TouchableOpacity
                  style={stylesCards.padre}
                  onPress={() => {
                    this.searchModulo(items).then();
                  }}
                  key={'viewHijo' + items.id_tipo_reporte}>
                  <View style={stylesCards.contenedorImagen}>
                    <Image
                      source={{uri: items.icono}}
                      style={stylesCards.imagenSeccion}
                    />
                  </View>
                  <View style={stylesCards.contenedor}>
                    <Text style={stylesCards.nameSeccion}>{items.nombre}</Text>
                    <Text style={stylesCards.detalleSeccion}>
                      {items.descripcion}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
        <Text style={stylesCards.nameSeccion}>
          V. {VersionCheck.getCurrentVersion()}
        </Text>
      </ScrollView>
    );
  }

  render() {
    return this.state.hijo ? (
      <ViewGrupos
        searchState={this.searchState}
        setStateGroup={this.setStateGroup}
        searchModuloRes={this.searchModuloRes}
      />
    ) : (
      <View style={styles.Container}>
        <StatusBar barStyle="dark-content" />
        <View style={stylestop.contenedor}>
          <View style={stylestop.contentHeader}>
            <Image
              source={require('../../../iconos/logoAlcaldia.png')}
              style={stylestop.logo}
            />
            <Image
              source={
                Platform.OS === 'ios'
                  ? require('../../../iconos/splash/REPORTESMED.png')
                  : require('../../../iconos/splash/REPORTESMED2.png')
              }
              style={stylestop.huecosImg}
            />
            <Text style={stylestop.textayuda}>
              {'\n' + this.state.texts.CUENTAAYUDA}
            </Text>
            <Text style={stylestop.tipoayuda}>{this.state.texts.TIPODANO}</Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: responsiveScreenHeight(Platform.OS === 'ios' ? 30 : 27),
          }}>
          {this.RenderSlider()}
        </View>

        <Renderload
          load={this.state.load}
          setLoadVisible={this.setLoadVisible}
        />
      </View>
    );
  }
}

export default HomeReportes;
