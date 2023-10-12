import React, {useCallback, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers';
import {API_URL} from '@env';

const Accounts = () => {
  const [data, setData] = useState(null);
  const {accessToken, itemId} = useSelector((state: State) => state.plaid);

  const getAccounts = useCallback(async () => {
    await fetch(`http://${API_URL}:8080/api/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('🚀 getTransactions', data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    getAccounts();
  }, []);
  console.log('WalletDetails from wallteDetals ', data);
  return (
    <View>
      <Text>data</Text>
    </View>
  );
};

export default Accounts;
