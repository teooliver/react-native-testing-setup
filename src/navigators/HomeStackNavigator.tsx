import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login/Login';
import { Register } from '../screens/Register/Register';
import { Welcome } from '../screens/Welcome/Welcome';
import { Home } from '../screens/Home/Home';
import { Details } from '../screens/Details/Details';

export const HomeStack = createStackNavigator<HomeStackParamList>();

export const AuthStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName='Home' headerMode='none'>
      <HomeStack.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <HomeStack.Screen
        name='Details'
        component={Details}
        options={{
          title: 'Movie Detail',
        }}
      />
    </HomeStack.Navigator>
  );
};
