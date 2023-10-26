import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
// import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {
  handleCreateLinkToken,
  handleSetAccessToken,
} from '../services/plaidService'; // Import the necessary functions
import {PlaidScreenRouteProp} from '../types';

const PlaidScreen = () => {
  const navigation: PlaidScreenRouteProp = useNavigation();
  const [linkToken, setLinkToken] = useState(null);
  // const {user} = useSelector(state => state.auth);

  const createLinkToken = useCallback(async () => {
    try {
      const data = await handleCreateLinkToken();
      console.log('Plaid line 21: ', data);
      setLinkToken(data.link_token);
    } catch (err) {
      console.log(err);
    }
  }, [setLinkToken]);

  useEffect(() => {
    console.log('linkToken: ', linkToken);
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken, createLinkToken]);

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
            console.log('storeToken response: ', accessInformation);
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
