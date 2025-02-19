import React from 'react';
import {View} from 'react-native';
import {UserProfileDataProvider} from './app/userProfileDataProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ReactNavigationProviderHandler} from './app/react-navigation-provider-handler';
import {Screens} from './screens';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function WhiteWindow() {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <UserProfileDataProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer theme={navTheme}>
            <ReactNavigationProviderHandler>
              <Screens />
            </ReactNavigationProviderHandler>
          </NavigationContainer>
        </GestureHandlerRootView>
      </UserProfileDataProvider>
    </View>
  );
}
