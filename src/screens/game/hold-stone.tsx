import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TransactionType, useUserDataProfile} from '../../player';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../index.tsx';
import {ScreensRoads} from '../../shared/use-react-native-navigation.ts';

const STONE_IMAGES = [
  require('../../shared/assets/gem1.png'),
  require('../../shared/assets/gem2.png'),
  require('../../shared/assets/gem3.png'),
  require('../../shared/assets/gem4.png'),
  require('../../shared/assets/gem5.png'),
  require('../../shared/assets/gem6.png'),
  require('../../shared/assets/gem7.png'),
  require('../../shared/assets/gem8.png'),
  require('../../shared/assets/gem9.png'),
  require('../../shared/assets/gem10.png'),
  require('../../shared/assets/gem11.png'),
  require('../../shared/assets/gem12.png'),
  require('../../shared/assets/gem13.png'),
  require('../../shared/assets/gem14.png'),
  require('../../shared/assets/gem15.png'),
  require('../../shared/assets/gem16.png'),
];
type Props = NativeStackScreenProps<RootStackParamList, ScreensRoads.HoldStone>;
export const HoldStoneScreen: FC<Props> = ({navigation}) => {
  const {setUserProfile, userProfile} = useUserDataProfile();
  const [timer, setTimer] = useState(60); // Таймер у секундах
  const [coins, setCoins] = useState(0); // Зароблені монети
  const [isHolding, setIsHolding] = useState(false); // Стан натискання
  const isPassedOneDayAlready = useMemo(() => {
    if (!userProfile) {
      return false;
    }
    const lastDailyHoldDate = userProfile.lastDailyHoldDate;
    const currentDate = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    return currentDate - lastDailyHoldDate > oneDay;
  }, [userProfile?.lastDailyHoldResult]);
  const [showWinScreen, setShowWinScreen] = useState(!isPassedOneDayAlready);
  const [isAlreadyPressed, setIsAlreadyPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current; // Анімація каменя
  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade-анімація для "+100"
  const positionAnim = useRef(new Animated.Value(0)).current; // Рух анімації "+100"

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Інтервал для очок

  const stoneImage = useMemo(() => {
    const random = Math.floor(Math.random() * STONE_IMAGES.length);
    return STONE_IMAGES[random];
  }, []);
  const coinsRef = useRef(0);
  useEffect(() => {
    coinsRef.current = coins;
  }, [coins]);
  // Таймер працює незалежно від стану натискання
  useEffect(() => {
    if (!isAlreadyPressed) return;
    const timerInterval = setInterval(() => {
      setTimer(prev => {
        if (prev > 0) return prev - 1;
        clearInterval(timerInterval);
        setShowWinScreen(true);

        if (!userProfile) {
          return 0
        }

        setUserProfile({
          ...userProfile,
          score: userProfile.score + coinsRef.current,
          transactions: [
            ...(userProfile.transactions || []),
            {
              id: `${(userProfile.transactions || []).length + 1}`,
              title: 'Hold stone',
              amount: coinsRef.current,
              isPositive: true,
              type: TransactionType.Game,
            },
          ],
          lastDailyHoldResult: coinsRef.current,
          lastDailyHoldDate: new Date().getTime(),
        });
        return 0;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isAlreadyPressed]);

  // Оновлення очок при утримуванні
  useEffect(() => {
    if (showWinScreen) return;
    if (isHolding) {
      intervalRef.current = setInterval(() => {
        setCoins(prev => prev + 10);
        triggerCoinAnimation();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding, showWinScreen]);

  const triggerCoinAnimation = () => {
    fadeAnim.setValue(1);
    positionAnim.setValue(0);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(positionAnim, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleHold = () => {
    setIsAlreadyPressed(true);
    setIsHolding(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const handleRelease = () => {
    setIsHolding(false);
    scaleAnim.stopAnimation();
  };

  const resetGame = () => {
    setTimer(60);
    setCoins(0);
    setShowWinScreen(false);
  };

  if (showWinScreen) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingLeft: 8,
            height: 44,
            gap: 6,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image source={require('../../shared/assets/chevron.png')} />
          <Text
            style={{
              color: 'rgba(164, 93, 251, 1)',
              fontSize: 17,
              fontFamily: 'SFProText-Regular',
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.winText}>Today you win</Text>
        <Text style={styles.coinsText}>
          Come back tomorrow to receive a new bonus.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 'auto',
            borderRadius: 100,
            backgroundColor: '#A45DFB',
            height: 65,
            gap: 6,
            paddingHorizontal: 24,
            paddingVertical: 12,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 44,
              lineHeight: 46,
              fontFamily: 'SFProText-Bold',
            }}>
            {userProfile?.lastDailyHoldResult || coins}
          </Text>
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={require('../../shared/assets/coin.png')}
          />
        </View>

        <Image
          style={{
            margin: 'auto',
          }}
          source={require('../../shared/assets/dailywin.png')}
        />

        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 24,
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#602BC8',
              height: 56,
              borderRadius: 20,
              alignSelf: 'center',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontFamily: 'SFProText-Bold',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          paddingLeft: 8,
          height: 44,
          gap: 6,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image source={require('../../shared/assets/chevron.png')} />
        <Text
          style={{
            color: 'rgba(164, 93, 251, 1)',
            fontSize: 17,
            fontFamily: 'SFProText-Regular',
          }}>
          Back
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          paddingRight: 16,
          paddingLeft: 16,
          fontSize: 34,
          lineHeight: 41,
          color: '#ffffff',
          fontFamily: 'SFProText-Bold',
          marginBottom: 12,
        }}>
        Hold stone
      </Text>
      <Text
        style={{
          paddingRight: 16,
          paddingLeft: 16,
          fontSize: 16,
          color: '#ffffff',
          fontFamily: 'SFProText-Regular',
          marginBottom: 10,
        }}>
        The longer you hold, the more coins you will receive.
      </Text>
      <Text
        style={{
          paddingRight: 16,
          paddingLeft: 16,
          fontSize: 16,
          color: '#ffffff',
          fontFamily: 'SFProText-Regular',
          marginBottom: 33,
        }}>
        Earned coins: {coins}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          width: '100%',
          height: '50%',
        }}
        onPressIn={handleHold}
        onPressOut={handleRelease}>
        <Image source={stoneImage} style={styles.stone} />
      </TouchableOpacity>

      <Text style={styles.timer}>{`0:${timer
        .toString()
        .padStart(2, '0')}`}</Text>
      <Animated.Text
        style={[
          styles.coinText,
          {
            opacity: fadeAnim,
            transform: [{translateY: positionAnim}],
          },
        ]}>
        +10
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  timer: {
    fontSize: 44,
    color: '#fff',
    fontFamily: 'SFProText-Heavy',
    textAlign: 'center',
    marginVertical: 'auto',
  },
  stone: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  winText: {
    paddingHorizontal: 16,
    fontSize: 34,
    fontFamily: 'SFProText-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  coinsText: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'SFProText-Regular',
    color: '#fff',
    marginBottom: 33,
  },
  coinText: {
    left: '50%',
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    bottom: '50%',
  },
});
