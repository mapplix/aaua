import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#282',
    marginLeft: 14,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#e9e9e9',
    borderRadius: 4,
    marginBottom: 16,
  },
  titleContainer: {
    height: 47,
    paddingLeft: 19,
    borderWidth: 1,
    borderColor: '#fafafa',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    elevation: 5,
  },
  titleText: {
    fontFamily: 'SFUIText-Medium',
    color: '#423486',
    fontSize: 14,
  },
  descriptionContainer: {
    paddingLeft: 19,
    paddingRight: 11,
    paddingTop: 21,
    paddingBottom: 15,
  },
  descriptionText: {
    fontFamily: 'SFUIText-Regular',
    color: '#1b1b1b',
    fontSize: 12,
  },
});
