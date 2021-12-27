import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingBottom: 35,
  },
  text: {
    color: '#1b1b1b',
    fontSize: 18,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    height: 53,
    paddingTop: 7,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  buttonStyle: {
    marginHorizontal: 35,
    height: 43,
    backgroundColor: '#423486',
    borderColor: '#423486',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 70,
    left: 30,
    backgroundColor: '#FFF',
    height: 30,
    zIndex: 1000,
  },
  closeButton: {
    fontSize: 30,
    color: '#1b1b1b',
  },
});
