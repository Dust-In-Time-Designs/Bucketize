import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import {State} from '../store/reducers';
import LogoutButton from '../components/logoutButton';
import {DashboardScreenRouteProp} from '../types';
import PlaidScreen from './Plaid';
import {useNavigation} from '@react-navigation/native';
import {handleGetBalance} from '../services/plaidService';
import {PlaidAccount} from '../types';
import {styles} from '../styles';
import Balance from '../components/balance';

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenRouteProp>();
  const {user} = useSelector((state: State) => state.auth);
  const [data, setData] = useState<PlaidAccount[] | null>(null);
  console.log('this is data:', data);

  const fetchData = async () => {
    if (data == null) {
      const balance = await handleGetBalance();
      setData(balance);
    }
  };

  useEffect(() => {
    fetchData();

    if (!user) {
      navigation.navigate('Register');
    }
  }, [navigation, user, data]);

  return (
    <View style={styles.screenContainerLight}>
      <Text style={styles.titleText}>
        {user && `Welcome ${user.firstName} ${user.lastName}!`}
      </Text>
      <PlaidScreen />
      {/* {!data ? <PlaidScreen /> : <Balance />} */}

      <LogoutButton />
    </View>
  );
};

export default DashboardScreen;
