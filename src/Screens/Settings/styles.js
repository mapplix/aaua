import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cardStyle: {
    flex: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    alignItems: 'center',
  },
  sliderContainer: {
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 57,
    paddingBottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    flex: 50,
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
});
