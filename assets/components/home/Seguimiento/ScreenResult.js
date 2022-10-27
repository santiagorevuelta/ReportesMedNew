import React, {useState, Fragment} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Card, Divider} from 'react-native-paper';
import {Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import ImageRender from './RenderImagen';
import ModalImage from './ModalImage';
import tsconfig from '../../../tsconfig.json';
import {ScrollView} from 'react-native-gesture-handler';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
const momserratI = Platform.OS !== 'ios' ? 'montserratreg' : 'Montserrat';
const txtDesc =
  Platform.OS !== 'ios' ? responsiveFontSize(1.5) : responsiveFontSize(1.6);
const txtHelp =
  Platform.OS !== 'ios' ? responsiveFontSize(1.4) : responsiveFontSize(1.5);

export default function Header({data}) {
  const [visible, setVisible] = React.useState(false);
  const [dataGeneral] = React.useState(data);
  const [urlImage, setUrlImage] = useState(null);
  return (
    <View style={styles.body}>
      <ModalImage
        modalVisible={visible}
        onModalVisible={setVisible}
        url={urlImage}
      />
      <Detailers data={data} />
      <RenderItemsImagenesAntes
        data={data}
        setVisible={setVisible}
        setUrlImage={setUrlImage}
      />
      {data.despues === 1 ? (
        <RenderItemsImagenes
          data={data}
          setVisible={setVisible}
          setUrlImage={setUrlImage}
        />
      ) : null}
    </View>
  );
  function Detailers({data}) {
    let none =
      'id_asunto_actual,id_auditoria,tipo_dano,identificador_dispositivo,id_respuesta,id_reporte,codigo_barrio,codigo_comuna,despues,id_tipo_reporte,x,y,ruta_respuesta,ruta_imagen,responsable';
    let General = [];
    Object.keys(dataGeneral).forEach(function (key) {
      const value = dataGeneral[key];
      if (!none.includes(key)) {
        General.push(
          <Text style={styles.TextData} key={key}>
            {key
              .replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())
              .replace('_', ' ')}
            :
            <Text style={styles.TextNum}>
              {value == null ? '' : '  ' + value}
            </Text>
          </Text>,
        );
      }
    });

    return (
      <Fragment>
        <Text style={styles.TextHeader}>Datos del reporte:</Text>
        <Divider style={styles.divider} />
        {General}
        <Divider style={styles.divider} />
      </Fragment>
    );
  }
}

function RenderItemsImagenesAntes({setVisible, setUrlImage, data}) {
  if (!data.ruta_imagen) {
    return null;
  }

  let img = data.ruta_imagen;
  let cantidad = [];
  if (img !== null || true) {
    let name = img.substring(0, img.length - 1);
    let total = img.substring(img.length - 1, img.length);
    for (let i = 1; i <= total; i++) {
      cantidad.push({
        url: `${tsconfig[tsconfig.use].default}/${name}_${i}.jpg`,
      });
    }
  }

  return (
    <Fragment>
      <Text style={styles.TextHeader}>
        {data.despues === 1 ? 'Antes: ' : 'Imagenes'}
        {cantidad.length === 0 ? (
          <Text style={styles.TextNum}> Sin imagenes</Text>
        ) : null}
      </Text>
      {cantidad.length === 0 ? null : (
        <ScrollView horizontal style={styles.slide}>
          {cantidad?.map((item, k) => (
            <Card
              key={k}
              style={styles.card}
              onPress={() => {
                setUrlImage(item.url);
                setVisible(true);
              }}>
              <ImageRender url={item.url} style={styles.image} />
            </Card>
          ))}
        </ScrollView>
      )}
    </Fragment>
  );
}

function RenderItemsImagenes({setVisible, setUrlImage, data}) {
  if (data.ruta_respuesta == null) {
    return null;
  }
  let img = data.ruta_respuesta;
  let solucion = [];
  if (img !== null || true || img !== '') {
    let name = img.substring(0, img.length - 1);
    let total = img.substring(img.length - 1, img.length);
    for (let i = 1; i <= total; i++) {
      solucion.push({
        url: `${tsconfig[tsconfig.use].default}/${name}_${i}.jpg`,
      });
    }
  }
  if (solucion.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <Text style={styles.TextHeader}>Solución en imágenes:</Text>
      <ScrollView horizontal style={styles.slide}>
        {solucion?.map((item, k) => (
          <Card
            key={k}
            style={styles.card}
            onPress={() => {
              setUrlImage(item.url);
              setVisible(true);
            }}>
            <ImageRender url={item.url} style={styles.image} />
          </Card>
        ))}
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  slide: {
    marginTop: 10,
    flexDirection: 'row',
    paddingBottom: 20,
    elevation: 10,
  },
  card: {
    width: responsiveScreenWidth(30),
    height: responsiveScreenWidth(25),
    marginHorizontal: 5,
    borderRadius: 10,
  },
  image: {
    width: 'auto',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  body: {
    color: '#000',
    fontFamily: momserratI,
    marginTop: responsiveScreenHeight(12),
    width: '90%',
    elevation: 10,
    borderRadius: 15,
    padding: '3%',
    backgroundColor: '#fff',
  },
  TextHeader: {
    fontFamily: momserratBold,
    fontWeight: 'bold',
    fontSize: txtDesc,
    paddingBottom: 20,
  },
  TextData: {
    fontFamily: momserratBold,
    fontWeight: 'bold',
    fontSize: txtDesc,
    paddingBottom: 10,
  },
  dividerSimple: {
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },
  divider: {
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'rgba(82,82,82,0.45)',
  },
  TextNum: {
    fontFamily: momserratBold,
    color: 'gray',
    fontSize: txtHelp,
  },
  TextNumRes: {
    fontFamily: momserratBold,
    color: 'gray',
    fontSize: txtHelp,
  },
  modal: {
    justifyContent: 'center',
    elevation: 10,
    borderRadius: 25,
    width: '90%',
    padding: '3%',
    backgroundColor: '#fff',
  },
});
