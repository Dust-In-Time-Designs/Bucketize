import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {
  handleCreateLinkToken,
  handleInitializeData,
} from '../services/plaidService';
import {PlaidScreenRouteProp} from '../types';
import {State} from '../store/reducers';

const PlaidScreen = () => {
  const navigation: PlaidScreenRouteProp = useNavigation();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const {user} = useSelector((state: State) => state.auth);
  const createLinkToken = useCallback(async () => {
    try {
      console.log(user.accessToken);
      const data = await handleCreateLinkToken(user.accessToken);
      setLinkToken(data);
    } catch (err) {
      console.log('error', err);
    }
  }, [setLinkToken, user]);

  useEffect(() => {
    if (linkToken == null && user) {
      createLinkToken();
    }
  }, [linkToken, createLinkToken, user]);

  return (
    <View style={styles.plaidContainer}>
      {linkToken && (
        <PlaidLink
          tokenConfig={{
            token: linkToken,
            noLoadingState: false,
          }}
          onSuccess={async success => {
            await handleInitializeData(success.publicToken);
            navigation.navigate('LoggedIn', {screen: 'Transactions'});
          }}
          onExit={response => {
            console.log(response);
          }}>
          <View style={styles.plaidButton}>
            <Text style={styles.plaidButtonText}>Connect Bank Accounts</Text>
            <Image source={require('../assets/next.png')} style={styles.icon} />
          </View>
        </PlaidLink>
      )}
    </View>
  );
};

export default PlaidScreen;
