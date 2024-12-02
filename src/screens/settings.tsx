import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUserDataProfile} from '../player';
import {
  ScreensRoads,
  useReactNativeNavigation,
} from '../shared/use-react-native-navigation.ts';

export enum TransactionType {
  Game = 'Game',
  StonePurchase = 'Stone purchase',
}

export const SettingsScreen = () => {
  const {userProfile, setUserProfile, resetUserProfile} = useUserDataProfile();
  const {navigateToScreen} = useReactNativeNavigation();
  const getIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.Game:
        return require('../shared/assets/gamesuccess.png');
      case TransactionType.StonePurchase:
        return require('../shared/assets/purchase.png');
    }
  };

  function adjustValue(value: number, isPositive: boolean) {
    const formattedNumber = Math.abs(value).toLocaleString();

    const sign = isPositive ? '+' : '-';

    return `${sign} ${formattedNumber}`;
  }

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <Text
        style={{
          paddingLeft: 16,
          fontSize: 34,
          lineHeight: 41,
          color: '#ffffff',
          fontFamily: 'SFProText-Bold',
          marginBottom: 24,
        }}>
        Settings and balance
      </Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Your balance:</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <Text style={styles.balanceAmount}>
            {Math.abs(userProfile?.score || 0).toLocaleString()}
          </Text>
          <Image
            style={{
              width: 28,
              height: 28,
            }}
            source={require('../shared/assets/coin.png')}
          />
        </View>
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontFamily: 'SfPro',
          marginBottom: 12,
          paddingLeft: 16,
        }}>
        Transactions
      </Text>
      {(userProfile?.transactions || []).length === 0 ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
          }}>
          <Image source={require('../shared/assets/sadsmile.png')} />
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'SFProText-Bold',
              marginTop: 16,
              marginBottom: 20,
            }}>
            You don't have transactions yet
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigateToScreen(ScreensRoads.Catalogue);
            }}
            style={{
              width: 147,
              height: 28,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#A45DFB',
              borderRadius: 20,
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
                fontFamily: 'SFProText-Regular',
              }}>
              Go to the shop
            </Text>
          </TouchableOpacity>
        </View>
      ) : undefined}
      {(userProfile?.transactions || []).length > 0 ? (
        <FlatList
          data={userProfile?.transactions || []}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.transactionItem}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                  gap: 8,
                }}>
                <Image source={getIcon(item.type)} />
                <Text style={styles.transactionType}>{item.title}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <Text style={[styles.transactionAmount]}>
                  {adjustValue(item.amount, item.isPositive)}
                </Text>
                <Image
                  source={require('../shared/assets/coin.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </View>
            </View>
          )}
        />
      ) : undefined}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerText}>Developer Website</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            resetUserProfile();
          }}>
          <Text style={styles.footerText}>Terms of Use</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    marginRight: 16,
    marginLeft: 16,
    backgroundColor: '#A45DFB',
    borderRadius: 20,
    paddingTop: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 20,
    fontFamily: 'SFProText-Regular',
    color: '#ffffff',
  },
  balanceAmount: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'SFProText-Bold',
  },
  transactionItem: {
    paddingRight: 16,
    paddingLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(153, 153 153, 0.25)',
  },
  icon: {
    marginRight: 10,
  },
  transactionType: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'SFProText-Regular',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'SFProText-Semibold',
    color: 'white',
  },
  footer: {
    width: '100%',
    height: 57,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#A45DFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerText: {
    color: 'white',
    fontFamily: 'SFProText-Regular',
    fontSize: 13,
  },
});
