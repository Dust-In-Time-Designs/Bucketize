import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {
  handleCreateLinkToken,
  handleSetAccessToken,
} from '../services/plaidService'; // Import the necessary functions
import {PlaidScreenRouteProp} from '../types';
import {State} from '../store/reducers';

const PlaidScreen = () => {
  const navigation: PlaidScreenRouteProp = useNavigation();
  const [linkToken, setLinkToken] = useState(null);
  const {user} = useSelector((state: State) => state.auth);

  const createLinkToken = useCallback(async () => {
    try {
      const data = await handleCreateLinkToken(user.accessToken);
      setLinkToken(data);
    } catch (err) {
      console.log('error', err);
    }
  }, [setLinkToken, user.accessToken]);

  useEffect(() => {
    if (linkToken == null && user) {
      createLinkToken();
    }
  }, [linkToken, createLinkToken, user]);

  return (
    <View style={styles.plaidButtonContainer}>
      <PlaidLink
        tokenConfig={{
          token: linkToken,
          noLoadingState: false,
        }}
        onSuccess={async success => {
          try {
            const data = await handleSetAccessToken(success.publicToken);
            const accessInformation = {
              accessToken: data.access_token,
              itemId: data.item_id,
            };
            // dispatch(plaidAction.getPlaidToken(accessInformation));
          } catch (err) {
            console.log(err);
          }
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
    </View>
  );
};

export default PlaidScreen;
