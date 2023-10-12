import React, {useCallback, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers';
import {API_URL} from '@env';

const Assets = () => {
  const [data, setData] = useState(null);
  const {accessToken, itemId} = useSelector((state: State) => state.plaid);

  const getAssets = useCallback(async () => {
    await fetch(`http://${API_URL}:8080/api/assets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('🚀 getAssets', data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAssets();
  }, []);
  return (
    <View>
      <Text>todo...</Text>
    </View>
  );
};

export default Assets;
