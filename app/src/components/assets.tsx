import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {User} from '../models/user';
import {handleGetAssets} from '../services/plaidService';

type Params = {
  accessToken: string;
  itemId: string;
  user: User;
};

const Assets = ({accessToken, user}: Params) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (data == null) {
        const accounts = await handleGetAssets(user.accessToken, accessToken);
        setData(accounts);
      }
    };
    fetchAccounts();
  }, [accessToken, data, user]);

  return (
    <View>
      <Text>todo...</Text>
    </View>
  );
};

export default Assets;
