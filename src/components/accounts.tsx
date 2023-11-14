import React, {useState, useEffect} from '../../app/node_modules/@types/react';
import {View, Text} from 'react-native';
import {handleGetAccounts} from '../services/plaidService';
import {User} from '../models/user';
import {PlaidAccount} from '../types';

type Params = {
  accessToken: string;
  itemId: string;
  user: User;
};

const Accounts = ({accessToken, user}: Params) => {
  const [data, setData] = useState<PlaidAccount[] | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (data == null) {
        const accounts = await handleGetAccounts(user.accessToken, accessToken);
        setData(accounts);
      }
    };
    fetchAccounts();
  }, [accessToken, data, user]);
  return (
    <View>
      <Text>data</Text>
    </View>
  );
};

export default Accounts;
