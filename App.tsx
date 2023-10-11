import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {RootStackParamList} from './src/types';
import store from './src/store';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';

const RootStack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Dashboard" component={DashboardScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
