import axios from 'axios';
import tsconfig from '../../../tsconfig.json';
import DeviceInfo from 'react-native-device-info';

export default async function searchReporte(id) {
  let idTel = await DeviceInfo.getUniqueId();
  let url = `${tsconfig[tsconfig.use].search}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let data = [];
  await axios
    .post(url, {id, idTel}, config)
    .then(function (response) {
      data = response.data;
    })
    .catch(function (error) {});
  return data;
}
