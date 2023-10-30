import React, {useEffect, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, Text, View} from 'react-native';
import {State} from '../store/reducers';
import LogoutButton from '../components/logoutButton';
import {DashboardScreenRouteProp} from '../types';
import PlaidScreen from './Plaid';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {
  handleInitializeData,
  handleCreateLinkToken,
} from '../services/plaidService';

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenRouteProp>();
  const {user} = useSelector((state: State) => state.auth);
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const createLinkToken = useCallback(async () => {
    try {
      const data = await handleCreateLinkToken(user.accessToken);
      setLinkToken(data);
    } catch (err) {
      console.log('error', err);
    }
  }, [setLinkToken, user]);

  const onSubmit = async () => {
    if (linkToken == null && user) {
      createLinkToken();
    }
    handleInitializeData(linkToken);
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate('Register');
    }
  }, [navigation, user]);

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.appTitleText}>
        {user && `Welcome ${user.firstName} ${user.lastName}!`}
      </Text>
      <Button onPress={onSubmit} title="Test" />
      <PlaidScreen />
      <LogoutButton />
    </View>
  );
};

export default DashboardScreen;
