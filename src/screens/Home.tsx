import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {HomeScreenRouteProp} from '../types';
import {State} from '../store/reducers';
import DashboardScreen from './Dashboard';
import {useNavigation} from '@react-navigation/native';
import {accent1, light} from '../constants';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenRouteProp>();
  const {user} = useSelector((state: State) => state.auth);
  return (
    <View style={styles.homeContainer}>
      <View style={[styles.appTitleView]}>
        <Text style={styles.appTitleText}> Bucketize </Text>
      </View>
      {!user ? (
        <View style={styles.buttonSection}>
          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
              color={accent1}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
              color={accent1}
            />
          </View>
        </View>
      ) : (
        <DashboardScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: accent1,
    flex: 1,
    paddingVertical: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSection: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: light,
    width: '20%',
    borderRadius: 5,
    paddingVertical: 5,
    marginVertical: 10,
  },
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
    color: light,
  },
  appText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: light,
  },
});

export default HomeScreen;
