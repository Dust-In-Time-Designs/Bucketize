import React from 'react';
import {View, Text} from 'react-native';
import Transactions from '../components/transactions';
import Balance from '../components/balance';
import {styles} from '../styles';

const WalletDetailsScreen = () => {
  return (
    <View style={styles.walletContainer}>
      <View style={styles.walletBalance}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.walletHeading}>Wallet Balance</Text>
        </View>
        <Balance />
        {/* <Items accessToken={accessToken} itemId={itemId} user={user} /> */}
      </View>
      <View style={styles.walletTransactions}>
        <View style={{marginVertical: 10}}>
          <Text style={styles.walletHeading}>Last Transactions</Text>
        </View>
        <Transactions />
      </View>
    </View>
  );
};

export default WalletDetailsScreen;
