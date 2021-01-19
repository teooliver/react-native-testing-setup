import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login/Login';
import { Register } from '../screens/Register/Register';

export const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
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
