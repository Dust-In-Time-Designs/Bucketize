import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {LoginScreenRouteProp} from '../types';
import {handleLogin} from '../services/userService';

const LoginScreen = ({navigation}: LoginScreenRouteProp) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    const user = await handleLogin(email, password);
    if (user) {
      navigation.navigate('Dashboard', {userId: user.user.id});
    } else {
      console.log('error');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#61dafb"
        // hidden={hidden}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="password"
            secureTextEntry={true}
          />
          <Button
            onPress={onSubmit}
            title="Register"
            color="#841584"
            accessibilityLabel="Register for Bucketize"
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
  input: {
    width: '50%',
  },
});

export default LoginScreen;
