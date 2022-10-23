import React, {useState} from 'react';

import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
    responsiveScreenFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {theme} from '../../../theme';

export default ({onchangeInputs, list = [], alias, search = false}) => {
    const [selectedValue, setSelectedValue] = useState('0');
    let styles = StyleSheet.create(
        search
            ? {
                  container: {
                      width: '44%',
                      height: responsiveWidth(10),
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#B7B7B7',
                      justifyContent: 'center',
                      alignContent: 'center',
                      borderRadius: 10,
                  },
                  selectCss: {
                      width: '100%',
                      height: '95%',
                      fontSize: responsiveScreenFontSize(1),
                  },
                  pickers: {
                      width: '100%',
                      height: '95%',
                      fontSize: responsiveScreenFontSize(1.5),
                  },
              }
            : {
                  container: {
                      width: 'auto',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#B7B7B7',
                      borderRadius: 5,
                      height: 40,
                  },
                  selectCss: {
                      width: '100%',
                      top: -8,
                      alignItems: 'center',
                  },
                  pickers: {},
              },
    );

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                numberOfLines={2}
                style={styles.selectCss}
                dropdownIconColor={theme.colors.primary}
                onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    onchangeInputs(itemValue, alias);
                }}>
                {list.map(item => (
                    <Picker.Item
                        style={styles.pickers}
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </Picker>
        </View>
    );
};
