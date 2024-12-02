import {
  CommonActions,
  useNavigation as useStackNavigation,
  useNavigationState,
} from '@react-navigation/native';

export const useReactNativeNavigation = () => {
  const currentlyOpenedScreen = useNavigationState(state =>
    !state?.routes ? '' : state.routes[state.index].name,
  );

  const {dispatch} = useStackNavigation();

  const navigateToScreen = (screen: ScreensRoads) => {
    if (currentlyOpenedScreen !== screen) {
      dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screen}],
        }),
      );
    }
  };
  return {navigateToScreen, currentlyOpenedScreen};
};

export enum ScreensRoads {
  Loader = 'Loader',
  CreateCollection = 'CreateCollection',
  Settings = 'Settings',
  Catalogue = 'Catalogue',
  EditCollection = 'EditCollection',
  AddStone = 'AddStone',
  Collection = 'Collection',
  Play = 'Play',
  Stone = 'Stone',
  Game = 'Game',
}
