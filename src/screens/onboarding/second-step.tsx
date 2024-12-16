import {Image, Text, View} from 'react-native';

export const SecondStep = () => {
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
        Create collections with friends
      </Text>
      <Text
        style={{
          paddingHorizontal: 16,
          fontFamily: 'SFProText-Regular',
          fontSize: 16,
          lineHeight: 22,
          color: '#ffffff',
        }}>
        You can add friends to your collection or take part in others people collections
      </Text>
      <Image
        style={{
          margin: 'auto',
        }}
        source={require('../../shared/assets/qrdon.png')}
      />
    </View>
  );
};
