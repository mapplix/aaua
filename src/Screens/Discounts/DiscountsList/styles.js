import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61c9eb',
  },
  tabText: {
    fontFamily: 'SFUIText-Medium',
    fontSize: 14,
    color: '#1b1b1b',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffc200',
  },
  selectedTabText: {
    color: '#ffc200',
  },
});
