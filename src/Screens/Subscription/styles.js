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
    paddingRight: 27,
    paddingLeft: 32,
    paddingBottom: 33,
  },
  imageContainer: {
    flex: 0,
    height: 171 ,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxesContainer: {
    flex: 47,
    paddingTop: 35,
    paddingRight: 70,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 35 ,
  },
});
