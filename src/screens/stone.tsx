import React, {FC, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from './';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import {STONES} from '../stone/config.ts';
import {TransactionType, useUserDataProfile} from '../player';
import {AddToCollectionModal} from '../widgets/add-to-collection.tsx';

type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreensRoads.Stone
>;
export const StoneScreen: FC<DetailsScreenProps> = ({route}) => {
  const {navigateToScreen} = useReactNativeNavigation();
  const [opened, setOpened] = useState(false);

  const {userProfile, setUserProfile} = useUserDataProfile();
  const {stoneId} = route.params;
  const stone = useMemo(
    () =>
      STONES.find(stone => stone.id === stoneId) ||
      userProfile?.stones.find(({id}) => id === stoneId),
    [],
  );
  if (!stone) {
    return null;
  }

  const isFromCollection = false;
  const isPurchased =
    (userProfile?.boughtStones || []).includes(stoneId) ||
    (userProfile?.stones || []).some(({id}) => id === stoneId);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{}}>
        <TouchableOpacity
          onPress={() => navigateToScreen(ScreensRoads.Catalogue)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 8,
            marginBottom: 11,
            gap: 6,
          }}>
          <Image source={require('../shared/assets/chevron.png')} />
          <Text
            style={{
              fontFamily: 'SfPro',
              color: '#A45DFB',
              fontSize: 17,
              lineHeight: 22,
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 16,
            paddingLeft: 16,
          }}>
          <Text
            style={{
              fontFamily: 'SfPro',
              color: '#fff',
              fontSize: 34,
              lineHeight: 41,
            }}>
            {stone?.title}
          </Text>

          <TouchableOpacity
            onPress={() => {
              Share.share({
                title: `Check out this stone: ${stone.title}`,
                message: stone.description,
              });
            }}>
            <Text
              style={{
                fontFamily: 'SfPro',
                color: '#A45DFB',
                fontSize: 17,
                lineHeight: 22,
              }}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          marginTop: 20,
        }}
        contentContainerStyle={{
          paddingRight: 16,
          paddingLeft: 16,
        }}>
        <Image
          source={stone.image}
          style={{
            width: '100%',
            backgroundColor: '#2B0C30',
            height: 200,
            resizeMode: 'contain',
            borderRadius: 20,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            fontFamily: 'SfPro',
          }}>
          {stone.shortDescription}
        </Text>
        <Text
          style={{
            marginTop: 20,
            fontSize: 16,
            color: '#fff',
            fontFamily: 'SfPro',
          }}>
          {stone.description}
        </Text>
      </ScrollView>
      {isPurchased && !isFromCollection && (
        <TouchableOpacity
          onPress={() => {
            setOpened(true);
            console.log('Add to collection');
          }}
          style={{
            width: '100%', // Allow responsiveness
            maxWidth: 350, // Constrain max width
            height: 56,
            position: 'absolute',
            backgroundColor: '#602BC8',
            borderRadius: 20,
            bottom: 16, // Position near the bottom
            left: '50%', // Start at 50% of the parent width
            transform: [{translateX: -175}], // Adjust by half the width (maxWidth / 2)
            justifyContent: 'center', // Center content vertically
            alignItems: 'center', // Center content horizontally
            flexDirection: 'row', // Align the image and text in a row
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'SfPro',
            }}>
            Add to collection
          </Text>
        </TouchableOpacity>
      )}
      {!isPurchased && (
        <TouchableOpacity
          onPress={() => {
            if (!userProfile) {
              return;
            }
            setUserProfile({
              ...userProfile,
              boughtStones: [...(userProfile?.boughtStones || []), stoneId],
              transactions: [
                ...(userProfile?.transactions || []),
                {
                  type: TransactionType.StonePurchase,
                  id: new Date().getTime().toString(),
                  title: 'Stone purchase',
                  isPositive: false,
                  amount: stone.price,
                },
              ],
              score: (userProfile?.score || 0) - stone.price,
            });
          }}
          style={{
            width: '100%', // Allow responsiveness
            maxWidth: 350, // Constrain max width
            height: 56,
            position: 'absolute',
            backgroundColor: '#602BC8',
            borderRadius: 20,
            paddingRight: 20,
            paddingLeft: 20,
            bottom: 16, // Position near the bottom
            left: '50%', // Start at 50% of the parent width
            transform: [{translateX: -175}], // Adjust by half the width (maxWidth / 2)
            justifyContent: 'space-between', // Center content vertically
            alignItems: 'center', // Center content horizontally
            flexDirection: 'row', // Align the image and text in a row
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'SfPro',
            }}>
            Buy
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'SfPro',
              }}>
              {stone.price
                ? `${Math.abs(stone.price).toLocaleString()}`
                : 'Free'}
            </Text>
            <Image
              source={require('../shared/assets/coin.png')}
              style={{
                width: 22,
                height: 22,
              }}
            />
          </View>
        </TouchableOpacity>
      )}
      <AddToCollectionModal
        opened={opened}
        setOpened={setOpened}
        stoneId={stoneId}
      />
    </View>
  );
};
