import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {State} from '../store/reducers';
import LogoutButton from '../components/logoutButton';
import {DashboardScreenRouteProp} from '../types';

const DashboardScreen = ({navigation}: DashboardScreenRouteProp) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {user} = useSelector((state: State) => state.auth);
  useEffect(() => {
    if (!user) {
      navigation.navigate('Home');
    }
  }, [user]);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#61dafb"
        // hidden={hidden}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.appText}>
            {' '}
            {user && `Welcome ${user.firstName} ${user.lastName}!`}{' '}
          </Text>
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
