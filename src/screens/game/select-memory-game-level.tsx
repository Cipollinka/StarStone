import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {ScreensRoads} from '../../shared/use-react-native-navigation.ts';
import {RootStackParamList} from '..';

type SelectMemoryGameLevelProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensRoads.SelectMemoryGameLevel
>;

export const SelectMemoryGameLevel: FC<SelectMemoryGameLevelProps> = ({
  navigation,
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingRight: 16,
        paddingLeft: 16,
        position: 'relative',
        // alignItems: 'center',
        // justifyContent: 'center',
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
        }}>
        Select a level
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#ffffff',
          fontFamily: 'SFProText-Regular',
          marginBottom: 33,
        }}>
        You will need to guess matching cards with gemstones
      </Text>
      <ScrollView
        contentContainerStyle={{
          gap: 24,
          paddingBottom: 100,
        }}>
        <GameButton
          color="#DC97F8"
          title="Easy"
          cards={8}
          reward={1.2}
          onPress={() => {
            navigation.navigate(ScreensRoads.Play, {
              cards: 8,
              title: 'Easy Level',
            });
          }}
        />

        <GameButton
          color="#A45DFB"
          title="Medium"
          cards={16}
          reward={2.4}
          onPress={() => {
            navigation.navigate(ScreensRoads.Play, {
              cards: 16,
              title: 'Medium Level',
            });
          }}
        />
        <GameButton
          color="#602BC8"
          title="Hard"
          cards={32}
          reward={4.8}
          onPress={() => {
            navigation.navigate(ScreensRoads.Play, {
              cards: 32,
              title: 'Hard Level',
            });
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          const availableCards = [
            {
              title: 'Easy Level',
              cards: 8,
            },
            {
              title: 'Medium Level',
              cards: 16,
            },
            {
              title: 'Hard Level',
              cards: 32,
            },
          ];
          const random = Math.floor(Math.random() * availableCards.length);
          navigation.navigate(ScreensRoads.Play, {
            cards: availableCards[random].cards,
            title: availableCards[random].title,
          });
        }}
        style={{
          bottom: 20,
          position: 'absolute',
          borderRadius: 20,
          backgroundColor: '#602BC8',
          width: '100%',
          height: 56,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginRight: 16,
          marginLeft: 16,
          gap: 12,
        }}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 20,
            fontFamily: 'SFProText-Bold',
          }}>
          Random selection
        </Text>
        <Image source={require('../../shared/assets/random.png')} />
      </TouchableOpacity>
    </View>
  );
};

interface Props {
  onPress: () => void;
  reward: number;
  title: string;
  cards: number;
  color: string;
}

const GameButton: FC<Props> = ({onPress, reward, title, cards, color}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: color,
        minHeight: 106,
      }}>
      <View
        style={{
          height: '100%',
          gap: 16,
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: 24,
            color: '#FFFFFF',
            fontFamily: 'SFProText-Bold',
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#FFFFFF',
            fontFamily: 'SFProText-Regular',
          }}>
          Reward:
        </Text>
      </View>
      <View
        style={{
          height: 70,
          alignItems: 'center',
          flexDirection: 'row',
          gap: 12,
        }}>
        <View
          style={{
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              gap: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 24,
                fontFamily: 'SFProText-Bold',
              }}>
              {cards}
            </Text>
            <Image source={require('../../shared/assets/cards.png')} />
          </View>
          <View
            style={{
              gap: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'SFProText-Regular',
              }}>
              {reward}
            </Text>
            <Image
              style={{
                width: 21,
                height: 21,
              }}
              source={require('../../shared/assets/coin.png')}
            />
          </View>
        </View>
        <Image source={require('../../shared/assets/arrow.png')} />
      </View>
    </TouchableOpacity>
  );
};
