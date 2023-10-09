import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './src/types';
import HomeScreen from './src/screens/Home';
import RegisterScreen from './src/screens/Register';

const RootStack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
