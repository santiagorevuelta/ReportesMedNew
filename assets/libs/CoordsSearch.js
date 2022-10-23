import axios from 'axios';
import {Alert} from 'react-native';
import config from '../tsconfig.json';
import encode64 from './B64';

export async function CoordsSearch(lat, lng, params) {
    if (params === undefined) {
        return;
    }
    //console.log('CoordsSearch ' + new Date());
    const data = {
        aplicacion: 'reportesmed',
        longitud: lng,
        latitud: lat,
    };

    let rta = '';
    const url = params.dircoord;
    if (params.tipoServicio === "true"){
        await axios
        .post(url, data)
        .then(res => {
            if (res == null) {
                window.modalAlerta(
                    ' Hubo problemas con la peticion',
                    'La ubicación debe estar cerca a la malla vial y dentro los límites de medellín',
                );
            }
            if (!res.data.respuesta) {
                if (res.data.direccion != null) {
                    rta = res.data.direccion;
                }
            }
        })
        .catch(error => {
            // console.log(error);
            Alert.alert(' Hubo problemas con la peticion.', error);
        });
    //console.log('rta = ' + rta + ' ' + new Date());
    
    }else{

        const consulta = {
            SQL: 'SQL_HUECOS_CONSULTAR_GEOCOD_DIRECCION',
            N: 2,
            DATOS: {P1: lng + '', P2: lat + ''},
        };
        let url = params.consultaHuecosMed +
            encodeURIComponent(encode64(JSON.stringify(consulta)));
        
        await axios
        .post(url, data)
        .then(res => {
            if (res.data.length > 0) {
                rta = res.data[0].DATOS;
            }
        })
        .catch(error => {
            // console.log(error);
            Alert.alert(' Hubo problemas con la peticion.', error);
        });
    }
    return rta;
}
