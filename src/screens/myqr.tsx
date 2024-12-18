import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useUserDataProfile} from '../player';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import QRCode from 'react-native-qrcode-svg';

export const MyQrCodeScreen = () => {
  const {userProfile, setUserProfile, resetUserProfile} = useUserDataProfile();
  const {navigateToScreen} = useReactNativeNavigation();

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigateToScreen(ScreensRoads.Settings);
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
      <Text
        style={{
          fontSize: 34,
          lineHeight: 41,
          color: '#ffffff',
          fontFamily: 'SFProText-Bold',
          marginBottom: 12,
          paddingLeft: 16,
        }}>
        Your QR-code
      </Text>

      <View
        style={{
          margin: 'auto',
          maxWidth: 360,
          borderRadius: 20,
          padding: 24,
          position: 'relative',
          backgroundColor: '#2B0C30',
        }}>
        <Image
          style={{
            position: 'absolute',
            top: -80,
            left: 120, // Start at 50% of the parent width
            width: 100,
            height: 100,
            borderRadius: 100,
          }}
          source={
            userProfile?.avatar
              ? {uri: userProfile.avatar}
              : require('../shared/assets/emptyava.png')
          }
        />
        <View
          style={{
            margin: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderRadius: 20,
            backgroundColor: '#fff',
          }}>
          <QRCode size={250} value={`starburst/${userProfile?.userName}`} />
        </View>
      </View>

      <TouchableOpacity
        onPress={async () => {
          navigateToScreen(ScreensRoads.Settings);
        }}
        style={{
          marginRight: 16,
          marginLeft: 16,
          height: 56,
          borderRadius: 20,
          backgroundColor: '#602BC8',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontFamily: 'SFProText-Bold',
            textAlign: 'center',
          }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
};
