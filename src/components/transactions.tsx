import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {colorStyles} from '../styles';
import {handleGetTransactions} from '../services/plaidService';
import {User} from '../models/user';

type Params = {
  accessToken: string;
  itemId: string;
  user: User;
};

const Transactions = ({accessToken, itemId, user}: Params) => {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    return async () => {
      if (transactionData == null) {
        const data = await handleGetTransactions(user.accessToken, accessToken);
        setTransactionData(data);
      }
    };
  }, [transactionData, user, accessToken]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '40%',
          }}>
          <Image
            source={require('../assets/cart.png')}
            style={{
              height: 24,
              width: 24,
              margin: 10,
            }}
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
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '30%',
          }}>
          <Image source={require('../assets/wallet.png')} style={styles.icon} />
          <Text style={styles.text}>{item.amount}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{marginTop: 10}}>
      <FlatList
        data={transactionData?.latest_transactions}
        renderItem={renderItem}
        keyExtractor={item => item?.account_id}
        maxToRenderPerBatch={5}
        initialNumToRender={10}
        style={{paddingTop: 10}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: colorStyles.mainAccent,
    borderRadius: 10,
    height: 100,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },

  fontStyle: {
    color: '#fff',
    fontSize: 12,
  },
});

export default Transactions;
