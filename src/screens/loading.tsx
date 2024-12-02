import React, {useEffect, useRef} from 'react';
import {Animated, Text, View,Easing } from 'react-native';

export const LoadingScreen = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1500, // Duration of one full rotation (in milliseconds)
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ).start();
    };

    startRotation();
  }, [rotation]);

  // Interpolating the rotation value to degrees
  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 34,
          lineHeight: 41,
          fontFamily: 'SFProText-Bold',
          color: 'white',
          marginBottom: 44,
        }}>
        Star Stones
      </Text>
      <Animated.Image
        source={require('../shared/assets/loader.png')}
        style={{
          transform: [{rotate: rotateInterpolation}],
        }}
      />
    </View>
  );
};
