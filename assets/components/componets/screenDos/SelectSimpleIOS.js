import React, {useState} from 'react';
import {View, Text, Pressable, ScrollView, Platform, Modal} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const momserratBold = Platform.OS !== 'ios' ? 'montserratb' : 'Montserrat-Bold';
import {styles} from './styles';
import {Button} from 'react-native-paper';

const Selector = ({
  style = null,
  list = [],
  placeholder = 'Seleccionar...',
  onSelected,
  valueSelected,
}) => {
  const [showSelector, setShowSelector] = useState(false);
  const [value, setValue] = useState(valueSelected);

  return (
    <View>
      <Pressable
        style={style ? [styles.selector, style] : styles.selector}
        onPress={() => {
          setShowSelector(!showSelector);
        }}>
        {value ? (
          <Text style={[styles.placeholder, styles.value]}>{value.label}</Text>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        <IconAntDesign
          name={showSelector ? 'up' : 'down'}
          color={'#08517F'}
          size={responsiveFontSize(2)}
        />
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSelector}
        onRequestClose={() => {
          setShowSelector(false);
        }}>
        <View style={styles.centeredView}>
          <ScrollView
            style={[{maxHeight: list.length * 35}, styles.containerList]}
            nestedScrollEnabled={true}>
            {list.map((item, i) => (
              <Pressable
                key={i}
                style={
                  i == list.length - 1
                    ? [styles.containerItemList, {borderBottomWidth: 0}]
                    : styles.containerItemList
                }
                onPress={() => {
                  if (item == value) {
                    setValue(null);
                    onSelected(null);
                  } else {
                    setValue(item);
                    onSelected(item);
                  }
                  setShowSelector(false);
                }}>
                <Text
                  style={
                    item == value
                      ? [
                          styles.placeholder,
                          styles.textItem,
                          {
                            color: '#000',
                            fontFamily: momserratBold,
                          },
                        ]
                      : [styles.placeholder, styles.textItem]
                  }>
                  {item.label} {item == value ? '•' : ' '}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default Selector;
