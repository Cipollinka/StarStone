import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {ScreensRoads} from '../../shared/use-react-native-navigation.ts';
import {RootStackParamList} from '..';

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensRoads.Game
>;

export const GameScreen: FC<HomeScreenProps> = ({navigation}) => {
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
      <Text
        style={{
          fontSize: 34,
          lineHeight: 41,
          color: '#ffffff',
          fontFamily: 'SFProText-Bold',
          marginBottom: 12,
        }}>
        Select a game
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: '#ffffff',
          fontFamily: 'SFProText-Regular',
          marginBottom: 33,
        }}>
        You can farm coins to buy new stones and compete games
      </Text>
      <ScrollView
        contentContainerStyle={{
          gap: 24,
          paddingBottom: 100,
        }}>
        <GameButton
          color="#DC97F8"
          description="3 lvls"
          title="Stone Cards"
          onPress={() => {
            navigation.navigate(ScreensRoads.SelectMemoryGameLevel);
          }}
        />

        <GameButton
          color="#A45DFB"
          title="Hold stone"
          description="Daily"
          onPress={() => {
            navigation.navigate(ScreensRoads.HoldStone);
          }}
        />
        <GameButton
          color="#602BC8"
          title="Tap to win"
          description="3 lvls"
          onPress={() => {
            navigation.navigate(ScreensRoads.SelectTapToWinGame);
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          const availableCards = [
            {
              title: 'Stone Cards',
              onPress: () => {
                navigation.navigate(ScreensRoads.SelectMemoryGameLevel);
              },
            },
            {
              title: 'Hold stone',
              onPress: () => {
                navigation.navigate(ScreensRoads.HoldStone);
              },
            },
            {
              title: 'Tap to win',
              onPress: () => {
                navigation.navigate(ScreensRoads.SelectTapToWinGame);
              },
            },
          ];
          const random = Math.floor(Math.random() * availableCards.length);
          availableCards[random].onPress();
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
  title: string;
  description: string;
  color: string;
}

const GameButton: FC<Props> = ({onPress, description, title, color}) => {
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
          {description}
        </Text>
      </View>
      <View
        style={{
          height: 70,
          alignItems: 'center',
          flexDirection: 'row',
          gap: 12,
        }}>
        <Image source={require('../../shared/assets/arrow.png')} />
      </View>
    </TouchableOpacity>
  );
};
