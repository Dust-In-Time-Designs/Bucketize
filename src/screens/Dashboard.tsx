import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {State} from '../store/reducers';
import LogoutButton from '../components/logoutButton';
import {DashboardScreenRouteProp} from '../types';
import PlaidScreen from './Plaid';
import {useNavigation} from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardScreenRouteProp>();
  const {user} = useSelector((state: State) => state.auth);
  useEffect(() => {
    if (!user) {
      navigation.navigate('Home');
    }
  }, [navigation, user]);

  return (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>
        {' '}
        {user && `Welcome ${user.firstName} ${user.lastName}!`}{' '}
      </Text>
      <PlaidScreen />
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    height: 100,
    backgroundColor: '#fcfcf9',
  },
  dashboardTitle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
  },
  appText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    width: '50%',
  },
});

export default DashboardScreen;
