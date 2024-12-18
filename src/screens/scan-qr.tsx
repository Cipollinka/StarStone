import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';

export const ScanQr = ({
  setIsCamerOpened,
}: {
  setIsCamerOpened: (value: boolean) => void;
}) => {
  if (false)
    return (
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsCamerOpened(false);
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
            margin: 'auto',
            fontSize: 28,
            lineHeight: 41,
            color: '#ffffff',
            fontFamily: 'SFProText-Bold',
            marginBottom: 12,
            paddingLeft: 16,
          }}>
          No camera permission
        </Text>
      </View>
    );
  if (false)
    return (
      <View
        style={{
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => {
            setIsCamerOpened(false);
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
            margin: 'auto',
            fontSize: 28,
            lineHeight: 41,
            color: '#ffffff',
            fontFamily: 'SFProText-Bold',
            marginBottom: 12,
            paddingLeft: 16,
          }}>
          No camera found
        </Text>
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={() => {
          setIsCamerOpened(false);
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
          fontSize: 28,
          lineHeight: 41,
          color: '#ffffff',
          fontFamily: 'SFProText-Bold',
          marginBottom: 12,
          paddingLeft: 16,
        }}>
        Add friend to collection
      </Text>

      <View
        style={{
          flex: 1,
          position: 'relative',
        }}>
        <RNCamera
          style={{
            flex: 1,
          }}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
      </View>
    </View>
  );
};
