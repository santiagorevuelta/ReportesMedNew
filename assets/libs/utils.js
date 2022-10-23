import {PermissionsAndroid, Platform} from 'react-native';

async function permisosUbicacion() {
    if (Platform.OS !== 'ios') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                await permisosUbicacion();
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    permisosUbicacion,
};
