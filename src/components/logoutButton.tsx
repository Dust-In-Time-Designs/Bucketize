import React from 'react';
import {Button, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleLogout} from '../services/userService';
import {authAction} from '../store/actions';
import {colorStyles, styles } from '../styles';
const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    const user = await handleLogout();
    if (user) {
      dispatch(authAction.logoutUser());
    } else {
      console.log('error');
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={onLogout}
        title="Logout"
        color={colorStyles.mainText}
        accessibilityLabel="Logout"
      />
    </View>
  );
};

export default LogoutButton;
