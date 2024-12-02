import React, {ReactNode, useEffect} from 'react';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import {useUserDataProfile} from '../player';

export const ReactNavigationProviderHandler = ({children}: {children: ReactNode}) => {
  const {navigateToScreen} = useReactNativeNavigation();

  const { isDataLoading} = useUserDataProfile();
  useEffect(() => {
    if (isDataLoading) {
      return;
    }
    navigateToScreen(ScreensRoads.Catalogue);
  }, [isDataLoading]);

  return <>{children}</>;
};
