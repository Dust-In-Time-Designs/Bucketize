import React, {useCallback, useState} from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers';
import {API_URL} from '@env';

const Items = () => {
  const [data, setData] = useState(null);
  const {accessToken, itemId} = useSelector((state: State) => state.plaid);

  const getItems = useCallback(async () => {
    await fetch(`http://${API_URL}:8080/api/item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('🚀 getItems', data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    getItems();
  }, []);
  return (
    <View>
      <Text>todo..</Text>
    </View>
  );
};

export default Items;
