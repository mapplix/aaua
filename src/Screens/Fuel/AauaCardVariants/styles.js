import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modal: {
    height: 270,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 19,
    color: '#423485',
  },
  modalTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  textStyle: {
    color: '#1d1d1d',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
});
