import React from 'react';
import {View, Text} from 'react-native';
import Transactions from '../components/transactions';
import Balance from '../components/balance';
import {styles} from '../styles';

const WalletDetailsScreen = () => {
  return (
    <View style={styles.screenContainerLight}>
      <View style={styles.walletBalance}>
        <Text style={styles.walletHeading}>Wallet Balance</Text>
        <Balance />
      </View>
      <View style={styles.walletTransactions}>
        <Text style={styles.walletHeading}>Last Transactions</Text>
        <Transactions />
      </View>
    </View>
  );
};

export default WalletDetailsScreen;
