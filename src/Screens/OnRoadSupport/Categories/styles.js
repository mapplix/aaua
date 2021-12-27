import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  componentStyle: {
    // backgroundColor:'#259',
    height: 67,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
    borderColor: '#423486',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  imageStyle: {
    width: 40,
    height: 40,
  },
  textContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textStyle: {
    fontFamily: 'SFUIText-Regular',
    color: '#423486',
    fontSize: 15,
  },
});
