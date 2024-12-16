import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../index.tsx';
import {ScreensRoads} from '../../shared/use-react-native-navigation.ts';
import React, {FC} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useUserDataProfile} from '../../player';

type Props = NativeStackScreenProps<
  RootStackParamList,
  ScreensRoads.SelectTapToWinGame
>;

export const SelectTapToWinGameScreen: FC<Props> = ({navigation}) => {
  const {setUserProfile, userProfile} = useUserDataProfile();
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const completedLevels = userProfile?.completedLevels || 1;
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
        Tap to win
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
        You need to tap on the gemstones to earn coins and become richer.
      </Text>

      <FlatList
        numColumns={4}
        data={levels}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreensRoads.GemTapGame, {
                usefulPercentage: 100 - item * 2,
              });
            }}
            style={{
              borderRadius: 20,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                item > completedLevels
                  ? '#3F3F3F'
                  : completedLevels === item
                  ? '#A45DFB'
                  : '#602BC8',
              height: 77,
              margin: 8,
            }}>
            <Text
              style={{
                fontFamily:
                  completedLevels === item
                    ? 'SFProText-Bold'
                    : 'SFProText-Regular',
                fontSize: 32,
                color:
                  item > completedLevels
                    ? 'rgba(255, 255, 255, 0.4)'
                    : 'rgba(255, 255, 255, 1)',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
