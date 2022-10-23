import React, {Component} from 'react';
import general from '../../libs/general';
import PlantillaDos from '../componets/screenDos/PlantillaDos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';

const isEmail = val => {
  try {
    val = val.replaceAll(' ', '');
  } catch (e) {}
  let regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(val)) {
    return 'Invalid Email';
  } else {
    return val;
  }
};

class GetHome extends Component {
  constructor(props) {
    super(props);
    this.Map_Ref = React.createRef();
    this.state = {
      setTime: true,
      servicio: '',
      imagen: true,
      data: {
        imagenes: [],
      },
      items: {},
      open: false,
      value: null,
      tipo_reporte: '',
      load: true,
      guardar: true,
      modalVisible: false,
      imageVisible: null,
      mainView: false,
      titleMsg: null,
      msg: null,
    };
  }

  async componentDidMount() {
    await this.initial();
  }

  initial = async () => {
    this.setLoadVisible(true);
    this.setState({
      template: this.props.route.params.modulo.json_plantilla,
      servicio: this.props.route.params.servicio,
      tipo_reporte: this.props.route.params.tipo_reporte,
    });
    let jsonData = JSON.parse(this.props.route.params.dato);
    let res = await AsyncStorage.getItem('params');
    this.setState({items: JSON.parse(res)});
    this.setState({...this.state.data, data: jsonData.data});
    //this.state.itemsSelect = this.state.plantillaUno.OPCIONESTIPO;
    this.props.navigation.setOptions({
      title: this.state.template.secciones.reporte.titulo,
    });
    this.setLoadVisible(false);
    this.setState({items: JSON.parse(res)});
  };

  onchangeInputs = (text, name) => {
    this.setState({data: {...this.state.data, [name]: text}});
    this.onsubmit();
  };

  onsubmit = () => {
    const data = this.state.data;
  };

  searchStateDos = () => {
    return this.state;
  };

  setDatosState = (name, dato) => {
    this.setState({[name]: dato});
  };

  setImagenes = items => {
    this.state.data.imagenes = items;
    this.setState({imagen: false});
  };

  guardarinfo = async () => {
    this.setLoadVisible(true);
    if (this.state.servicio === '' || this.state.servicio === undefined) {
      general.notifyMessage('Service Temporarily Unavailable');
      this.setLoadVisible(false);
      this.setState({guardar: true});
      return;
    }

    let result = this.verificarCajas();
    if (result) {
      this.setLoadVisible(true);
      this.setState({setTime: false});
      //  setTimeout(() => {
      const myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Content-Type', 'application/json');
      const formdata = new FormData();
      formdata.append('hash_key', this.state.data.hash_key);
      formdata.append('uid', this.state.data.uid);
      try {
        delete this.state.data.uid;
        delete this.state.data.hash_key;
      } catch (e) {}
      let jsonData = JSON.stringify(this.state.data);
      formdata.append('data', jsonData);
      formdata.append('identificador', DeviceInfo.getUniqueId());

      const requestOptions = {
        method: 'POST',
        header: myHeaders,
        url: this.state.servicio,
        data: formdata,
      };

      this.setLoadVisible(true);

      console.log(requestOptions);
      axios(requestOptions, formdata)
        .then((res, req) => {
          console.log(res);
          if (res.data === 'OK') {
            window.modalAlerta(
              this.state.template.title_ok,
              this.state.template.ok,
              [{text: 'Aceptar'}],
              true,
              false,
              3,
            );
            this.props.navigation.navigate('Home');
            this.endSend();
          } else {
            if (res.data.state) {
              window.modalAlerta(
                this.state.template.title_ok,
                this.state.template.ok.replace('?rad?', res.data.data),
                [{text: 'Aceptar'}],
                true,
                false,
                3,
              );
              this.props.navigation.navigate('Home');
              this.endSend();
            } else if (!res.data.state) {
              window.modalAlerta(
                'Error',
                res.data.data + '<br> Code:' + req.status,
                [{text: 'Aceptar'}],
              );
              this.endSend();
            } else {
              try {
                window.modalAlerta(
                  'Error',
                  res.data + '<br> Code:' + req.status,
                  [{text: 'Aceptar'}],
                );
                this.endSend();
              } catch (err) {
                window.modalAlerta(
                  'Error',
                  this.state.items.ERRORGUARDAR + '<br> Code:' + req.status,
                  [{text: 'Aceptar'}],
                );
                this.endSend();
              }
            }
          }
        })
        .catch(({request}) => {
          window.modalAlerta(
            'Error',
            this.state.items.ERRORGUARDAR + 'Code:' + request.status,
            [{text: 'Aceptar'}],
          );
          this.endSend();
        })
        .finally(() => {
          this.endSend();
        });
    }
    // }, 15000);
  };

  verificarCajas = () => {
    let totalSelects = this.state.template.secciones.reporte.selects;
    for (const item of totalSelects) {
      if (item.requerido === 1) {
        if (
          this.state.data[item.alias] === undefined ||
          this.state.data[item.alias] === null ||
          !this.state.data[item.alias] ||
          this.state.data[item.alias] === '0'
        ) {
          general.notifyMessage(item.label + '\n (requerido)');
          this.setLoadVisible(false);
          this.setState({guardar: true});
          return false;
        }
      }
    }

    let totalCampos = this.state.template.secciones.reporte.cajas;
    for (const item of totalCampos) {
      let req = item.requerido;
      let type = item.tipocampo;
      if (req === 1) {
        if (
          this.state.data[item.alias] === undefined ||
          this.state.data[item.alias] === null ||
          !this.state.data[item.alias] ||
          this.state.data[item.alias] === ''
        ) {
          general.notifyMessage(item.label + '\n (requerido)');
          this.setLoadVisible(false);
          this.setState({guardar: true});
          return false;
        } else if (type === 'C') {
          let emailTru = isEmail(this.state.data[item.alias]);
          if (emailTru === 'Invalid Email') {
            general.notifyMessage(item.label + '\n (Es invalido)');
            this.setLoadVisible(false);
            this.setState({guardar: true});
            return false;
          }
        }
        if (type === 'N') {
          let tel = this.state.data[item.alias];
          if (tel.length < 10) {
            general.notifyMessage(item.label + '\n (Debe contener 10 dígitos)');
            this.setLoadVisible(false);
            this.setState({guardar: true});
            return false;
          }
        }
      }
    }
    return true;
  };

  endSend = async () => {
    this.setLoadVisible(false);
    this.setState({guardar: true, setTime: true});
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
  };

  setLoadVisible = load => {
    this.setState({load});
  };

  render() {
    return (
      <PlantillaDos
        load={this.state.load}
        setLoadVisible={this.setLoadVisible}
        searchState={this.searchStateDos}
        setDatosState={this.setDatosState}
        guardarinfo={this.guardarinfo}
        FileDeleteData={this.FileDeleteData}
        onchangeInputs={this.onchangeInputs}
        setImagenes={this.setImagenes}
        template={this.state.template}
      />
    );
  }
}

export default GetHome;
