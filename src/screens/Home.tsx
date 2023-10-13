import React from 'react';
import {Button, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {HomeScreenRouteProp} from '../types';
import {State} from '../store/reducers';
import DashboardScreen from './Dashboard';
import {useNavigation} from '@react-navigation/native';
import {colorStyles, styles} from '../styles';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenRouteProp>();
  const {user} = useSelector((state: State) => state.auth);
  return (
    <View style={styles.screenContainer}>
      <View style={[styles.appTitleView]}>
        <Text style={styles.appTitleText}> Bucketize </Text>
      </View>
      {!user ? (
        <View style={styles.buttonSection}>
          <View style={styles.buttonContainerWide}>
            <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
              color={colorStyles.secondaryText}
            />
          </View>
          <View style={styles.buttonContainerWide}>
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

export default HomeScreen;
