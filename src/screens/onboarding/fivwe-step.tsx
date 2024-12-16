import {Image, Text, View} from 'react-native';

export const FivweStep = () => {
  return (
    <View
      style={{
        flex: 1,
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
        Buy what you want
      </Text>
      <View
        style={{
          position: 'relative',
          margin: 'auto',
        }}>
        <Image
          style={{
            marginHorizontal: 'auto',
            height: 358,
            objectFit: 'contain',
          }}
          source={require('../../shared/assets/fifthon.png')}
        />

        <Image
          style={{
            position: 'absolute',
            top: 30,
            left: -100,
            width: 103,
            height: 103,
          }}
          source={require('../../shared/assets/coin2.png')}
        />
        <Image
          style={{
            position: 'absolute',
            bottom: -50,
            right: 0,
            width: 103,
            height: 103,
          }}
          source={require('../../shared/assets/coin1.png')}
        />
      </View>
    </View>
  );
};
