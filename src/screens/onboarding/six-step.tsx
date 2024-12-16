import {Image, Text, View} from 'react-native';

export const SixStep = () => {
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
        Read articles about stones
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          style={{
            marginHorizontal: 'auto',
            height: 358,
            objectFit: 'contain',
          }}
          source={require('../../shared/assets/sixstep.png')}
        />

        <Image
          style={{}}
          source={require('../../shared/assets/sixstepi.png')}
        />
      </View>
    </View>
  );
};
