import React, {FC} from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';
import {LoadingScreen} from './loading.tsx';
import {SettingsScreen} from './settings.tsx';
import {CatalogueScreen} from './catalogue.tsx';
import {AddStoneScreen} from './add-stone.tsx';
import {MemoryGame} from './game/memory-game.tsx';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {GameScreen} from './game';
import {StoneScreen} from './stone.tsx';
import {CreateCollectionScreen} from './create-collection.tsx';
import {CollectionScreen} from './collection.tsx';
import {EditCollectionScreen} from './edit-collection.tsx';

export type RootStackParamList = {
  [ScreensRoads.Settings]: undefined; // No params
  [ScreensRoads.Loader]: undefined; // No params
  [ScreensRoads.Catalogue]: undefined; // No params
  [ScreensRoads.AddStone]: undefined; // No params
  [ScreensRoads.CreateCollection]: undefined; // No params
  [ScreensRoads.Collection]: undefined; // No params
  [ScreensRoads.EditCollection]: {
    collectionId: string;
  }; // No params
  [ScreensRoads.Stone]: {
    stoneId: string;
  };
  [ScreensRoads.Game]: undefined; // No params
  [ScreensRoads.Play]: {
    cards: number;
    title: string;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
export const Screens = () => {
  return (
    <ImageBackground
      source={require('../shared/assets/bg.png')}
      style={styles.wrapper}>
      <SafeAreaView
        style={{
          paddingTop: 32,
          marginRight: 'auto',
          marginLeft: 'auto',
          flex: 1,
          // maxWidth: 390,
          width: '100%',
          height: '100%',
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={ScreensRoads.Loader}>
          <Stack.Screen name={ScreensRoads.Loader} component={LoadingScreen} />
          <Stack.Screen
            name={ScreensRoads.AddStone}
            component={AddStoneScreen}
          />
          <Stack.Screen name={ScreensRoads.Stone} component={StoneScreen} />
          <Stack.Screen name={ScreensRoads.Game} component={GameScreen} />
          <Stack.Screen
            name={ScreensRoads.Collection}
            component={CollectionScreen}
          />
          <Stack.Screen
            name={ScreensRoads.EditCollection}
            component={EditCollectionScreen}
          />
          <Stack.Screen name={ScreensRoads.Play} component={MemoryGame} />
          <Stack.Screen
            name={ScreensRoads.CreateCollection}
            component={CreateCollectionScreen}
          />
          <Stack.Screen
            name={ScreensRoads.Catalogue}
            component={CatalogueScreen}
          />
          <Stack.Screen
            name={ScreensRoads.Settings}
            component={SettingsScreen}
          />
        </Stack.Navigator>
      </SafeAreaView>
      <Navigation />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export const Navigation = () => {
  const {currentlyOpenedScreen, navigateToScreen} = useReactNativeNavigation();
  console.log(currentlyOpenedScreen);
  const navigationActiveScreens: string[] = [
    ScreensRoads.Settings,
    ScreensRoads.Catalogue,
    ScreensRoads.Collection,
    ScreensRoads.Game,
  ];
  if (!currentlyOpenedScreen || !navigationActiveScreens.includes(currentlyOpenedScreen))
    return null;
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#2B0C30',
        alignItems: 'center',
      }}>
      <SafeAreaView
        style={{
          maxWidth: 390,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 82,
          minHeight: 82,
        }}>
        <NavigationButton
          navigateTo={() => navigateToScreen(ScreensRoads.Catalogue)}
          isActive={currentlyOpenedScreen === ScreensRoads.Catalogue}
          path={
            currentlyOpenedScreen === ScreensRoads.Catalogue
              ? require('../shared/assets/activeshop.png')
              : require('../shared/assets/shop.png')
          }
          text={'Catalogue'}
        />
        <NavigationButton
          navigateTo={() => navigateToScreen(ScreensRoads.Collection)}
          isActive={currentlyOpenedScreen === ScreensRoads.Collection}
          path={
            currentlyOpenedScreen === ScreensRoads.Collection
              ? require('../shared/assets/activecollection.png')
              : require('../shared/assets/collection.png')
          }
          text={'Collection'}
        />
        <NavigationButton
          navigateTo={() => navigateToScreen(ScreensRoads.Game)}
          isActive={currentlyOpenedScreen === ScreensRoads.Game}
          path={
            currentlyOpenedScreen === ScreensRoads.Game
              ? require('../shared/assets/activegame.png')
              : require('../shared/assets/game.png')
          }
          text={'Game'}
        />
        <NavigationButton
          navigateTo={() => navigateToScreen(ScreensRoads.Settings)}
          isActive={currentlyOpenedScreen === ScreensRoads.Settings}
          path={
            currentlyOpenedScreen === ScreensRoads.Settings
              ? require('../shared/assets/activesettings.png')
              : require('../shared/assets/settings.png')
          }
          text={'Settings'}
        />
      </SafeAreaView>
    </View>
  );
};

interface Props {
  text: string;
  path: ImageSourcePropType;
  isActive: boolean;
  navigateTo: () => void;
}

const NavigationButton: FC<Props> = ({path, text, isActive, navigateTo}) => {
  return (
    <TouchableOpacity
      onPress={navigateTo}
      style={{
        paddingTop: 8,
        flex: 1,
        height: 68,
        gap: 8,
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: 32,
          height: 32,
        }}
        source={path}
      />
      <Text
        style={{
          color: isActive ? '#A45DFB' : '#FFFFFF',
          fontSize: 10,
          fontFamily: 'SFProText-Semibold',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
