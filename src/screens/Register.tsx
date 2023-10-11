import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
// import {RegisterScreenRouteProp} from '../types';
import {handleRegister} from '../services/userService';
import {CreateUser} from '../models/user';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

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
      console.log('error');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
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
            placeholder="password"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
          <View>
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <TextInput
                pointerEvents="none"
                style={styles.input}
                value={parseBirthday(birthday)}
                editable={false}
                placeholder={parseBirthday(birthday)}
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
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
          </View>
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

export default RegisterScreen;
