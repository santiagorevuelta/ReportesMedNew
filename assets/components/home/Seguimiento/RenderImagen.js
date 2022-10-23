import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import axios from 'axios';

export default function ImageRender({style, url}) {
    return <Image style={style} source={{uri: url}} />;
}
