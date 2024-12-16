import {Image, Text, View} from 'react-native';

export const FirstStep = () => {
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
          marginBottom: 12,
        }}>
        Start to collect stones
      </Text>
      <Text
        style={{
          paddingHorizontal: 16,
          fontFamily: 'SFProText-Regular',
          fontSize: 16,
          lineHeight: 22,
          color: '#ffffff',
        }}>
        Farm coins in games and buy new stones to create collections
      </Text>
      <View
        style={{
          position: 'relative',
          flex: 1,
        }}>
        <Image
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
          }}
          source={require('../../shared/assets/firston.png')}
        />
        <Image
          style={{
            position: 'absolute',
            right: -50,
          }}
          source={require('../../shared/assets/secondon.png')}
        />
      </View>
    </View>
  );
};
