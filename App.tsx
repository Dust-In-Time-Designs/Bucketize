import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {RootStackParamList} from './src/types';
import {StatusBar} from 'react-native';
import store from './src/store';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import WalletDetailsScreen from './src/screens/WalletDetails';
import PlaidScreen from './src/screens/Plaid';
import {colorStyles} from './src/styles';

export const RootStack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Register"
          screenOptions={{
            headerStyle: {
              backgroundColor: colorStyles.mainAccent,
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
          <RootStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: '',
            }}
          />
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: '',
            }}
          />
          <RootStack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Plaid"
            component={PlaidScreen}
            options={{
              title: '',
            }}
          />
          <RootStack.Screen
            name="WalletDetails"
            component={WalletDetailsScreen}
            initialParams={{accessToken: undefined, itemId: undefined}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
