import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {handleRegister} from '../services/userService';
import {CreateUser} from '../models/user';
import {colorStyles, styles} from '../styles';
import HorizontalRuleWithText from '../components/horizontalRule';
import {RegisterScreenRouteProp} from '../types';
import {useNavigation} from '@react-navigation/native';
import {authAction} from '../store/actions';
import {User} from '../models/user';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<RegisterScreenRouteProp>();
  const [authUser, setAuthUser] = useState<User | null>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [birthdaySelected, setBirthdaySelected] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const calculateAge = birthday => {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

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

  const parseBirthday = (date: Date) => {
    const monthDay = date.toString().split(' ');
    return monthDay.slice(1, 4).join(' ');
  };

  const onSubmit = async () => {
    setError('');
    if (!firstName.trim()) {
      setError('First Name is required.');
      return;
    }
    if (!lastName.trim()) {
      setError('Last Name is required.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setError('A valid Email is required.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!phoneNumber.trim()) {
      setError('Phone Number is required.');
      return;
    }
    if (calculateAge(new Date(birthday)) < 18) {
      setError('You must be at least 18 years old.');
      return;
    }

    const user: CreateUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthday,
      password,
    };
    const result = await handleRegister(user);

    if (result.user) {
      dispatch(authAction.loginUser(result.user));
      navigation.navigate('LoggedIn', {screen: 'Dashboard'});
    } else {
      setError(result.error);
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
      <Text style={styles.titleText}>Hey There!</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.inputShort}
          onChangeText={setFirstName}
          value={firstName}
          placeholder="First Name"
          placeholderTextColor={colorStyles.secondaryGreen}
        />
        <TextInput
          style={styles.inputShort}
          onChangeText={setLastName}
          value={lastName}
          placeholder="Last Name"
          placeholderTextColor={colorStyles.secondaryGreen}
        />
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.inputShort}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={colorStyles.secondaryGreen}
        />
        <TextInput
          style={styles.inputShort}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor={colorStyles.secondaryGreen}
        />
      </View>

      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        placeholderTextColor={colorStyles.secondaryGreen}
      />
      <TouchableOpacity
        onPress={() => setOpenDatePicker(true)}
        style={styles.input}>
        <Text style={styles.datePickerText}>
          {birthdaySelected ? parseBirthday(birthday) : 'Birthday'}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={openDatePicker}
        mode={'date'}
        date={birthday}
        onConfirm={date => {
          setOpenDatePicker(false);
          setBirthday(date);
          setBirthdaySelected(true);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
      <TouchableOpacity style={styles.buttonContainerWide} onPress={onSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <HorizontalRuleWithText text={'or'} />
      <TouchableOpacity
        style={styles.buttonContainerWideAlt}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonTextAlt}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
