import {View} from 'react-native';

import {ReactNavigationProviderHandler} from './react-navigation-provider-handler.tsx';
import {Screens} from '../screens';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {UserProfileDataProvider} from './userProfileDataProvider.tsx';

export const App = () => {
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
};

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
