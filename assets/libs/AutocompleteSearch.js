import axios from 'axios';
import {Alert} from 'react-native';
import config from '../tsconfig.json';

export async function autocompleteSearch(adress, params) {
    if (params === undefined) {
        return;
    }
    const data = {
        aplicacion: 'reportesmed',
        direccion: adress,
        cantidad: '3',
    };
    let rta = [];
    const url = params.autodir;
    await axios
        .post(url, data)
        .then(res => {
            if (!res.data.respuesta) {
                rta = res.data;
            }
        })
        .catch(error => {
            Alert.alert(' Hubo problemas con la peticíón.', error);
        });
    return rta;
}
