import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  amountContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  amountStyle: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 35,
    color: '#1B1B1B',
  },
  textStyle: {
    fontFamily: 'SFUIText-Regular',
    alignSelf: 'stretch',
    fontSize: 13,
    fontWeight: '500',
    color: '#1B1B1B',
    paddingBottom: 15,
  },
  textContainer: {
    top: 0,
    paddingHorizontal: 25,
    // paddingLeft: 32,
    // paddingBottom: 33
  },
  imageContainer: {
    flex: 0,
    height: 171,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textTitleConteinerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  textTitleStyle: {
    color: '#1f1f1f',
    fontSize: 20,
    fontWeight: '600',
  },
  bannerStyle: {
    width: 267,
    height: 153,
  },
});
