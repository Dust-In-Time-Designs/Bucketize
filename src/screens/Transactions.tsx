import React from 'react';
import {View, Text} from 'react-native';
import Transactions from '../components/transactions';
import {styles} from '../styles';

const TransactionsScreen = () => {
  return (
    <View style={styles.screenContainerLight}>
      <View style={styles.walletTransactions}>
        <Text style={styles.walletHeading}>Last Transactions</Text>
        <Transactions />
      </View>
    </View>
  );
};

export default TransactionsScreen;
