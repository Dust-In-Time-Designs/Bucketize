import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {RootStackParamList} from './src/types';
import {StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store from './src/store';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import DashboardScreen from './src/screens/Dashboard';
import PlaidScreen from './src/screens/Plaid';
import {colorStyles} from './src/styles';
import TransactionsScreen from './src/screens/Transactions';
import BudgetScreen from './src/screens/Budget';
import CreateBudgetScreen from './src/screens/CreateBudget';

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
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          tabBarLabel: 'Budget',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="wallet" color={color} size={size} />
          ),
        }}
      />
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
          <RootStack.Screen
            name="CreateBudget"
            component={CreateBudgetScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
