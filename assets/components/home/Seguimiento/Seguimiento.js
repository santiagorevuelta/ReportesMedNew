import React, {useState, useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import TextInput from './TextInputSearch';
import {Paragraph, Text} from 'react-native-paper';
import Header from './Header';
import ScreenResult from './ScreenResult';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  responsiveFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {theme} from '../../../theme';
import Cards from './Cards/Cards';
import SearchSeguimiento from './SearchSeguimiento';
import SearchReporte from './BusquedaSeguimiento';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';

export default function Seguimiento({navigation}) {
  const [idTel, setIdTel] = useState(null);
  const [search, setSearch] = useState(false);
  const [dataReport, setDataReport] = useState([]);
  const [numeroReporte, setNumeroReporte] = useState('');
  const [searchReport, setSearchReport] = useState([]);
  const [list, setList] = useState([]);
  const [item, setItem] = useState({});
  const [reportInfo, setReportInfo] = useState([]);
  const [searchlabel, setSearchlabel] = useState(true);

  useEffect(() => {
    setIdTel(DeviceInfo.getUniqueId());
    SearchSeguimiento().then(data => {
      convertirEstados(data);
      setSearchReport(data);
      setDataReport(data);
    });
    getData().then();
  }, []);
  // setIdTel(DeviceInfo.getUniqueId());

  // useEffect(() => {
  //     if (numeroReporte !== null && numeroReporte !== '') {
  //         SearchReporte(numeroReporte, idTel).then(data => {
  //             setDataReport(data);
  //         });
  //     } else {
  //         SearchSeguimiento(idTel).then(data => {
  //             if (data === []) {
  //                 convertirEstados(data);
  //                 setDataReport(data);
  //                 // console.log(data);
  //                 setSearchReport(data);
  //             }
  //         });
  //     }
  //     getData().then();
  // }, [numeroReporte]);

  // const getSeg = () => {
  // const interval = setInterval(() => {
  //     if (numeroReporte === null && numeroReporte === '') {
  //         SearchSeguimiento(idTel).then(data => {
  //             convertirEstados(data);
  //             setDataReport(data);
  //             setSearchReport(data);
  //         });
  //     } else {
  //         SearchReporte(numeroReporte, idTel).then(data => {
  //             setDataReport(data);
  //         });
  //     }
  // }, 60000);
  // return () => clearInterval(interval);
  // };

  const timerSearchButton = () => {
    setTimeout(() => {
      setSearchlabel(true);
    }, 5000);
  };

  const getData = async () => {
    let jsonRes = await AsyncStorage.getItem('jsonmodulos');
    jsonRes = jsonRes == null ? [] : JSON.parse(jsonRes);
    setReportInfo(jsonRes);
  };

  const getConsulta = async () => {
    setSearchlabel(false);
    timerSearchButton();
    const res = await AsyncStorage.getItem('storageReportes');
    // console.log(res);
    try {
      if (numeroReporte !== null && numeroReporte !== '') {
        // console.log(idTel);
        SearchReporte(numeroReporte).then(data => {
          // setDataReport(data);
          console.log('data');
          console.log(data);
          if (data.length !== 0) {
            AsyncStorage.setItem('storageReportes', JSON.stringify(data));
            setFilter(data);
            // convertirEstados(data);
          } else {
            // let report = searchReport.find(el => {
            //   el.codigo_reporte.includes(numeroReporte);
            // });
            let report = searchReport.filter(el => {
              return el.codigo_reporte.indexOf(numeroReporte) > -1;
            });

            console.log('searchReport');
            console.log(report);
            setFilter(report);
          }
          setSearchlabel(true);
        });
      } else {
        // setDataReport(searchReport);
        //  console.log('2');
        // console.log(searchReport);
        if (searchReport.length !== 0) {
          AsyncStorage.setItem('storageReportes', JSON.stringify(searchReport));
          setFilter(searchReport);
          // convertirEstados(searchReport);
        } else {
          console.log(res);
          setFilter(res);
          // convertirEstados(res);
        }
        setSearchlabel(true);
      }
    } catch (er) {
      console.log(er);
      setFilter(res);
      setSearchlabel(true);
    }
  };

  const setEstado = select => {
    for (const li of list) {
      li.check = li.label === select.label;
    }
    // console.log(list);
    setList(list);
    // if (select.label === 'Todos') {
    //     setDataReport(searchReport);
    // } else {
    //     let info = searchReport.filter(e => {
    //         return e.estado === select.label;
    //     });
    //     setDataReport(info);
    // }
  };

  const setFilter = data => {
    let selectFilter = list.filter(element => {
      return element.check === true;
    });
    // console.log(selectFilter[0].label);
    setList(list);

    if (selectFilter.length > 0) {
      if (selectFilter[0].label === 'Todos') {
        setDataReport(data);
      } else {
        let info = data.filter(e => {
          return e.estado === selectFilter[0].label;
        });
        setDataReport(info);
      }
    } else {
      setDataReport([]);
    }
  };

  const convertirEstados = json => {
    let lista = [];
    for (const jsonElement of json) {
      let exist = false;
      for (const li of lista) {
        if (li.label === jsonElement.estado) {
          exist = true;
        }
      }
      if (!exist) {
        lista.push({
          label: jsonElement.estado,
          check: false,
        });
      }
    }
    if (lista.length > 0) {
      setList([{label: 'Todos', check: true}, ...lista]);
    } else {
      setList([]);
    }
  };

  return (
    <View style={styles.body}>
      <Header
        navigation={navigation}
        search={search}
        setSearch={setSearch}
        label={search ? 'Estado del reporte' : 'Seguir reporte'}
      />
      {search ? (
        <ScreenResult data={item} reportInfo={reportInfo} />
      ) : (
        <>
          <TextApp />
          <View style={styles.modal}>
            <Text style={[theme.textos.Label, styles.txtRes]}>
              Código de reporte
            </Text>
            <TextInput
              returnKeyType="next"
              value={numeroReporte}
              search={search}
              getConsulta={getConsulta}
              setSearch={setSearch}
              searchlabel={searchlabel}
              setSearchlabel={setSearchlabel}
              onChangeText={text => {
                setNumeroReporte(text.trim());
              }}
              autoCapitalize="none"
              placeholder={'Código de reporte'}
              keyboardType="default"
            />
          </View>
          <Cards
            data={dataReport}
            setItem={setItem}
            setEstado={setEstado}
            getConsulta={getConsulta}
            list={list}
            setList={setList}
            setSearch={setSearch}
            setSearchReport={setSearchReport}
          />
        </>
      )}
    </View>
  );
}

function TextApp() {
  return (
    <Paragraph style={styles.paragr}>
      {'Para conocer el estado de su reporte, '}
      <Paragraph
        style={{
          fontFamily: momserratBold,
          fontSize: responsiveFontSize(1.5),
          textAlign: 'justify',
          lineHeight: 17,
        }}>
        Por favor ingresa el código generado por el sistema en el momento de
        enviar previamente el reporte.
      </Paragraph>
    </Paragraph>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'rgba(125,161,193,0.49)',
    flex: 1,
    alignItems: 'center',
  },
  paragr: {
    color: '#000',
    fontFamily: momserratI,
    marginTop: responsiveScreenHeight(12),
    marginBottom: responsiveScreenHeight(2),
    paddingHorizontal: '5%',
    width: '100%',
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
  },
  modal: {
    flexDirection: 'column',
    width: '90%',
    paddingHorizontal: '6%',
    backgroundColor: theme.colors.blanco,
    padding: '3%',
    borderRadius: theme.radius,
  },
  txtRes: {
    paddingBottom: '2%',
    paddingHorizontal: '0%',
    fontFamily: momserratI,
    fontWeight: 'bold',
    color: theme.colors.negro,
  },
});
