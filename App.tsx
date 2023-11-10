import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {RootStackParamList} from './src/types';
import {StatusBar} from 'react-native';
import {Ionicons} from 'react-native-vector-icons';
import store from './src/store';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import PlaidScreen from './src/screens/Plaid';
import {colorStyles} from './src/styles';
import TransactionsScreen from './src/screens/Transactions';

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
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        // options={{
        //   tabBarIcon: ({color, size}) => (
        //     <Ionicons name="ios-home" color={color} size={size} />
        //   ),
        // }}
      />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Plaid" component={PlaidScreen} />
          <RootStack.Screen name="LoggedIn" component={LoggedInTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
