import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  footerLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // flex: 1,
    height: 50,
    marginLeft: 45,
    marginRight: 45,
  },
  linkStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  linkText: {
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#423486',
  },
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
  imageWrapper: {
    flex: 3,
    height: 270,
    paddingTop: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#794',
  },
  imageStyle: {
    width: 175,
    height: 175,
  },
  loginButtonWrapper: {
    marginHorizontal: 45,
    height: 44,
  },
  inputsWrapper: {
    flex: 2,
  },
  buttonContainer: {
    height: 75,
  },
  aauaTitle: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 19,
    fontWeight: '500',
  },
});
