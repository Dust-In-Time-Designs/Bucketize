import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {User} from '../models/user';
import {handleGetItems} from '../services/plaidService';
import {PlaidItem} from '../types';

type Params = {
  accessToken: string;
  itemId: string;
  user: User;
};

const Items = ({accessToken, user}: Params) => {
  const [data, setData] = useState<PlaidItem | null>(null);
  useEffect(() => {
    const fetchTransactions = async () => {
      if (data == null) {
        const items = await handleGetItems(user.accessToken, accessToken);
        setData(items.item);
      }
    };

    fetchTransactions();
  }, [data, user, accessToken]);

  return (
    <View>
      <Text>todo..</Text>
    </View>
  );
};

export default Items;
