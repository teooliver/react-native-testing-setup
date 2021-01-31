import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 5,
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shareBtn: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    marginLeft: 5,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width / 3 - 5,
    height: (width / 3 - 5) / 0.675,
  },
});
