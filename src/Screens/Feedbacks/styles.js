import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  titleContainer: {
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    flex: 0,
    height: 116,
  },
  phoneText: {
    fontFamily: 'SFUIText-Medium',
    color: '#1B1B1B',
    fontSize: 14,
  },
  phoneNumber: {
    fontSize: 23,
    fontFamily: 'SFUIText-Medium',
    color: '#423486',
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textInputWrapper: {
    marginTop: 22,
    flex: 0,
    height: 60,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
}
});
