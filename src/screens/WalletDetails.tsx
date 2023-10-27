import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import Transactions from '../components/transactions';
import Balance from '../components/balance';
import {State} from '../store/reducers';
import {WalletDetailsScreenRouteProp} from '../types';
import {colorStyles} from '../styles';

const WalletDetailsScreen = ({route}: WalletDetailsScreenRouteProp) => {
  const {user} = useSelector((state: State) => state.auth);
  const {itemId, accessToken} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.balance}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.heading}>Wallet Balance</Text>
        </View>
        <Balance accessToken={accessToken} itemId={itemId} user={user} />
      </View>
      <View style={styles.transactions}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.heading}>Last Transactions</Text>
        </View>
        <Transactions accessToken={accessToken} itemId={itemId} user={user} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heading: {
    color: colorStyles.secondaryAccent,
    fontSize: 20,
    fontWeight: '600',
  },
  transactions: {
    paddingBottom: 50,
    height: '75%',
  },
  balance: {
    height: '25%',
    width: '100%',
  },
});

export default WalletDetailsScreen;
