import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {DashboardScreenRouteProp} from '../types';

const DashboardScreen = ({route}: DashboardScreenRouteProp) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {userId} = route.params;
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#61dafb"
        // hidden={hidden}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text style={styles.appText}> Welcome User {userId}! </Text>
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
