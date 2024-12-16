import {Image, Text, View} from 'react-native';

export const FourthStep = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <Text
        style={{
          paddingHorizontal: 16,
          fontFamily: 'SFProText-Semibold',
          fontSize: 34,
          lineHeight: 41,
          color: '#ffffff',
          marginBottom: 20,
        }}>
        Add your own stones
      </Text>
      <Image
        style={{
          marginHorizontal: 'auto',
        }}
        source={require('../../shared/assets/fourthstone.png')}
      />
      <Image
        style={{
          position: 'absolute',
          top: 30,
          left: -100,
          width: 152,
          height: 152,
        }}
        source={require('../../shared/assets/gem4.png')}
      />
      <Image
        style={{
          position: 'absolute',
          bottom: 30,
          left: -50,
          width: 152,
          height: 152,
        }}
        source={require('../../shared/assets/gem8.png')} />
      <Image
        style={{
          position: 'absolute',
          bottom: 0,
          right: -60,
          width: 152,
          height: 152,
        }}
        source={require('../../shared/assets/gem3.png')} />
    </View>
  );
};
