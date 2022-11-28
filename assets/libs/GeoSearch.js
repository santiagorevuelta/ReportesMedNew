import axios from 'axios';

export async function geoSearch(adress, params, accionFilter) {
    if (params === undefined) {
        return;
    }
    const data = {
        aplicacion: 'reportesmed',
        direccion: adress,
        accion: accionFilter,
    };
    let rta = {};
    let url = params.tipodir == 'aproximada' ? params.dirApx : params.dir;
    // console.log(params.tipodir);
    await axios
        .post(url, data)
        .then(res => {
            // Cl 42c 63c 39
            // Calle 4G 81A 105
            rta = res.data;
            // if (res.data.fuente_informacion.includes('Malla vial aproximada')) {
            //     window.modalAlerta(params.resmallavial, params.resmallavialmsg);
            // }
        })
        .catch(error => {});
    if (rta.latitud && params.mallavialobj === '1') {
        url = params.dirmapgis + `?accion=2&valor=${adress}&f=json`;
        await axios
            .post(url, data)
            .then(res => {
                if (res.data.tipo) {
                    window.modalAlerta(
                        params.tipogeomsg,
                        params.tipomsg !== null
                            ? params.tipomsg
                            : res.data.tipo,
                    );
                    rta.dir = res.data.DIR;
                }
            })
            .catch(error => {
                window.modalAlerta(params.probpet, error.message);
            });
    }
    return rta;
}
