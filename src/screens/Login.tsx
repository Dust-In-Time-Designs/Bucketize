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
import {useDispatch} from 'react-redux';
import {LoginScreenRouteProp} from '../types';
import {handleLogin} from '../services/userService';
import {authAction} from '../store/actions';

const LoginScreen = ({navigation}: LoginScreenRouteProp) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    const user = await handleLogin(email, password);
    if (user) {
      dispatch(authAction.loginUser(user));
      navigation.navigate('Dashboard');
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
            title="Login"
            color="#841584"
            accessibilityLabel="Login"
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
