import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {HomeScreenRouteProp} from '../types';
import {State} from '../store/reducers';
import DashboardScreen from './Dashboard';
import {useNavigation} from '@react-navigation/native';
import {colorStyles} from '../constants';

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
              color={colorStyles.secondaryText}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
              color={colorStyles.mainText}
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
    backgroundColor: colorStyles.background,
    flex: 1,
    paddingVertical: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSection: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    backgroundColor: colorStyles.secondaryAccent,
    width: '30%',
    borderRadius: 5,
    paddingVertical: 5,
    margin: 10,
  },
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800',
    color: colorStyles.mainText,
  },
  appText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: colorStyles.minorAccent,
  },
});

export default HomeScreen;
