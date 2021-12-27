import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  linksContainer: {
    flex: 1,
    marginLeft: 29,
  },
  rightContainer: {
    paddingTop: 30,
    width: 59,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  logoContainer: {
    paddingTop: 21,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    paddingTop: 21,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 16,
    color: '#423485',
    fontFamily: 'Roboto-Bold',
  },
  aauaTitle: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 17,
    fontWeight: '500',
  }
});
