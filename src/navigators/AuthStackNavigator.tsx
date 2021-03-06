import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login/Login';
import { Register } from '../screens/Register/Register';
import { Welcome } from '../screens/Welcome/Welcome';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName='Welcome' headerMode='none'>
      <AuthStack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          title: 'Welcome',
        }}
      />
      <AuthStack.Screen
        name='Login'
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <AuthStack.Screen
        name='Register'
        component={Register}
        options={{
          title: 'Register',
        }}
      />
    </AuthStack.Navigator>
  );
};
