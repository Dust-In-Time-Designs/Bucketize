import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {handleRegister} from '../services/userService';
import {CreateUser} from '../models/user';
import {colorStyles, styles} from '../styles';
import HorizontalRuleWithText from '../components/horizontalRule';
import {RegisterScreenRouteProp} from '../types';
import {useNavigation} from '@react-navigation/native';
import {State} from '../store/reducers';

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenRouteProp>();
  const {authUser} = useSelector((state: State) => state.auth);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [birthdaySelected, setBirthdaySelected] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [error, setError] = useState('');

  const getAuthUser = async () => {
    const jsonValue = await AsyncStorage.getItem(
      'sb-pkotgkvsnarjmufqcwxj-auth-token',
    );
    if (jsonValue != null) {
      console.log('already authenticated');
      navigation.navigate('Dashboard');
    }
  };

  const parseBirthday = (date: Date) => {
    const monthDay = date.toString().split(' ');
    return monthDay.slice(1, 4).join(' ');
  };

  const onSubmit = async () => {
    const user: CreateUser = {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthday,
      password,
    };
    const newUser = await handleRegister(user);
    if (newUser) {
      console.log(newUser);
    } else {
      setError('Please fill out all fields');
    }
  };

  useEffect(() => {
    getAuthUser();

    if (authUser) {
      navigation.replace('LoggedIn');
    }
  }, [navigation, authUser]);

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
