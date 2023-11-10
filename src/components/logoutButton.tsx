import React from 'react';
import {Button, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, StackActions} from '@react-navigation/native';
import {handleLogout} from '../services/userService';
import {authAction} from '../store/actions';
import {colorStyles, styles} from '../styles';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onLogout = async () => {
    await handleLogout();
    dispatch(authAction.logoutUser());

    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <View style={styles.buttonContainerWide}>
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
