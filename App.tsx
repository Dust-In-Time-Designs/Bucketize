import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
const Tab = createBottomTabNavigator();

function LoggedInTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colorStyles.secondaryGreen,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colorStyles.textOnSecondary,
        },
      }}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="WalletDetails" component={WalletDetailsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Register"
          screenOptions={{
            headerStyle: {
              backgroundColor: colorStyles.textOnSecondary,
            },
            headerTintColor: colorStyles.secondaryGreen,
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
          {/* <RootStack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          /> */}
          <RootStack.Screen
            name="Plaid"
            component={PlaidScreen}
            options={{
              title: '',
            }}
          />
          {/* <RootStack.Screen
            name="WalletDetails"
            component={WalletDetailsScreen}
            initialParams={{accessToken: undefined, itemId: undefined}}
          /> */}
          <RootStack.Screen
            name="LoggedIn"
            component={LoggedInTabs}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
