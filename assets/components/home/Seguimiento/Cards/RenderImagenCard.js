import React, {useEffect} from 'react';
import {Image} from 'react-native';
import axios from 'axios';

export default function ImageRender({style, url}) {
    const [imageError, setImageError] = React.useState(url == null);
    useEffect(() => {
        const valid = async () => {
            if (url !== null) {
                await axios
                    .get(url)
                    .then(a => {
                        if (a.status) {
                            setImageError(false);
                        }
                    })
                    .catch(e => {
                        if (e.request.status) {
                            setImageError(false);
                        }
                    });
            }
        };
        valid().then();
    }, [url]);

    return (
        <Image
            style={style}
            source={
                imageError
                    ? require('../../../../iconos/logoAlcaldia.png')
                    : {uri: url}
            }
        />
    );
}
