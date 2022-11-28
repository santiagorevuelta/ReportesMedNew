import React, {Component} from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Plantilla from '../componets/screenUno/PlantillaUno';

import Geolocation from '@react-native-community/geolocation';
import general from '../../libs/general';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CoordsSearch} from '../../libs/CoordsSearch';
import {autocompleteSearch} from '../../libs/AutocompleteSearch';
import {geoSearch} from '../../libs/GeoSearch';
import axios from 'axios';
import tsconfig from '../../tsconfig.json';
import GetLocation from 'react-native-get-location';

let Map_Ref = React.createRef();

let granted;
export default class PlantillaUnoUbic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {imagenes: [], description: ''},
      rutaGuardado: '',
      intentosLocation: 0,
      template: {},
      load: true,
      filterData: [],
      selectedItem: null,
      parametros: [],
      dirInicial: false,
      buscarDir: '',
      items: {},
      servicio: '',
      tipo_reporte: '',
      estructura: '',
      titleMsg: null,
      msg: null,
      uid: '',
      hash_key: '',
      timeout: null,
      local: false,
      validReport: false,
    };
  }

  async componentDidMount() {
    this.initial().then();
  }

  initial = async () => {
    try {
      let res = await AsyncStorage.getItem('params');
      this.setState({items: JSON.parse(res)});
      let jsonModulo = this.props.route.params.modulo;
      let json_plantilla = jsonModulo.json_plantilla;
      this.setState({template: json_plantilla});
      this.setState({servicio: jsonModulo.url_servicio});
      this.setState({tipo_reporte: jsonModulo.nombre});

      this.props.navigation.setOptions({
        title: json_plantilla.secciones.mapa.titulo,
      });
      this.alertApp(json_plantilla.title_alert, json_plantilla.alert, [], true);

      this.setState({
        data: {
          ...this.state.data,
          obra: jsonModulo.id_tipo_reporte,
          id_tipo_reporte: jsonModulo.id_tipo_reporte,
          hash_key: this.state.items.HASH_KEY,
          uid: this.state.items.UID,
        },
      });

      this.setLoadVisible(false);
      if (Platform.OS !== 'ios') {
        Map_Ref.current?.injectJavaScript('cambiarop();');
      }
      this.setState({buscarDir: this.state.items.BUSCARDIR});
      this.permisosUbicacion().then();
      this.setLoadVisible(false);
    } catch (e) {
      this.setLoadVisible(false);
    }
  };

  alertApp = (title, msg) => {
    if (title !== '' && title !== undefined) {
      window.modalAlerta(title, msg, [{text: 'Aceptar'}]);
    }
  };

  async permisosUbicacion() {
    if (Platform.OS !== 'ios') {
      try {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setTimeout(() => {
            this.getLocalizac();
            this.getTracking();
          }, 2000);
        }
      } catch (err) {}
    } else {
      setTimeout(() => {
        this.getLocalizac();
        this.getTracking();
        this.setLoadVisible(false);
      }, 2000);
    }
  }

  setImagenes = items => {
    // console.log('change IMG ', this.state.validReport);
    this.onChangevalidarReporte();
    this.state.data.imagenes = items;
    this.setState({imagen: false});
  };

  onchangeInputs = (text, name) => {
    // console.log('change direccion ', this.state.validReport);
    this.onChangevalidarReporte();
    this.setState({data: {...this.state.data, [name]: text}});
  };

  ValidarValidaciones = async datos => {
    let validado = '';
    let url = tsconfig[tsconfig.use].validaciones;
    let jsonGeo = JSON.stringify(datos);
    await axios
      .post(url, {
        data: jsonGeo,
      })
      .then(async result => {
        validado = result.data;
      })
      .catch(err => {
        validado = url;
      });
    return validado;
  };

  onChangevalidarReporte = async () => {
    const datos = {...this.state.data};
    if (datos.location === undefined || datos.location === '') {
      this.setValidReport(false);
      return;
    }
    if (this.state.template.secciones.mapa.requeridoref === '1') {
      if (datos.description === undefined || datos.description === '') {
        this.setValidReport(false);
        return;
      }
    }
    if (this.state.template.validacion_geografica) {
      let valida = await this.ValidarValidaciones(datos);
      if (valida == 1) {
        console.log('ok');
      } else if (valida == 0) {
        this.setValidReport(false);
        return;
      } else if (valida != 0 && valida != 1) {
        this.setValidReport(false);
        return;
      }
    }
    if (this.state.template.secciones.fotos.requeridas > 0) {
      if (
        datos.imagenes.length < this.state.template.secciones.fotos.requeridas
      ) {
        this.setValidReport(false);
        return;
      }
    }
    this.setValidReport(true);
    return true;
  };

  validarReporte = async () => {
    let requerido = '\n(requerido)';
    const datos = {...this.state.data};
    if (datos.latitude === 'SN' || datos.longitude === 'SN') {
      general.notifyMessage(this.state.items.VERIFICDIR);
      return;
    }
    if (datos.location === undefined || datos.location === '') {
      general.notifyMessage(
        this.state.template.secciones.mapa.labeldireccion + requerido,
      );
      return;
    }
    if (this.state.template.secciones.mapa.requeridoref === '1') {
      if (datos.description === undefined || datos.description === '') {
        general.notifyMessage(
          this.state.template.secciones.mapa.labelref + requerido,
        );
        return;
      }
    }
    if (this.state.template.validacion_geografica) {
      this.setLoadVisible(true);
      let valida = await this.ValidarValidaciones(datos);
      if (valida == 1) {
        console.log('ok');
        this.setLoadVisible(false);
      } else if (valida == 0) {
        window.modalAlerta(
          'Lo sentimos',
          'actualmente este reporte no tiene cobertura en tu zona',
          [{text: 'Aceptar'}],
        );
        this.setLoadVisible(false);
        return;
      } else if (valida != 0 && valida != 1) {
        window.modalAlerta(
          'Lo sentimos',
          'Hubo un problema con el reporte, intenta de nuevo',
          [{text: 'Aceptar'}],
        );
        this.setLoadVisible(false);
        return;
      }
    }
    if (this.state.template.secciones.fotos.requeridas > 0) {
      if (
        datos.imagenes.length < this.state.template.secciones.fotos.requeridas
      ) {
        general.notifyMessage(
          'Fotos minimas requeridas ' +
            this.state.template.secciones.fotos.requeridas,
        );
        return;
      }
    }

    this.props.navigation.navigate('PlantillaUnoReporte', {
      dato: JSON.stringify(this.state),
      template: this.state.template,
      modulo: this.props.route.params.modulo,
      servicio: this.state.servicio,
      tipo_reporte: this.state.tipo_reporte,
    });
  };

  coordinatesFromMap = data => {
    let jsondatos = JSON.parse(data);
    let datos = jsondatos['4326'];

    clearTimeout(this.state.timeout);
    let dat = this;
    let t = setTimeout(function () {
      dat.getDirGeoCod(datos.lat, datos.lng);
      dat.llenarUbicacion(datos.lat, datos.lng);
    }, 500);
    this.setState({timeout: t});
  };

  async getDirGeoCod(lat, lng) {
    let direccion = await CoordsSearch(lat, lng, this.state.items);
    if (
      (direccion === '' || direccion === null) &&
      this.state.items.ALERTDIR !== ''
    ) {
      general.notifyMessage(this.state.items.ALERTDIR);
      this.limpiar();
      return;
    }

    
    this.setState({
      data: {...this.state.data, location: direccion},
    });
    // console.log(direccion);
    this.setState({selectedItem: direccion});
    this.onChangevalidarReporte();
  }

  limpiar = () => {
    this.setLoadVisible(false);
    this.setState({filterData: []});
    this.setState({selectedItem: ''});
    this.setState({
      data: {...this.state.data, location: ''},
    });
  };

  getCapas = () => {};

  getTracking = () => {
    let trackingConfig = {
      enableHighAccuracy: this.state.intentosLocation !== 2,
      timeout: 2000,
      maximumAge: 0,
      distanceFilter: 10,
    };
    if (Platform.OS !== 'ios') {
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        this.permisosUbicacion().then();
      } else {
        Geolocation.watchPosition(
          this.successTracking,
          this.errorTracking,
          trackingConfig,
        );
      }
    } else {
      Geolocation.watchPosition(
        this.successTracking,
        this.errorTracking,
        trackingConfig,
      );
    }
  };

  successTracking = props => {
    try {
      let currentLongitude = JSON.stringify(props.coords.longitude);
      let currentLatitude = JSON.stringify(props.coords.latitude);
      if (Map_Ref.current) {
        Map_Ref.current?.injectJavaScript(
          `setTracking([${currentLatitude}, ${currentLongitude}], 18);`,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  errorTracking = error => {
    console.log('Error tracking: ' + error);
  };

  getLocalizac = () => {
    this.setState({local: true});
    if (Platform.OS !== 'ios') {
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        this.permisosUbicacion();
      } else {
       /* Geolocation.getCurrentPosition(
          this.successLocation,
          this.errorLocation,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          },
        );*/
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }).then(position => {
          this.successLocation({coords:position});
        }).catch(error => {
            this.errorLocation(error);
          });

      }
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }).then(position => {
          this.successLocationIOS(position);
        })
        .catch(error => {
          this.errorLocation(error);
        });
    }
  };

  successLocation = position => {
    try {
      let currentLongitude = JSON.stringify(position.coords.longitude);
      let currentLatitude = JSON.stringify(position.coords.latitude);
      if (Map_Ref.current) {
        Map_Ref.current?.injectJavaScript(
          `mymap.setView([${currentLatitude}, ${currentLongitude}], 18);`,
        );
        Map_Ref.current?.injectJavaScript(
          `setTracking([${currentLatitude}, ${currentLongitude}], 18);`,
        );
      }
      this.llenarUbicacion(currentLatitude, currentLongitude);
      this.getDirGeoCod(currentLatitude, currentLongitude).then();
      this.setState({dirInicial: false});
      this.setLoadVisible(false);
      this.setState({local: false});
    } catch (e) {
      this.setState({local: false});
      console.log(e);
    }
  };

  successLocationIOS = position => {
    // window.modalAlerta(
    //     'Información',
    //     this.state.items.ALERTA1,
    //     [{text: 'Aceptar'}],
    //     true,
    // );
    // window.modalAlerta('Información', this.state.items.ALERTA2, [
    //     {text: 'Aceptar'},
    // ]);
    // window.modalAlerta('Información', this.state.items.ALERTA3, [
    //     {text: 'Aceptar'},
    // ]);
    try {
      let currentLongitude = JSON.stringify(position.longitude);
      let currentLatitude = JSON.stringify(position.latitude);
      if (Map_Ref.current) {
        Map_Ref.current?.injectJavaScript(
          `mymap.setView([${currentLatitude}, ${currentLongitude}], 18);`,
        );
        Map_Ref.current?.injectJavaScript(
          `setTracking([${currentLatitude}, ${currentLongitude}], 18);`,
        );
      }
      this.llenarUbicacion(currentLatitude, currentLongitude);
      this.getDirGeoCod(currentLatitude, currentLongitude).then();

      this.setState({dirInicial: false});
      this.setLoadVisible(false);
    } catch (e) {
      console.log(e);
    }
    this.setState({local: false});
  };

  errorLocation = error => {
    console.log(this.state.intentosLocation)
    if (this.state.intentosLocation < 5) {
      this.setState({intentosLocation: this.state.intentosLocation + 1});
      this.getLocalizac();
      return;
    }
    console.log('Error location');
    console.log(error);
    if (error.code === 2) {
      window.modalAlerta(
        this.state.items.TITULOALERTA1,
        this.state.items.ALERTA1,
        [{text: 'Aceptar'}],
        true,
      );
    } else if (error.code === 3) {
      window.modalAlerta(
        this.state.items.TITULOALERTA2,
        this.state.items.ALERTA2,
        [{text: 'Aceptar'}],
      );
    } else if (error.code === 1) {
      window.modalAlerta(
        this.state.items.TITULOALERTA3,
        this.state.items.ALERTA3,
        [{text: 'Aceptar'}],
      );
    } else if (error.code === 'UNAUTHORIZED') {
      window.modalAlerta(
        this.state.items.TITULOALERTA3,
        this.state.items.ALERTA3,
        [{text: 'Aceptar'}],
      );
    } else if (error.code === 'UNAVAILABLE') {
      window.modalAlerta(
        this.state.items.TITULOALERTA2,
        this.state.items.ALERTA2,
        [{text: 'Aceptar'}],
      );
    } else if (error.code === 'CANCELLED') {
      window.modalAlerta(
        this.state.items.TITULOALERTA1,
        this.state.items.ALERTA1,
        [{text: 'Aceptar'}],
      );
    } else if (error.code === 'TIMEOUT') {
      window.modalAlerta(
        this.state.items.TITULOALERTA1,
        this.state.items.ALERTA1,
        [{text: 'Aceptar'}],
      );
    }
    this.setState({intentosLocation: 0});
    this.setLoadVisible(false);
    this.setState({dirInicial: false});
    this.setState({local: false});
  };

  async ActivarGps() {
    //  console.log('Activar GPS');
  }

  llenarUbicacion = (currentLatitude, currentLongitude) => {
    // console.log('change move map ', this.state.validReport);
    this.onChangevalidarReporte();
    this.state.data.latitude = currentLatitude;
    this.state.data.longitude = currentLongitude;
  };

  searchDirection = async direccion => {
    if (direccion.length > 3) {
      let result = await autocompleteSearch(direccion, this.state.items);
      this.state.dirInicial = false;
      this.setState({
        dataAutocomplete: result,
      });
      let into = [];
      for (const intoElement of result) {
        into.push(intoElement.direccion);
      }
      this.setState({
        filterData: into,
      });
    } else {
      this.state.dirInicial = true;
      this.setState({filterData: []});
    }
  };

  searchCoordinates = direccion => {
    this.setLoadVisible(true);
    if (direccion.length > 0) {
      let result = {};
      for (const direccionElement of this.state.dataAutocomplete) {
        if (direccionElement.direccion === direccion) {
          result = direccionElement;
        }
      }

      if (result.direccion) {
        let latitud = result.latitud;
        let longitud = result.longitud;
        Map_Ref.current?.injectJavaScript(
          `setCoord(${latitud}, ${longitud},);`,
        );
        this.llenarUbicacion(latitud, longitud);
        this.setLoadVisible(false);
        this.setDatosState('selectedItem', direccion);
        this.setDatosState('filterData', []);
      }
    } else {
      this.limpiar();
    }
  };

  ubicarDireccion = async txt => {
    let direction = txt ? txt : this.state.data.direccion;
    this.setLoadVisible(true);
    if (
      this.state.filterData.length > 1 &&
      (this.state.selectedItem !== null || this.state.selectedItem !== '')
    ) {
      this.setLoadVisible(false);
      return;
    }

    this.setState({filterData: []});
    if (direction === undefined || direction === '') {
      this.setLoadVisible(false);
      return;
    }
    // console.log(this.state.template.accionFilter_map);
    let result = await geoSearch(
      direction,
      this.state.items,
      this.state.template.accionFilter_map,
    );
    console.log(result);
    let requerido = '\n(requerido)';
    if (result.latitude === 'SN' || result.longitude === 'SN') {
      general.notifyMessage(this.state.items.VERIFICDIR);
      return;
    }
    if (result.latitud) {
      let latitud = result.latitud;
      let longitud = result.longitud;

      Map_Ref.current?.injectJavaScript(
        `moverenmapa(${latitud}, ${longitud}, 18);`,
      );

      if (result.dir) {
        direction = result.dir;
      }

      this.setState({selectedItem: direction});
      this.llenarUbicacion(latitud, longitud);
      this.setLoadVisible(false);
      this.setState({
        data: {...this.state.data, location: direction},
      });
    } else {
      this.setLoadVisible(false);
      general.notifyMessage(this.state.items.VERIFICDIR);
      //this.limpiar();
    }
  };

  searchState = () => {
    return this.state;
  };

  setLocation = direction => {
    this.setState({
      data: {...this.state.data, ['location']: direction},
    });
  };

  setDatosState = (name, dato) => {
    this.setState({[name]: dato});
  };

  FileDeleteData = index => {
    this.state.data.imagenes[index] = [];
    let imagenes = this.state.data.imagenes;
    this.state.data.imagenes = [];
    for (let i = 0; i < imagenes.length; i++) {
      if (imagenes[i].length !== 0) {
        this.state.data.imagenes.push(imagenes[i]);
      }
    }
    this.setState({data: {...this.state.data, ['imagen']: false}});
    // console.log('change delete IMG');
    this.onChangevalidarReporte();
  };

  setLoadVisible = load => {
    this.setState({load});
  };

  setValidReport = validReport => {
    console.log(validReport);
    this.setState({validReport});
  };

  render() {
    return (
      <Plantilla
        load={this.state.load}
        setLoadVisible={this.setLoadVisible}
        coordinatesFromMap={this.coordinatesFromMap}
        getLocalizac={this.getLocalizac}
        validarReporte={this.validarReporte}
        getCapas={this.getCapas}
        onchangeInputs={this.onchangeInputs}
        searchDirection={this.searchDirection}
        ubicarDireccion={this.ubicarDireccion}
        searchCoordinates={this.searchCoordinates}
        limpiar={this.limpiar}
        searchState={this.searchState}
        setLocation={this.setLocation}
        setDatosState={this.setDatosState}
        validReport={this.validReport}
        setValidReport={this.setValidReport}
        Map_Ref={Map_Ref}
        setImagenes={this.setImagenes}
        FileDeleteData={this.FileDeleteData}
        template={this.state.template}
      />
    );
  }
}
