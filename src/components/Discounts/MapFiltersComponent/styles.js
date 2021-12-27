import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modalCard: {
    // height: 300,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 13,
    width: '95%',
    // backgroundColor: 'rgba(0,0,0,0)'
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
  modalRow: {
    marginTop: 10,
    marginLeft: 3,
    marginRight: 3,
    flex: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'SFUIText-Regular',
    color: '#423486',
    fontSize: 16,
  },
  buttonTextBold: {
    fontFamily: 'SFUIText-Semibold',
  }
});
