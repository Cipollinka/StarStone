import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import {Stone, useUserDataProfile} from '../player';
import {STONES} from '../stone/config.ts';
import {StoneCard} from '../stone';
import {AddToCollectionModal} from '../widgets/add-to-collection.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from './index.tsx';

export const CollectionScreen = () => {
  const {userProfile, setUserProfile} = useUserDataProfile();
  const {navigateToScreen} = useReactNativeNavigation();
  const {navigate} =
    useNavigation<
      NavigationProp<RootStackParamList, ScreensRoads.Collection>
    >();
  const [opened, setOpened] = React.useState(false);
  const [selectedStone, setSelectedStone] = React.useState('');

  const hasCollections = userProfile
    ? userProfile?.collections.length > 0
    : false;
  const removeStoneFromCollection = (collectionId: string, stoneId: string) => {
    const collection = userProfile?.collections.find(
      collection => collection.id === collectionId,
    );
    if (!userProfile || !collection) {
      return;
    }
    const updatedCollection = {
      ...collection,
      stones: collection.stones.filter(id => id !== stoneId),
    };
    setUserProfile({
      ...userProfile,
      collections: userProfile?.collections.map(collection =>
        collection.id === collectionId ? updatedCollection : collection,
      ),
    });
  };

  const availableStones = () => {
    if (!userProfile) {
      return [];
    }
    const usedStonesInCollections = userProfile?.collections.reduce<string[]>(
      (prev, collection) => {
        return [...prev, ...collection.stones];
      },
      [],
    );
    return [
      ...STONES.filter(stone => !usedStonesInCollections.includes(stone.id)),
      ...userProfile.stones.filter(
        stone => !usedStonesInCollections.includes(stone.id),
      ),
    ];
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          paddingRight: 16,
          paddingLeft: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 21,
        }}>
        <Text
          style={{
            fontSize: 34,
            color: '#ffffff',
            fontFamily: 'SFProText-Bold',
          }}>
          My collections
        </Text>

        <TouchableOpacity
          onPress={() => navigate(ScreensRoads.CreateCollection)}
          style={{
            borderRadius: 12,
            width: 44,
            height: 44,
            backgroundColor: '#A45DFB',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../shared/assets/plus.png')} />
        </TouchableOpacity>
      </View>

      {!hasCollections && (
        <View
          style={{
            flex: 1,
            paddingTop: 45,
            flexDirection: 'column',
            justifyContent: 'center',
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
            You don't have any collections yet
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigate(ScreensRoads.CreateCollection);
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
              Create collection
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {hasCollections && (
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView
            contentContainerStyle={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 84,
              gap: 24,
            }}>
            <View
              style={{
                gap: 12,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  lineHeight: 24,
                  color: '#ffffff',
                  fontFamily: 'SFProText-Bold',
                }}>
                New stones
              </Text>
              <FlatList
                data={availableStones()}
                contentContainerStyle={{
                  gap: 12,
                }}
                renderItem={({item}) => (
                  <StoneCard
                    id={item.id}
                    image={item.image}
                    key={item.id}
                    title={item.title}
                    description={item.shortDescription}
                    price={item.price}
                    footer={
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedStone(item.id);
                          setOpened(true);
                        }}
                        style={{
                          width: '100%',
                          height: 28,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 20,
                          backgroundColor: '#A45DFB',
                        }}>
                        <Text style={{fontSize: 12, color: 'white'}}>Add</Text>
                      </TouchableOpacity>
                    }
                  />
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                horizontal
              />
            </View>
            {userProfile?.collections.map(collection => (
              <View
                key={collection.id}
                style={{
                  gap: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      lineHeight: 24,
                      color: '#ffffff',
                      fontFamily: 'SFProText-Bold',
                    }}>
                    {collection.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigate(ScreensRoads.EditCollection, {
                        collectionId: collection.id,
                      });
                    }}>
                    <Image source={require('../shared/assets/edit.png')} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={collection.stones.reduce<Stone[]>((prev, stoneId) => {
                    const stone =
                      STONES.find(stone => stone.id === stoneId) ||
                      (userProfile?.stones || []).find(
                        stone => stone.id === stoneId,
                      );
                    if (stone) {
                      return [...prev, stone];
                    }
                    return prev;
                  }, [])}
                  contentContainerStyle={{
                    gap: 12,
                  }}
                  renderItem={({item}) => (
                    <StoneCard
                      id={item.id}
                      image={item.image}
                      key={item.id}
                      title={item.title}
                      description={item.shortDescription}
                      price={item.price}
                      footer={
                        <TouchableOpacity
                          onPress={() => {
                            removeStoneFromCollection(collection.id, item.id);
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
                          <Text style={{fontSize: 12, color: '#A45DFB'}}>
                            Remove from collection
                          </Text>
                        </TouchableOpacity>
                      }
                    />
                  )}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  horizontal
                />
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigateToScreen(ScreensRoads.AddStone);
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
            <Image source={require('../shared/assets/plus.png')} />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'SFProText-Bold',
              }}>
              Add your stone
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <AddToCollectionModal
        stoneId={selectedStone || ''}
        opened={opened}
        setOpened={setOpened}
      />
    </View>
  );
};
