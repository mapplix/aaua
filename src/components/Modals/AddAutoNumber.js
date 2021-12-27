import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import I18n from '@aaua/i18n';

const {width, height} = Dimensions.get('window');

const imgNumber = require('@aaua/images/auto_number.png');

const paddingHorizontal = width * 0.05;
const modalWidth = width * 0.9;

const AddAutoNumber = ({show, callback, type}) => {

  const [number, setNumber] = useState('');

  const onNumberChange = text => {
    setNumber(text);
  };
 
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{I18n.t('modals.car_number.title')}</Text>
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Image source={imgNumber} style={styles.number} />
              <TextInput
                style={styles.input}
                onChangeText={onNumberChange}
                value={number}
                placeholderTextColor={'#C8C8CE'}
                placeholder={'XX 7777 XX'}
              />
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => {
                callback('', type);
              }}>
              <Text style={styles.btnCancelText}>{I18n.t('modals.car_number.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPay}
              onPress={() => callback(number, type)}>
              <Text style={styles.btnPayText}>{I18n.t('modals.car_number.pay')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.39)',
  },
  modalView: {
    width: modalWidth,
    margin: 20,
    backgroundColor: '#F3F1F1',
    borderRadius: 19,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 19,
  },
  content: {
    marginVertical: 50,
  },
  inputContainer: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
    marginHorizontal: 23,
    // height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 56,
    width: '85%',
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'Roboto-Regular',
    padding: 5,
  },
  number: {
    width: 30,
    height: 52,
    marginVertical: 2,
    marginLeft: 3,
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: '#F3F1F1',
    marginTop: 19,
    borderTopWidth: 1,
    borderTopColor: '#D8D9DB',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
  },
  btnCancel: {
    flex: 1,
    padding: 15,
    borderRightWidth: 0.5,
    borderLeftColor: '#D8D9DB',
  },
  btnCancelText: {
    textAlign: 'center',
    color: '#423486',
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
  },
  btnPay: {
    flex: 1,
    padding: 15,
    borderLeftWidth: 0.5,
    borderLeftColor: '#D8D9DB',
  },
  btnPayText: {
    textAlign: 'center',
    color: '#423486',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
});

export default AddAutoNumber;
