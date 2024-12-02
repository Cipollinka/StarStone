import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginBottom: 11,
    gap: 6,
  },
  backButtonText: {
    fontFamily: 'SFProText-Regular',
    color: '#A45DFB',
    fontSize: 17,
    lineHeight: 22,
  },
  title: {
    paddingRight: 16,
    paddingLeft: 16,
    fontFamily: 'SFProText-Bold',
    color: '#fff',
    fontSize: 34,
    lineHeight: 41,
  },
  board: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backfaceVisibility: 'hidden',
  },
  tileBack: {
    backgroundColor: '#602BC8',
  },
  tileFront: {
    backgroundColor: '#A45DFB',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  modalText: {
    fontSize: 32,
    color: '#FFF',
    fontFamily: 'SFProText-Bold',
    marginBottom: 12,
  },
});
