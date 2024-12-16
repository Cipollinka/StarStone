import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useUserDataProfile} from '../../player';
import {FirstStep} from './first-step.tsx';
import {SecondStep} from './second-step.tsx';
import {ThirdStep} from './third-step.tsx';
import {FourthStep} from './fourth-step.tsx';
import {FivweStep} from './fivwe-step.tsx';
import {SixStep} from './six-step.tsx';
import {SevenStep} from './seven-step.tsx';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../../shared/use-react-native-navigation.ts';

export const OnboardingScreen = () => {
  const {navigateToScreen} = useReactNativeNavigation();
  const STEPS = [
    <FirstStep />,
    <SecondStep />,
    <ThirdStep />,
    <FourthStep />,
    <FivweStep />,
    <SixStep />,
    <SevenStep />,
  ];
  const [currentStep, setCurrentStep] = React.useState(0);
  const {userProfile, setUserProfile} = useUserDataProfile();
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <View
        style={{
          width: '100%',
          height: 44,
          alignItems: 'center',
          justifyContent: currentStep > 0 ? 'space-between' : 'flex-end',
          flexDirection: 'row',
          paddingRight: 24,
          paddingLeft: 8,
        }}>
        {currentStep > 0 && (
          <TouchableOpacity
            onPress={() => {
              if (currentStep === 0) {
                return;
              }
              setCurrentStep(currentStep - 1);
            }}
            style={{
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
        )}

        <TouchableOpacity
          onPress={async () => {
            if (userProfile) {
              await setUserProfile({
                ...userProfile,
                isOnboardingCompleted: true,
              });
            }
            navigateToScreen(ScreensRoads.Catalogue);
          }}>
          <Text
            style={{
              color: 'rgba(164, 93, 251, 1)',
              fontSize: 17,
              fontFamily: 'SFProText-Regular',
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>
      {STEPS[currentStep]}
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 20,
          width: '100%',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            marginBottom: 25,
            flexDirection: 'row',
          }}>
          {STEPS.map((step, index) => (
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 12,
                backgroundColor:
                  currentStep === index
                    ? 'rgba(255, 255, 255, 1)'
                    : 'rgba(255, 255, 255, 0.5)',
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (currentStep === STEPS.length - 1) {
              if (userProfile) {
                await setUserProfile({
                  ...userProfile,
                  isOnboardingCompleted: true,
                });
              }
              navigateToScreen(ScreensRoads.Catalogue);
              return;
            }
            setCurrentStep(currentStep + 1);
          }}
          style={{
            width: '100%',
            height: 56,
            borderRadius: 20,
            backgroundColor: 'rgba(96, 43, 200, 1)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              fontFamily: 'SFProText-Semibold',
              textAlign: 'center',
            }}>
            {currentStep === STEPS.length - 1 ? 'Let’s start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
