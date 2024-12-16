import {Image, Text, View} from 'react-native';

export const ThirdStep = () => {
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
        }}>
        See your history
      </Text>
      <Image
        style={{
          margin: 'auto',
          height: 358,
          objectFit: 'contain',
        }}
        source={require('../../shared/assets/thirdon.png')}
      />
    </View>
  );
};
