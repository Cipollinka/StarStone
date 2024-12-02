import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Stone, useUserDataProfile} from '../player';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import {STONES} from '../stone/config.ts';
import {StoneCard} from '../stone';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export const CreateCollectionScreen = () => {
  const {userProfile, setUserProfile} = useUserDataProfile();
  const [collectionName, setCollectionName] = useState('');
  const {navigateToScreen} = useReactNativeNavigation();
  const {goBack} = useNavigation();
  const [selectedStones, setSelectedStones] = useState<string[]>([]);
  const boutghtStones = (userProfile?.boughtStones || []).reduce<Stone[]>(
    (prev, stoneId) => {
      const stone = STONES.find(stone => stone.id === stoneId);
      if (stone) {
        return [...prev, stone];
      }
      return prev;
    },
    [],
  );
  const getFooterButton = (stoneId: string) => {
    if (selectedStones.includes(stoneId)) {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedStones(selectedStones.filter(id => id !== stoneId));
          }}
          style={{
            width: '100%',
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: '#A45DFB',
            borderWidth: 1,
          }}>
          <Text
            style={{
              fontSize: 12,
              color: '#A45DFB',
              fontFamily: 'SFProText-Regular',
            }}>
            Remove
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedStones([...selectedStones, stoneId]);
        }}
        style={{
          width: '100%',
          height: 28,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: '#A45DFB',
        }}>
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            fontFamily: 'SFProText-Regular',
          }}>
          Add
        </Text>
      </TouchableOpacity>
    );
  };
  const saveDisabled = selectedStones.length === 0 || !collectionName;
  const stones = [...(userProfile?.stones || []), ...boutghtStones];
  console.log('saveDisabled', saveDisabled);

  const hasStones = stones.length !== 0;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{}}>
        <TouchableOpacity
          onPress={goBack}
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
              fontFamily: 'SFProText-Regular',
              color: '#A45DFB',
              fontSize: 17,
              lineHeight: 22,
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            paddingRight: 16,
            paddingLeft: 16,
            fontFamily: 'SfPro',
            color: '#fff',
            fontSize: 34,
            lineHeight: 41,
          }}>
          Create collection
        </Text>
      </View>
      <View
        style={{
          position: 'relative',
          flex: 1,
          zIndex: 1,
          paddingHorizontal: 16,
        }}>
        <View style={{}}>
          <Text>Collection name</Text>
          <TextInput
            value={collectionName}
            onChangeText={setCollectionName}
            placeholder="Collection name"
            style={{
              fontFamily: 'SFProText-Regular',
              color: 'white',
              paddingLeft: 20,
              height: 52,
              width: '100%',
              backgroundColor: '#2B0C30',
              borderRadius: 16,
            }}
            placeholderTextColor="#ccc"
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            marginTop: 24,
            marginBottom: 12,
            fontFamily: 'SFProText-Bold',
          }}>
          Add stones
        </Text>
        {!hasStones && (
          <View
            style={{
              flex: 1,
              paddingTop: 45,
              flexDirection: 'column',
              gap: 16,
              alignItems: 'center',
            }}>
            <Image source={require('../shared/assets/sadsmile.png')} />
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontFamily: 'SFProText-Bold',
              }}>
              You don't have any stones yet
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigateToScreen(ScreensRoads.Catalogue);
              }}
              style={{
                width: 147,
                height: 28,
                backgroundColor: '#A45DFB',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'white',
                  fontFamily: 'SFProText-Regular',
                }}>
                Go to the shop
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {hasStones ? (
          <FlatList
            contentContainerStyle={{
              alignItems: 'stretch',
              paddingBottom: 20,
            }}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            data={stones}
            renderItem={({item}) => (
              <StoneCard
                className={{
                  flex: 1,
                  margin: 8,
                }}
                id={item.id}
                image={item.image}
                price={item.price}
                title={item.title}
                description={item.shortDescription}
                footer={getFooterButton(item.id)}
              />
            )}
          />
        ) : null}
        <TouchableOpacity
          onPress={async () => {
            if (!userProfile) {
              return;
            }
            await setUserProfile({
              ...userProfile,
              collections: [
                ...(userProfile.collections || []),
                {
                  id: new Date().getTime().toString(),
                  title: collectionName,
                  stones: selectedStones,
                },
              ],
            });
            navigateToScreen(ScreensRoads.Collection);
          }}
          disabled={saveDisabled}
          style={{
            bottom: 16,
            left: '50%',
            transform: [{translateX: -175}],
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            maxWidth: 350,
            width: '100%',
            height: 56,
            backgroundColor: saveDisabled ? '#220B25' : '#602BC8',
          }}>
          <Text
            style={{
              opacity: saveDisabled ? 0.5 : 1,
              fontSize: 20,
              color: 'white',
              fontFamily: 'SFProText-Bold',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
