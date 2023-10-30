import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import Transactions from '../components/transactions';
import Balance from '../components/balance';
import {State} from '../store/reducers';
import {WalletDetailsScreenRouteProp} from '../types';
import {styles} from '../styles';
import Items from '../components/items';

const WalletDetailsScreen = ({route}: WalletDetailsScreenRouteProp) => {
  const {user} = useSelector((state: State) => state.auth);
  const {itemId, accessToken} = route.params;
  return (
    <View style={styles.walletContainer}>
      <View style={styles.walletBalance}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.walletHeading}>Wallet Balance</Text>
        </View>
        <Balance accessToken={accessToken} itemId={itemId} user={user} />
        <Items accessToken={accessToken} itemId={itemId} user={user} />
      </View>
      <View style={styles.walletTransactions}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.walletHeading}>Last Transactions</Text>
        </View>
        <Transactions accessToken={accessToken} itemId={itemId} user={user} />
      </View>
    </View>
  );
};

export default WalletDetailsScreen;
