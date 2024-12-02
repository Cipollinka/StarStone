import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {ScreensRoads} from '../../shared/use-react-native-navigation.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../screens';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface Props {
  price: number;
  title: string;
  description: string;
  footer?: ReactNode;
  image: ImageSourcePropType;
  id: string;
  className?: ViewStyle;
  displayPrice?: boolean;
}

export const StoneCard: FC<Props> = ({
  price,
  title,
  description,
  footer,
  image,
  id,
  className,
  displayPrice = true,
}) => {
  const {navigate} =
    useNavigation<NavigationProp<RootStackParamList, ScreensRoads.Stone>>();

  function isValidUrl(uri: ImageSourcePropType) {
    try {
      new URL(uri as string);
      return true; // It's a valid URL
    } catch (error) {
      return false; // It's not a valid URL
    }
  }

  return (
    <View
      style={[
        {
          backgroundColor: '#2B0C30',
          width: 170,
          borderRadius: 14,
        },
        className,
      ]}>
      <TouchableOpacity
        onPress={e => {
          navigate(ScreensRoads.Stone, {stoneId: id});
        }}
        style={{
          padding: 8,
          paddingBottom: 0,
        }}>
        <Image
          source={isValidUrl(image) ? {uri: image} : image}
          style={{
            objectFit: 'contain',
            backgroundColor: '#220B25',
            borderRadius: 10,
            width: '100%',
            height: 74,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          padding: 12,
          paddingTop: 7,
          paddingBottom: 14,
          gap: 4,
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            gap: 4,
          }}
          onPress={e => {
            navigate(ScreensRoads.Stone, {stoneId: id});
          }}>
          <>
            {displayPrice && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'white',
                    fontFamily: 'SFProText-Bold',
                  }}>
                  {price ? `${Math.abs(price).toLocaleString()}` : 'Free'}
                </Text>
                <Image
                  source={require('../../shared/assets/coin.png')}
                  style={{
                    width: 21,
                    height: 21,
                  }}
                />
              </View>
            )}
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontFamily: 'SFProText-Medium',
              }}>
              {title}
            </Text>

            <Text
              style={{
                fontSize: 13,
                fontFamily: 'SFProText-Regular',
                color: 'rgba(255, 255, 255, 0.5)',
                marginBottom: footer ? 6 : 0,
              }}>
              {description}
            </Text>
          </>
        </TouchableOpacity>

        {footer && (
          <View
            style={{
              marginTop: 'auto',
            }}>
            {footer}
          </View>
        )}
      </View>
    </View>
  );
};
