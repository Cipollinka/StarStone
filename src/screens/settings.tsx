import React, {useState} from 'react';
import {
    Alert,
    FlatList,
    Image,
    ImageSourcePropType, Linking,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {useUserDataProfile} from '../player';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import {launchImageLibrary} from 'react-native-image-picker';

export enum TransactionType {
  Game = 'Game',
  StonePurchase = 'Stone purchase',
}

export const SettingsScreen = () => {
  const {userProfile, setUserProfile, resetUserProfile} = useUserDataProfile();
  const {navigateToScreen} = useReactNativeNavigation();
  const getIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.Game:
        return require('../shared/assets/gamesuccess.png');
      case TransactionType.StonePurchase:
        return require('../shared/assets/purchase.png');
    }
  };

  function adjustValue(value: number, isPositive: boolean) {
    const formattedNumber = Math.abs(value).toLocaleString();

    const sign = isPositive ? '+' : '-';

    return `${sign} ${formattedNumber}`;
  }

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <ScrollView
        style={{
          flex: 1,
          // alignItems: 'center',
          // justifyContent: 'center',
        }}
        contentContainerStyle={{
          paddingBottom: 57,
        }}>
        <Text
          style={{
            paddingLeft: 16,
            fontSize: 34,
            lineHeight: 41,
            color: '#ffffff',
            fontFamily: 'SFProText-Bold',
            marginBottom: 24,
          }}>
          Profile and balance
        </Text>
        <ManageProfile />

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Your balance:</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}>
            <Text style={styles.balanceAmount}>
              {Math.abs(userProfile?.score || 0).toLocaleString()}
            </Text>
            <Image
              style={{
                width: 28,
                height: 28,
              }}
              source={require('../shared/assets/coin.png')}
            />
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'SfPro',
            marginBottom: 12,
            paddingLeft: 16,
          }}>
          Transactions
        </Text>
        {(userProfile?.transactions || []).length === 0 ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
            }}>
            <Image source={require('../shared/assets/sadsmile.png')} />
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'SFProText-Bold',
                marginTop: 16,
                marginBottom: 20,
              }}>
              You don't have transactions yet
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigateToScreen(ScreensRoads.Catalogue);
              }}
              style={{
                width: 147,
                height: 28,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#A45DFB',
                borderRadius: 20,
                marginBottom: 20,
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
        ) : undefined}
        {(userProfile?.transactions || []).length > 0 ? (
          <FlatList
            data={userProfile?.transactions || []}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.transactionItem}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    gap: 8,
                  }}>
                  <Image source={getIcon(item.type)} />
                  <Text style={styles.transactionType}>{item.title}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Text style={[styles.transactionAmount]}>
                    {adjustValue(item.amount, item.isPositive)}
                  </Text>
                  <Image
                    source={require('../shared/assets/coin.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
              </View>
            )}
          />
        ) : undefined}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.termsfeed.com/live/ef8b58c3-5ebf-489d-bdf2-603ff04cd829')}>
          <Text style={styles.footerText}>Privacy Policy</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.termsfeed.com/live/ef8b58c3-5ebf-489d-bdf2-603ff04cd829')}>
          <Text style={styles.footerText}>Developer Website</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            resetUserProfile();
          }}>
          <Text style={styles.footerText}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const ManageProfile = () => {
  const {userProfile, setUserProfile, resetUserProfile} = useUserDataProfile();
  const [photo, setPhoto] = React.useState<ImageSourcePropType | undefined>(
    userProfile?.avatar,
  );
  const {navigateToScreen} = useReactNativeNavigation();
  const [userName, setUserName] = React.useState(userProfile?.userName || '');
  const [about, setAbout] = React.useState(userProfile?.about || '');
  const selectImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (!uri) {
            return;
          }
          setPhoto(uri);
        }
      },
    );
  };
  const [isEdit, setIsEdit] = useState(!userProfile?.userName);
  const disabled = !userName;
  if (isEdit) {
    return (
      <View
        style={{
          gap: 16,
          paddingHorizontal: 16,
          marginBottom: 40,
        }}>
        <TouchableOpacity
          style={{
            position: 'relative',
            marginHorizontal: 'auto',
          }}
          onPress={selectImage}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
            }}
            source={
              photo
                ? {
                    uri: photo,
                  }
                : require('../shared/assets/addimage.png')
            }
          />
          {photo && (
            <TouchableOpacity
              onPress={() => {
                setPhoto(undefined);
              }}
              style={{
                top: 0,
                right: 0,
                backgroundColor: '#999999',
                borderRadius: 100,
                width: 25,
                height: 25,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
              }}>
              <Text
                style={{
                  lineHeight: 20,
                  fontSize: 20,
                  color: 'black',
                }}>
                x
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <View>
          <Text
            style={{
              color: 'white',
              fontFamily: 'SFProText-Medium',
              fontSize: 16,
              marginBottom: 8,
            }}>
            Your name
          </Text>

          <TextInput
            clearButtonMode="always"
            value={userName}
            onChangeText={setUserName}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={{
              color: 'white',
              paddingHorizontal: 20,
              backgroundColor: '#2B0C30',
              borderRadius: 16,
              height: 52,
            }}
            placeholder="John Doe"
          />
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontFamily: 'SFProText-Medium',
              fontSize: 16,
              marginBottom: 8,
            }}>
            About you
          </Text>

          <TextInput
            clearButtonMode="always"
            value={about}
            onChangeText={setAbout}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            style={{
              color: 'white',
              paddingHorizontal: 20,
              backgroundColor: '#2B0C30',
              borderRadius: 16,
              height: 52,
            }}
            placeholder="Text about you"
          />
        </View>
        <TouchableOpacity
          disabled={disabled}
          onPress={async () => {
            if (!userProfile) {
              return;
            }
            await setUserProfile({
              ...userProfile!,
              userName,
              about,
              avatar: photo as string,
            });
            setIsEdit(false);
            Alert.alert('Profile updated successfully!');
          }}
          style={{
            height: 52,
            borderRadius: 20,
            backgroundColor: disabled ? '#220B25' : '#602BC8',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.5 : 1,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontFamily: 'SFProText-Regular',
              textAlign: 'center',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View
      style={{
        paddingHorizontal: 16,
        gap: 16,
        marginBottom: 28,
      }}>
      <View
        style={{
          position: 'relative',
          marginHorizontal: 'auto',
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginHorizontal: 'auto',
          }}
          source={
            userProfile?.avatar
              ? {uri: userProfile.avatar}
              : require('../shared/assets/emptyava.png')
          }
        />
        <TouchableOpacity
          onPress={() => {
            navigateToScreen(ScreensRoads.MyQrCode);
          }}
          style={{
            top: -10,
            right: -10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <Image source={require('../shared/assets/qr.png')} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: 'white',
          fontFamily: 'SFProText-Bold',
        }}>
        {userProfile?.userName || ''}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: 'white',
          fontFamily: 'SFProText-Regular',
        }}>
        About me
      </Text>
      {userProfile?.about && (
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontFamily: 'SFProText-Regular',
          }}>
          {userProfile?.about}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setIsEdit(true)}
        style={{
          marginHorizontal: 'auto',
        }}>
        <Text
          style={{
            color: '#A45DFB',
            fontSize: 16,
            fontFamily: 'SFProText-Regular',
          }}>
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  balanceContainer: {
    marginRight: 16,
    marginLeft: 16,
    borderColor: '#A45DFB',
    borderWidth: 1,
    borderRadius: 20,
    paddingTop: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 20,
    fontFamily: 'SFProText-Regular',
    color: '#ffffff',
  },
  balanceAmount: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'SFProText-Bold',
  },
  transactionItem: {
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(153, 153 153, 0.25)',
  },
  icon: {
    marginRight: 10,
  },
  transactionType: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'SFProText-Regular',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'SFProText-Semibold',
    color: 'white',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 57,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#A45DFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerText: {
    color: 'white',
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
  },
});
