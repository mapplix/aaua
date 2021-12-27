import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  amountContainer: {
    // backgroundColor: '#61c9eb',
    // alignSelf:'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  amountStyle: {
    fontFamily: 'SFUIText-Bold',
    fontSize: 70,
    color: '#1B1B1B',
    marginBottom: 8,
  },
  textStyle: {
    fontFamily: 'SFUIText-Medium',
    fontSize: 17,
    color: '#1B1B1B',
  },
  amountContainerWrapper: {
    // marginTop: 151,
  //   height: 230 * RATIO,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 61,
    paddingRight: 45,
    paddingLeft: 45,
  },
  buttonStyle: {
    height: 45,
    backgroundColor: '#FFC200',
    borderColor: '#FFC200',
  },
  textContainer: {
    height: 70,
    bottom: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});
