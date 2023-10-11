import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {State} from '../store/reducers';
import LogoutButton from '../components/logoutButton';
import {DashboardScreenRouteProp} from '../types';
import PlaidService from '../components/plaidLink';

const DashboardScreen = ({navigation}: DashboardScreenRouteProp) => {
  const {user} = useSelector((state: State) => state.auth);
  useEffect(() => {
    if (!user) {
      navigation.navigate('Home');
    }
  }, [user]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.appText}>
            {' '}
            {user && `Welcome ${user.firstName} ${user.lastName}!`}{' '}
          </Text>
          <PlaidService />
          <LogoutButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
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
