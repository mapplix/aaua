import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    // backgroundColor: '#909087',
    height: 90,
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    // borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  inputStyle: {
    // placeholderTextColor: '#b6b9bf',
    fontFamily: 'SFUIText-Regular',
    color: '#111',
    fontSize: 15,
    lineHeight: 18,
    flex: 1,
    paddingLeft: 0,
  },
  labelStyle: {
    // marginLeft: 4,
    marginBottom: 2,
    paddingTop: 0,
    height: 22,
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#423486',
    alignSelf: 'stretch',
  },
  inputWrapper: {
    minHeight: 43,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrapper: {

  },
});
