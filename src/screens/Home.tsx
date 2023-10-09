import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {HomeScreenRouteProp} from '../types';

const HomeScreen = ({navigation}: HomeScreenRouteProp) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> Bucketize </Text>
        </View>

        <View>
          <Text style={styles.appText}> Welcome! </Text>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
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
});

export default HomeScreen;
