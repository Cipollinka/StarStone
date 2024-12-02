import {
  Alert,
  Image,
  ImageSourcePropType,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserDataProfile} from '../player';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { ScreensRoads, useReactNativeNavigation } from "../shared/use-react-native-navigation.ts";
import {RootStackParamList} from './index.tsx';

export const AddStoneScreen = () => {
  const {navigate} =
    useNavigation<NavigationProp<RootStackParamList, ScreensRoads.AddStone>>();
  const {navigateToScreen} = useReactNativeNavigation()
  const {setUserProfile, userProfile} = useUserDataProfile();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [photo, setPhoto] = React.useState<ImageSourcePropType | undefined>();

  const pickImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (!uri) {
            return;
          }
          setPhoto(uri);
        }
      },
    );
  };
  const disabled = !name || !description;
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 20,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigate(ScreensRoads.Catalogue);
        }}
        style={{
          marginLeft: 8,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 11,
          gap: 6,
        }}>
        <Image source={require('../shared/assets/chevron.png')} />
        <Text
          style={{
            fontFamily: 'SFProText-RegularSFProText-Regular',
            color: '#A45DFB',
            fontSize: 17,
            lineHeight: 22,
          }}>
          Back
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          paddingRight: 16,
          gap: 24,
          paddingLeft: 16,
        }}>
        <Text
          style={{
            fontSize: 34,
            lineHeight: 41,
            color: '#ffffff',
            fontFamily: 'SFProText-Bold',
          }}>
          Add your own stone
        </Text>
        <View>
          <Text
            style={{
              marginBottom: 12,
              fontSize: 20,
              fontFamily: 'SFProText-Bold',
              color: '#ffffff',
            }}>
            Name
          </Text>

          <View
            style={{
              height: 52,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 16,
              backgroundColor: '#2B0C30',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontFamily: 'SFProText-Regular',
                color: 'white',
              }}
              value={name}
              onChangeText={setName}
              placeholder="Name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
            {name.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setName('');
                }}>
                <Image source={require('../shared/assets/close.png')} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <Text
            style={{
              marginBottom: 12,
              fontSize: 20,
              fontFamily: 'SFProText-Bold',
              color: '#ffffff',
            }}>
            Description
          </Text>
          <View
            style={{
              height: 52,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 16,
              backgroundColor: '#2B0C30',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <TextInput
              style={{
                flex: 1,
                color: 'white',
                fontFamily:'SFProText-Regular',
              }}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
            {description.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setDescription('');
                }}>
                <Image source={require('../shared/assets/close.png')} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <Text
            style={{
              marginBottom: 12,
              fontSize: 20,
              fontFamily: 'SFProText-Bold',
              color: '#ffffff',
            }}>
            Photo
          </Text>

          {photo ? (
            <Image
              source={{uri: photo as string}}
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                backgroundColor: '#2B0C30',
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              style={{
                borderRadius: 12,
                backgroundColor: '#2B0C30',
                width: 100,
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontFamily: 'SfPro',
                }}>
                +
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={async () => {
          await setUserProfile({
            ...userProfile!,
            stones: [
              ...(userProfile?.stones || []),
              {
                id: new Date().getTime().toString(),
                title: name,
                description,
                image: photo!,
                price: 0,
                shortDescription: description.slice(0, 20),
              },
            ],
          });
          setName('');
          setDescription('');
          setPhoto(undefined);
          Alert.alert(
            'The stone added successfully!',
            'You can now find it in My Collections',
            [
              {
                text: 'Close',
                onPress: () => {
                  navigateToScreen(ScreensRoads.Catalogue);
                },
                style: 'default',
              },
            ],
            {cancelable: true},
          );
        }}
        style={{
          marginRight: 16,
          marginLeft: 16,
          height: 56,
          borderRadius: 20,
          backgroundColor: disabled ? '#220B25' : '#602BC8',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontFamily: 'SFProText-Bold',
            textAlign: 'center',
          }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};
