import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapSettings: {
    position: 'absolute',
    right: 19,
    bottom: 24,
  },
  modal: {
    maxHeight: 300,
    marginBottom: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  modalRow: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
