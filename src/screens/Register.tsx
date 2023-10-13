import React, {useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {handleRegister} from '../services/userService';
import {CreateUser} from '../models/user';
import {colorStyles, styles} from '../styles';
import HorizontalRuleWithText from '../components/horizontalRule';
import {RegisterScreenRouteProp} from '../types';
import {useNavigation} from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenRouteProp>();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [birthdaySelected, setBirthdaySelected] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <View style={styles.screenContainerLight}>
      <View>
        <Text style={styles.appTitleText}>Hey There!</Text>
      </View>
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
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
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => setOpenDatePicker(true)}
          style={styles.dateContainer}>
          <TextInput
            pointerEvents="none"
            style={styles.input}
            value={birthdaySelected ? parseBirthday(birthday) : ''}
            editable={false}
            placeholder={
              !birthdaySelected ? 'Birthday' : parseBirthday(birthday)
            }
          />
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
      </View>
      <View style={styles.buttonContainerWide}>
        <Button
          onPress={onSubmit}
          title="Register"
          color={colorStyles.secondaryText}
          accessibilityLabel="Register for Bucketize"
        />
      </View>
      <HorizontalRuleWithText text={'or'} />
      <View style={styles.buttonContainerWideAlt}>
        <Button
          onPress={() => navigation.navigate('Login')}
          title="Login"
          color={colorStyles.secondaryAccent}
          accessibilityLabel="Login to Bucketize"
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
