import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {
  handleCreateLinkToken,
  handleRetrieveAccessToken,
  handleSetAccessToken,
} from '../services/plaidService'; // Import the necessary functions
import {PlaidScreenRouteProp, WalletDetails} from '../types';
import {State} from '../store/reducers';

const PlaidScreen = () => {
  const navigation: PlaidScreenRouteProp = useNavigation();
  const [linkToken, setLinkToken] = useState(null);
  const {user} = useSelector((state: State) => state.auth);
  const [walletDetails, setWalletDetails] = useState<WalletDetails>();

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
        navigation.navigate('WalletDetails', {
          accessToken: token[0].plaid_access_token,
          itemId: token[0].plaid_item_id,
        });
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
      <PlaidLink
        tokenConfig={{
          token: linkToken,
          noLoadingState: false,
        }}
        onSuccess={async success => {
          try {
            const data = await handleSetAccessToken(success.publicToken);
            console.log('response data: ', data, 'response data[0]: ', data[0]);
            setWalletDetails({
              accessToken: data[0].plaid_access_token,
              itemId: data[0].plaid_item_id,
            });
          } catch (err) {
            console.log(err);
          }
          navigation.navigate('WalletDetails', {
            accessToken: walletDetails.accessToken,
            itemId: walletDetails.itemId,
          });
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
