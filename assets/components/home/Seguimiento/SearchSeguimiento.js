import axios from 'axios';
import tsconfig from '../../../tsconfig.json';

export default async function searchSeguimiento(id) {
    let url = `${tsconfig[tsconfig.use].url}${id}`;
    const config = {
        headers: {},
    };
    let data = [];
    await axios
        .get(url, config)
        .then(function (response) {
            data = response.data;
        })
        .catch(function (error) {});
    return data;
}
