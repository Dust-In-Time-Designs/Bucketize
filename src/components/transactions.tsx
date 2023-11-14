import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {styles} from '../styles';
import {handleGetTransactions} from '../services/plaidService';
import {PlaidTransaction} from '../types';

const Transactions = () => {
  const [transactionData, setTransactionData] = useState<
    PlaidTransaction[] | null
  >(null);
  const [transactionDataToReview, setTransactionDataToReview] = useState<
    PlaidTransaction[] | null
  >(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (transactionData == null) {
        const data = await handleGetTransactions();
        setTransactionData(data);
      }
    };

    fetchTransactions();
  }, [transactionData]);

  // useEffect(() => {
  //   const checkForReviews = () => {
  //     if (transactionData) {
  //       const toReview = transactionData.filter(
  //         transaction => !transaction.user_category,
  //       );
  //       setTransactionDataToReview(toReview);
  //     }
  //     console.log(transactionDataToReview);
  //   };
  //   checkForReviews();
  // }, [transactionDataToReview]);

  const renderItem = ({item}: {item: PlaidTransaction}) => {
    return (
      <View style={styles.transactionItemContainer}>
        <View style={styles.transactionIcon}>
          <Image
            source={require('../assets/cart.png')}
            style={styles.transactionIconImg}
          />
          <View>
            <Text style={styles.transactionMerchantText}>Merchant</Text>
            <Text style={styles.transactionMerchantName}>
              {item.merchant_name ?? 'Unknown'}
            </Text>
          </View>
        </View>
        <View style={styles.transactionAmountContainer}>
          <Image
            source={require('../assets/wallet.png')}
            style={styles.transactionAmountIcon}
          />
          <Text style={styles.transactionAmountText}>${item.amount}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={transactionData}
      renderItem={renderItem}
      keyExtractor={item => item?.plaid_transaction_id}
      style={styles.transactionList}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Transactions;
