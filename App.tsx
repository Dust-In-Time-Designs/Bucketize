import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {RootStackParamList} from './src/types';
import {StatusBar, useColorScheme} from 'react-native';
import store from './src/store';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import WalletDetailsScreen from './src/screens/WalletDetails';
import PlaidScreen from './src/screens/Plaid';
import {accent1} from './src/constants';

export const RootStack = createStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#0c0e2c"
      />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: accent1,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
            }}
          />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Dashboard" component={DashboardScreen} />
          <RootStack.Screen name="Plaid" component={PlaidScreen} />
          <RootStack.Screen
            name="WalletDetails"
            component={WalletDetailsScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
