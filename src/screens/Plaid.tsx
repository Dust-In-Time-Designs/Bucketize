import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
import {useDispatch} from 'react-redux';
import {PlaidAuth} from '../models/user';
import {plaidAction} from '../store/actions';
import {API_URL} from '@env';
import {PlaidScreenRouteProp} from '../types';
import {useNavigation} from '@react-navigation/native';
import {colorStyles, styles} from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaidScreen = () => {
  const navigation: PlaidScreenRouteProp = useNavigation();
  const dispatch = useDispatch();
  const [linkToken, setLinkToken] = useState(null);

  const createLinkToken = useCallback(async () => {
    await fetch(`http://${API_URL}:8080/api/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setLinkToken(data.link_token);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setLinkToken]);

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken]);
  return (
    <View style={styles.plaidButtonContainer}>
      <PlaidLink
        tokenConfig={{
          token: linkToken,
          noLoadingState: false,
        }}
        onSuccess={async success => {
          await fetch(`http://${API_URL}:8080/api/set_access_token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({public_token: success.publicToken}),
          })
            .then(response => response.json())
            .then(data => {
              const accessInformation: PlaidAuth = {
                accessToken: data.access_token,
                itemId: data.item_id,
              };
              console.log(data);
              AsyncStorage.setItem()
              dispatch(plaidAction.getPlaidToken(accessInformation));
            })
            .catch(err => {
              console.log(err);
            });
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
