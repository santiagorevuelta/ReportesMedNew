import axios from 'axios';
import tsconfig from '../../../tsconfig.json';
import DeviceInfo from 'react-native-device-info';

export default async function searchSeguimiento() {
  let idTel = await DeviceInfo.getUniqueId();
  console.log(idTel)
  let url = `${tsconfig[tsconfig.use].url}${idTel}`;
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
