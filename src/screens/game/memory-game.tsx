import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootStackParamList} from '../index.tsx';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {styles} from './styles.tsx';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../../shared/use-react-native-navigation.ts';
import {Tile} from './tile.tsx';
import {TransactionType, useUserDataProfile} from '../../player';

const crystals = [
  {
    id: 1,
    image: require('../../shared/assets/gem1.png'),
  },
  {
    id: 2,
    image: require('../../shared/assets/gem2.png'),
  },
  {
    id: 3,
    image: require('../../shared/assets/gem3.png'),
  },
  {
    id: 4,
    image: require('../../shared/assets/gem4.png'),
  },
  {
    id: 5,
    image: require('../../shared/assets/gem5.png'),
  },
  {
    id: 6,
    image: require('../../shared/assets/gem6.png'),
  },
  {
    id: 7,
    image: require('../../shared/assets/gem7.png'),
  },
  {
    id: 8,
    image: require('../../shared/assets/gem8.png'),
  },
  {
    id: 9,
    image: require('../../shared/assets/gem9.png'),
  },
  {
    id: 10,
    image: require('../../shared/assets/gem10.png'),
  },
  {
    id: 11,
    image: require('../../shared/assets/gem11.png'),
  },
  {
    id: 12,
    image: require('../../shared/assets/gem12.png'),
  },
  {
    id: 13,
    image: require('../../shared/assets/gem13.png'),
  },
  {
    id: 14,
    image: require('../../shared/assets/gem14.png'),
  },
  {
    id: 15,
    image: require('../../shared/assets/gem15.png'),
  },
  {
    id: 16,
    image: require('../../shared/assets/gem16.png'),
  },
];
type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensRoads.Play
>;
const generateBoard = (totalTiles: number) => {
  if (totalTiles % 2 !== 0) {
    throw new Error('Кількість квадратів має бути парною!');
  }

  const requiredCrystals = crystals.slice(0, totalTiles / 2); // Вибираємо потрібну кількість пар
  const pairs: {
    id: number;
    image: any;
  }[] = [];
  requiredCrystals.forEach(crystal => {
    pairs.push(crystal, crystal); // Додаємо кожен кристал двічі для створення пар
  });
  return pairs.sort(() => Math.random() - 0.5); // Перемішуємо
};

const getNumberOfColumns = (totalTiles: number) => {
  switch (totalTiles) {
    case 8:
      return 2;
    case 16:
      return 4;
    case 32:
      return 8;
    default:
      return 4;
  }
};

const calculateTileDimensions = (
  numColumns: number,
  totalTiles: number,
  screenWidth: number,
  screenHeight: number,
) => {
  const margin = 10;
  const availableWidth = screenWidth - margin * (numColumns + 1);
  const tileWidth = availableWidth / numColumns;

  let numRows: number;
  if (totalTiles === 8) {
    numRows = 6;
  } else if (totalTiles === 16) {
    numRows = 6;
  } else if (totalTiles === 32) {
    numRows = 10;
  }

  // Віднімаємо висоту заголовку та відступів
  const headerHeight = 100; // Приблизна висота заголовку (налаштуйте за потребою)
  const availableHeight = screenHeight - headerHeight - margin * (numRows + 1);
  const tileHeight = availableHeight / numRows;

  return {tileWidth, tileHeight};
};
export const MemoryGame: FC<DetailsScreenProps> = ({route}) => {
  const {navigateToScreen} = useReactNativeNavigation();
  const {title, cards} = route.params;
  const {userProfile, setUserProfile} = useUserDataProfile();
  const [board, setBoard] = useState<
    {
      id: number;
      image: any;
    }[]
  >([]);
  const [openTiles, setOpenTiles] = useState<number[]>([]);
  const [matchedTiles, setMatchedTiles] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  const window = useWindowDimensions();
  const {width, height} = window;

  useEffect(() => {
    setBoard(generateBoard(cards));
  }, [cards]);

  const handleTilePress = (index: number) => {
    if (
      openTiles.length === 2 ||
      openTiles.includes(index) ||
      matchedTiles.includes(index)
    ) {
      return;
    }

    const newOpenTiles = [...openTiles, index];
    setOpenTiles(newOpenTiles);

    if (newOpenTiles.length === 2) {
      const [firstIndex, secondIndex] = newOpenTiles;
      if (board[firstIndex].id === board[secondIndex].id) {
        setMatchedTiles(prev => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setOpenTiles([]), 800);
    }
  };

  useEffect(() => {
    if (matchedTiles.length === board.length && board.length > 0) {
      setShowModal(true); // Гра завершена
    }
  }, [matchedTiles]);

  const numColumns = getNumberOfColumns(cards);
  const {tileWidth, tileHeight} = calculateTileDimensions(
    numColumns,
    cards,
    width,
    height,
  );
  const getPrizeByCards = (cards: number) => {
    switch (cards) {
      case 8:
        return 1200;
      case 16:
        return 2400;
      case 32:
        return 4800;
      default:
        return 0;
    }
  };

  const completeLevel = async () => {
    if (!userProfile) return;
    await setUserProfile({
      ...userProfile,
      score: (userProfile.score || 0) + getPrizeByCards(cards),
      transactions: [
        ...(userProfile.transactions || []),
        {
          id: `${(userProfile.transactions || []).length + 1}`,
          title: title,
          amount: getPrizeByCards(cards),
          isPositive: true,
          type: TransactionType.Game,
        },
      ],
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigateToScreen(ScreensRoads.Catalogue)}
          style={styles.backButton}>
          <Image source={require('../../shared/assets/chevron.png')} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <FlatList
        data={board}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        renderItem={({item, index}) => (
          <Tile
            item={item}
            index={index}
            isOpen={openTiles.includes(index)}
            isMatched={matchedTiles.includes(index)}
            onPress={handleTilePress}
            tileWidth={tileWidth}
            tileHeight={tileHeight}
          />
        )}
        contentContainerStyle={styles.board}
        scrollEnabled={cards === 32}
      />

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
              marginBottom: 100,
            }}>
            <TouchableOpacity
              onPress={async () => {
                await completeLevel();
                navigateToScreen(ScreensRoads.Game);
              }}>
              <Image
                source={require('../../shared/assets/closemodal.png')}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>You Win!</Text>
          <Image source={require('../../shared/assets/success.png')} />
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 32,
                color: 'white',
                fontFamily: 'SFProText-Regular',
              }}>
              +{Math.abs(getPrizeByCards(cards) || 0).toLocaleString()}
            </Text>
            <Image
              source={require('../../shared/assets/coin.png')}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={async () => {
              await completeLevel();
              navigateToScreen(ScreensRoads.Game);
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: '#602BC8',
              width: '100%',
              maxWidth: 350,
              height: 56,
              marginTop: 100,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontFamily: 'SFProText-Bold',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
