import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {StoneCard} from '../stone';
import {STONES} from '../stone/config.ts';
import {TransactionType, useUserDataProfile} from '../player';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';

export const CatalogueScreen = () => {
  const {userProfile, setUserProfile} = useUserDataProfile();
  const {navigateToScreen} = useReactNativeNavigation();
  const getStoneCardFooter = ({
    stoneId,
    price,
  }: {
    stoneId: string;
    price: number;
  }) => {
    const isPurchased = (userProfile?.boughtStones || []).includes(stoneId);
    const isAffordable = (userProfile?.score || 0) >= price;
    if (!isPurchased) {
      return (
        <TouchableOpacity
          onPress={event => {
            console.log('event', event);
            event.stopPropagation();
            if (!userProfile) {
              return;
            }
            if (isAffordable) {
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
                    amount: price,
                  },
                ],
                score: (userProfile?.score || 0) - price,
              });
            }
          }}
          disabled={!isAffordable}
          style={{
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: isAffordable ? '#A45DFB' : '#220B25',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: 'SFProText-Regular',
            }}>
            {isAffordable ? `Get` : 'Not enough coins'}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <View
        style={{
          height: 28,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: '#220B25',
        }}>
        <Text
          style={{
            color: '#999999',
            fontSize: 12,
            fontFamily: 'SFProText-Regular',
          }}>
          Received
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <Text
        style={{
          paddingRight: 16,
          paddingLeft: 16,
          fontSize: 34,
          lineHeight: 41,
          color: '#ffffff',
          fontFamily: 'SFProText-Bold',
          marginBottom: 24,
        }}>
        Stone catalogue
      </Text>
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
            New and interesting
          </Text>
          <FlatList
            data={STONES.slice(0, 4)}
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
                footer={getStoneCardFooter({
                  stoneId: item.id,
                  price: item.price,
                })}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
          />
        </View>
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
            Free stones
          </Text>
          <FlatList
            data={STONES.slice(4, 8)}
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
                footer={getStoneCardFooter({
                  stoneId: item.id,
                  price: item.price,
                })}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
          />
        </View>
        {userProfile?.stones && userProfile?.stones.length > 0 && (
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
              Your stones
            </Text>
            <FlatList
              data={userProfile?.stones || []}
              contentContainerStyle={{
                gap: 12,
              }}
              renderItem={({item}) => (
                <StoneCard
                  displayPrice={false}
                  id={item.id}
                  image={item.image}
                  key={item.id}
                  title={item.title}
                  description={item.shortDescription}
                  price={item.price}
                />
              )}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              horizontal
            />
          </View>
        )}
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
            Healing Crystals
          </Text>
          <FlatList
            data={STONES.slice(8, 12)}
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
                footer={getStoneCardFooter({
                  stoneId: item.id,
                  price: item.price,
                })}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
          />
        </View>
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
            Gemstones of Emotion
          </Text>
          <FlatList
            data={STONES.slice(12, 16)}
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
                footer={getStoneCardFooter({
                  stoneId: item.id,
                  price: item.price,
                })}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
          />
        </View>
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
  );
};
