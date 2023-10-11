import React from 'react';
import {Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {handleLogout} from '../services/userService';
import {authAction} from '../store/actions';

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
    <Button
      onPress={onLogout}
      title="Logout"
      color="#841584"
      accessibilityLabel="Logout"
    />
  );
};

export default LogoutButton;
