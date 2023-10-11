import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {HomeScreenRouteProp} from '../types';
import {State} from '../store/reducers';
import DashboardScreen from './Dashboard';

const HomeScreen = ({navigation}: HomeScreenRouteProp) => {
  const {user} = useSelector((state: State) => state.auth);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> Bucketize </Text>
        </View>
        {!user ? (
          <View>
            <Text style={styles.appText}> Welcome! </Text>
            <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
            />
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        ) : (
          <DashboardScreen />
        )}
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
});

export default HomeScreen;
