import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles.tsx';
import {FC, useEffect, useRef, useState} from 'react';

type TileProps = {
  item: {
    id: number;
    image: any;
  };
  index: number;
  isOpen: boolean;
  isMatched: boolean;
  onPress: (index: number) => void;
  tileWidth: number;
  tileHeight: number;
};

export const Tile: FC<TileProps> = ({
  item,
  index,
  isOpen,
  isMatched,
  onPress,
  tileWidth,
  tileHeight,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (isOpen || isMatched) {
      flipToFront();
    } else {
      flipToBack();
    }
  }, [isOpen, isMatched]);

  const flipToFront = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setFlipped(true));
  };

  const flipToBack = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setFlipped(false));
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };

  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(index)}
      activeOpacity={0.8}
      style={{width: tileWidth, height: tileHeight, margin: 5}}
      disabled={isOpen || isMatched}>
      <View>
        {/* Задня сторона картки */}
        <Animated.View
          style={[
            styles.tile,
            styles.tileBack,
            frontAnimatedStyle,
            {width: tileWidth, height: tileHeight},
          ]}>
          <View
            style={[
              styles.image,
            ]}
          />
        </Animated.View>

        {/* Передня сторона картки */}
        <Animated.View
          style={[
            styles.tile,
            styles.tileFront,
            backAnimatedStyle,
            {
              width: tileWidth,
              height: tileHeight,
              position: 'absolute',
              top: 0,
              backgroundColor: isMatched ? '#2bc879' : '#A45DFB',
            },
          ]}>
          {isOpen || isMatched ? (
            <Image source={item.image} style={styles.image} />
          ) : null}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};
