import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoginScreenRouteProp} from '../types';
import {handleLogin} from '../services/userService';
import {authAction} from '../store/actions';
import {useNavigation} from '@react-navigation/native';
import {colorStyles, styles} from '../styles';
import HorizontalRuleWithText from '../components/horizontalRule';
import {State} from '../store/reducers';
import {User} from '../models/user';


const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenRouteProp>();
  const [authUser, setAuthUser] = useState<User | null>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const getAuthUser = async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    const userData = JSON.parse(jsonValue);
    if (jsonValue != null) {
      const user = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        birthday: userData.birthday,
        accessToken: userData.access_token,
      };
      setAuthUser(user);
      dispatch(authAction.loginUser(user));
      navigation.navigate('LoggedIn', {screen: 'Dashboard'});
    }
  };

  const onSubmit = async () => {
    const user = await handleLogin(email, password);
    if (user) {
      dispatch(authAction.loginUser(user));
      navigation.navigate('LoggedIn', {screen: 'Dashboard'});
    } else {
      setError('Invalid Credentials');
    }
  };

  useEffect(() => {
    getAuthUser();
    if (authUser) {
      navigation.navigate('LoggedIn', {screen: 'Dashboard'});
    }
  }, [navigation]);

  return (
    <View style={styles.screenContainerLight}>
      <Text style={styles.titleText}>Welcome Back!</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor={colorStyles.secondaryGreen}
        keyboardType="email-address"
        secureTextEntry={false}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor={colorStyles.secondaryGreen}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.buttonContainerWide} onPress={onSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <HorizontalRuleWithText text={'or'} />
      <TouchableOpacity
        style={styles.buttonContainerWideAlt}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonTextAlt}>Register for Bucketize</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
