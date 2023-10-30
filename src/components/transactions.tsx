import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {styles} from '../styles';
import {handleGetTransactions} from '../services/plaidService';
import {User} from '../models/user';
import {PlaidTransaction} from '../types';

type Params = {
  accessToken: string;
  itemId: string;
  user: User;
};

const Transactions = ({accessToken, user}: Params) => {
  const [transactionData, setTransactionData] = useState<
    PlaidTransaction[] | null
  >(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (transactionData == null) {
        const data = await handleGetTransactions(user.accessToken, accessToken);
        setTransactionData(data.latest_transactions);
      }
    };

    fetchTransactions();
  }, [transactionData, user, accessToken]);

  const renderItem = ({item}: {item: PlaidTransaction}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.transactionIcon}>
          <Image
            source={require('../assets/cart.png')}
            style={styles.transactionIconImg}
          />
          <View>
            <Text style={styles.fontStyle}>Merchant</Text>
            <Text style={styles.text}>{item.merchant_name ?? 'Unknown'}</Text>
          </View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.fontStyle}>Payment Mode</Text>
          <Text style={styles.text}>{item.payment_channel}</Text>
        </View>
        <View style={styles.transactionIconSmall}>
          <Image source={require('../assets/wallet.png')} style={styles.icon} />
          <Text style={styles.text}>{item.amount}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{marginTop: 10}}>
      <FlatList
        data={transactionData}
        renderItem={renderItem}
        keyExtractor={item => item?.transaction_id}
        maxToRenderPerBatch={5}
        initialNumToRender={10}
        style={{paddingTop: 10}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Transactions;
