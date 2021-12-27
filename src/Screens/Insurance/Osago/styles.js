import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    marginTop: 18,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  textColor: {
    color: '#423486',
  },
  priceWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 19,
    color: '#423486',
  },
  buttonStyle: {
    marginHorizontal: 45,
    height: 45,
    backgroundColor: '#FFC200',
    borderColor: '#FFC200',
  },
  buyOnlineContainer: {
    marginTop: 10,
    flex: 3,
    flexDirection: 'column',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  orStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 270,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
