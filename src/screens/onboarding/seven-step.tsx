import {Image, Text, View} from 'react-native';

export const SevenStep = () => {
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
        Manage your collections
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
          source={require('../../shared/assets/sevenstep.png')}
        />

        <Image
          style={{
            position: 'absolute',
            top: 30,
            left: -100,
            width: 65,
            height: 65,
          }}
          source={require('../../shared/assets/sevem2.png')}
        />
        <Image
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 65,
            height: 65,
          }}
          source={require('../../shared/assets/sevem1.png')}
        />
      </View>
    </View>
  );
};
