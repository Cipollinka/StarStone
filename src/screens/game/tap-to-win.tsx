import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity, Vibration,
  View
} from "react-native";
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../index.tsx';
import {ScreensRoads} from '../../shared/use-react-native-navigation.ts';
import {TransactionType, useUserDataProfile} from '../../player';

const screenHeight = Dimensions.get('window').height;

type Gem = {
  id: number;
  image: string;
  isUseful: boolean;
  isDouble: boolean;
  animatedValue: Animated.Value;
  initialPosition: number;
  opacity: Animated.Value;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  ScreensRoads.GemTapGame
>;

const gemImages = [
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

const GemTapGame: React.FC<Props> = ({navigation, route}) => {
  const {usefulPercentage} = route.params;
  const {setUserProfile, userProfile} = useUserDataProfile();
  const currentLevel = userProfile?.completedLevels || 1;
  const [countdown, setCountdown] = useState<number>(5); // Countdown before the game starts
  const [gems, setGems] = useState<Gem[]>([]);
  const [score, setScore] = useState<number>(0);
  const [totalGems, setTotalGems] = useState<number>(10); // Default to 10 gems
  const [capturedGems, setCapturedGems] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  useEffect(() => {
    if (countdown === 0 && !isGameOver && !isGameStarted) {
      generateGems();
      setIsGameStarted(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (countdown || !isGameStarted) return;
    if (gems.length === 0 && !isGameOver) {
      setIsGameOver(true);
      checkResult();
    }
  }, [gems, countdown, isGameStarted]);

  const generateGems = () => {
    const newGems: Gem[] = [];
    for (let i = 0; i < totalGems; i++) {
      const isUseful = Math.random() < usefulPercentage / 100;
      const initialPosition =
        Math.random() * (Dimensions.get('window').width - 50); // Рандомна горизонтальна позиція
      const gem: Gem = {
        id: i,
        image: gemImages[Math.floor(Math.random() * gemImages.length)],
        isUseful,
        isDouble: isUseful && Math.random() < 0.3, // 30% шанс на подвоєння балів
        animatedValue: new Animated.Value(-100), // Початкова вертикальна позиція поза екраном
        opacity: new Animated.Value(0), // Початкова непрозорість (невидимий)
        initialPosition, // Зберігаємо початкову позицію
      };
      newGems.push(gem);
      startFallingAnimation(gem);
    }
    setTotalGems(newGems.filter(({isUseful}) => isUseful).length);
    setGems(newGems);
  };
  const startFallingAnimation = (gem: Gem) => {
    const delay = Math.random() * 2000; // Random delay for each gem
    setTimeout(() => {
      // A falling and fading animation
      Animated.parallel([
        Animated.timing(gem.animatedValue, {
          toValue: screenHeight, // Falling to the bottom of the screen
          duration: 5000, // Time for the fall
          useNativeDriver: true,
        }),
        Animated.timing(gem.opacity, {
          toValue: 1, // Make the gem visible
          duration: 1000, // Time to fade in
          useNativeDriver: true,
        }),
      ]).start(() => {
        setGems(prevGems => prevGems.filter(g => g.id !== gem.id)); // Remove gem after animation if game is not paused
      });
    }, delay);
  };

  const handleGemTap = (gem: Gem) => {
    if (isGameOver) return;
    console.log('handleGemTap');
    if (gem.isUseful) {
      setScore(prev => prev + (gem.isDouble ? 20 : 10)); // 2x = 20 points, else 10
      setCapturedGems(prev => prev + 1);
    } else {
      Vibration.vibrate([0, 100, 50, 100]);
      setScore(prev => Math.max(prev - 10, 0)); // Deduct 10 points for non-useful gems
    }

    setGems(prevGems => prevGems.filter(g => g.id !== gem.id));
  };

  const checkResult = () => {
    const capturePercentage = (capturedGems / totalGems) * 100;
    if (capturePercentage > 75) {
      const nextLevel = currentLevel + 1;
      if (nextLevel <= 16) {
        setUserProfile({
          ...userProfile!,
          completedLevels: currentLevel + 1,
          score: userProfile!.score + score,
          transactions: [
            ...(userProfile!.transactions || []),
            {
              id: `${(userProfile!.transactions || []).length + 1}`,
              title: 'Tap to win',
              amount: score,
              isPositive: true,
              type: TransactionType.Game,
            },
          ],
        });
      }
      setIsWon(true);
    } else {
      setIsWon(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const interval = setTimeout(() => setCountdown(prev => prev - 1), 1000); // Countdown every second
      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [countdown]);

  // if (true) {
  if (countdown && !isGameOver) {
    return (
      <View
        style={{
          flex: 1,
        }}>
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

        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>Game starts in</Text>
          <Text style={styles.countdown}>00:0{countdown}</Text>
        </View>
      </View>
    );
  }
  const doesNextLevelExist = currentLevel < 16;
  if (isGameOver && isGameStarted && !isWon) {
    return (
      <View
        style={{
          flex: 1,
        }}>
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
            fontSize: 34,
            lineHeight: 41,
            color: '#ffffff',
            fontFamily: 'SFProText-Bold',
            marginBottom: 12,
            paddingRight: 16,
            paddingLeft: 16,
          }}>
          You lose
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#ffffff',
            fontFamily: 'SFProText-Regular',
            marginBottom: 33,
            paddingRight: 16,
            paddingLeft: 16,
          }}>
          Please try again and collect more gems
        </Text>

        <View
          style={{
            flexDirection: 'row',
            margin: 'auto',
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
            {score}
          </Text>
          <Image
            style={{
              width: 40,
              height: 40,
            }}
            source={require('../../shared/assets/coin.png')}
          />
        </View>

        <View
          style={{
            paddingHorizontal: 16,
            marginBottom: 24,
            marginTop: 'auto',
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
  if (isGameOver && isGameStarted && isWon) {
    return (
      <View
        style={{
          flex: 1,
        }}>
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
            fontSize: 34,
            lineHeight: 41,
            color: '#ffffff',
            fontFamily: 'SFProText-Bold',
            marginBottom: 12,
            paddingRight: 16,
            paddingLeft: 16,
          }}>
          You win
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#ffffff',
            fontFamily: 'SFProText-Regular',
            marginBottom: 33,
            paddingRight: 16,
            paddingLeft: 16,
          }}>
          {doesNextLevelExist
            ? `You complete lvl ${currentLevel - 1} and get money, now you can open lvl ${currentLevel}`
            : 'Congratulations! You have completed all levels'}
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
            {score}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
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
        <Text style={styles.score}>{score}</Text>
        <View
          style={{
            width: 70,
          }}
        />
      </View>

      <View style={styles.gemContainer}>
        {gems.map(gem => (
          <Animated.View
            key={gem.id}
            style={{
              transform: [{translateY: gem.animatedValue}], // Падіння по вертикалі
              opacity: gem.opacity, // Поступова поява
              position: 'absolute',
              top: 0,
              left: gem.initialPosition, // Використовуємо збережену початкову позицію
            }}>
            <TouchableOpacity onPress={() => handleGemTap(gem)}>
              <Image
                source={gem.image}
                style={[
                  styles.gem,
                  gem.isDouble ? styles.doubleGem : null,
                  gem.isUseful
                    ? undefined
                    : {
                        borderRadius: 100,
                        borderColor: 'red',
                        borderWidth: 1,
                      },
                ]} // Підсвічуємо гем з 2x балами
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdownText: {
    color: 'white',
    fontFamily: 'SFProText-Heavy',
    fontSize: 34,
  },
  countdown: {
    color: 'white',
    fontSize: 44,
    fontFamily: 'SFProText-Heavy',
  },
  score: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'SFProText-Semibold',
  },
  gemContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  gem: {
    width: 100,
    height: 100,
    margin: 10,
  },
  doubleGem: {
    borderRadius: 100,
    borderColor: '#9747FF',
    borderWidth: 1,
  },
  countdownContainer: {
    margin: 'auto',
    alignItems: 'center',
    gap: 27,
  },
});

export default GemTapGame;
