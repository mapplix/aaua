import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  containerStyle: {
    height: 90,
    marginHorizontal: 45,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  inputContainer: {
    minHeight: 43,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  input: {
    // placeholderTextColor: '#b6b9bf',
    fontFamily: 'SFUIText-Regular',
    color: '#111',
    fontSize: 15,
    lineHeight: 18,
    flex: 1,
  },
  labelStyle: {
    marginBottom: 2,
    paddingTop: 0,
    height: 20,
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#423486',
    alignSelf: 'stretch',
  },
});
