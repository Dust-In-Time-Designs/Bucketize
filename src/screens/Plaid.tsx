import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {
  handleCreateLinkToken,
  handleRetrieveAccessToken,
} from '../services/plaidService';
import {PlaidScreenRouteProp} from '../types';
import {State} from '../store/reducers';

const PlaidScreen = () => {
  const navigation: PlaidScreenRouteProp = useNavigation();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const {user} = useSelector((state: State) => state.auth);

  const createLinkToken = useCallback(async () => {
    try {
      const data = await handleCreateLinkToken(user.accessToken);
      setLinkToken(data);
    } catch (err) {
      console.log('error', err);
    }
  }, [setLinkToken, user]);

  const checkForPlaidItem = useCallback(async () => {
    if (user) {
      const token = await handleRetrieveAccessToken(user.accessToken);
      if (token) {
        navigation.navigate('WalletDetails');
      }
    }
  }, [navigation, user]);

  useEffect(() => {
    if (linkToken == null && user) {
      createLinkToken();
      checkForPlaidItem();
    }
  }, [linkToken, createLinkToken, user, checkForPlaidItem]);

  return (
    <View style={styles.plaidButtonContainer}>
      {linkToken && (
        <PlaidLink
          tokenConfig={{
            token: linkToken,
            noLoadingState: false,
          }}
          onSuccess={async () => {
            navigation.navigate('WalletDetails');
          }}
          onExit={response => {
            console.log(response);
          }}>
          <View style={styles.plaidButton}>
            <Text style={styles.plaidButtonText}>Connect Bank Accounts</Text>
            <Image source={require('../assets/next.png')} />
          </View>
        </PlaidLink>
      )}
    </View>
  );
};

export default PlaidScreen;
