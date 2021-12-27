import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 30,
    width: 25,
  },
  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  wrapper: {
    // backgroundColor: '#909087',
    height: 65,
    marginLeft: 45,
    marginRight: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    marginTop: 20,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 25,
  },
});
