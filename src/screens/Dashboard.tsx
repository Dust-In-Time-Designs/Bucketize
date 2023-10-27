import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Button, Text, View} from 'react-native';
import {State} from '../store/reducers';
import LogoutButton from '../components/logoutButton';
import {DashboardScreenRouteProp} from '../types';
import PlaidScreen from './Plaid';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../styles';
import {getAccount, updatePlaidToken} from '../services/accountService';

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenRouteProp>();
  const {user} = useSelector((state: State) => state.auth);
  const {plaid} = useSelector((state: State) => state.plaid);

  const onSubmit = async () => {
    // const dbUser = await getAccount({
    //   created_at: new Date(),
    //   user_id: user.id,
    // });
    const dbUser = await updatePlaidToken('newplaidtoken');
    console.log('dbUser: ', dbUser);
  };
  console.log(user)

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
