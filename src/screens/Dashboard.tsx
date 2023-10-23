import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Button, Text, View} from 'react-native';
import {State} from '../store/reducers';
import LogoutButton from '../components/logoutButton';
import {DashboardScreenRouteProp} from '../types';
import PlaidScreen from './Plaid';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {appInfo, getAccount, loginUser} from '../services/accountService';

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenRouteProp>();
  const {user} = useSelector((state: State) => state.auth);
  const {plaid} = useSelector((state: State) => state.plaid);
  console.log(plaid);

  const onSubmit = async () => {
    await getAccount(
      {
        created_at: new Date(),
        user_id: user.id,
      },
      user.accessToken,
    );
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
