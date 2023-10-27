import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Button, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoginScreenRouteProp} from '../types';
import {handleLogin} from '../services/userService';
import {authAction} from '../store/actions';
import {useNavigation} from '@react-navigation/native';
import {colorStyles, styles} from '../styles';
import HorizontalRuleWithText from '../components/horizontalRule';
import {State} from '../store/reducers';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenRouteProp>();
  const {authUser} = useSelector((state: State) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async () => {
    const user = await handleLogin(email, password);
    if (user) {
      dispatch(authAction.loginUser(user));
      navigation.navigate('Dashboard');
    } else {
      setError('Invalid Credentials');
    }
  };

  useEffect(() => {
    if (authUser) {
      navigation.navigate('Dashboard');
    }
  }, [navigation, authUser]);

  return (
    <View style={styles.screenContainerLight}>
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
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
      <View style={styles.buttonContainerWide}>
        <Button
          onPress={onSubmit}
          title="Login"
          color={colorStyles.secondaryText}
          accessibilityLabel="Login for Bucketize"
        />
      </View>
      <HorizontalRuleWithText text={'or'} />
      <View style={styles.buttonContainerWideAlt}>
        <Button
          onPress={() => navigation.navigate('Register')}
          title="Register"
          color={colorStyles.secondaryAccent}
          accessibilityLabel="Register for Bucketize"
        />
      </View>
    </View>
  );
};

export default LoginScreen;
