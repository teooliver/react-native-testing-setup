import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login/Login';
import { Register } from '../screens/Register/Register';
import { Welcome } from '../screens/Welcome/Welcome';
import { Feed } from '../screens/Feed/Feed';
import { Details } from '../screens/Details/Details';

export type HomeStackParamList = {
  Feed: undefined;
  Details: { titleId: string };
};

export const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName='Feed' headerMode='none'>
      <HomeStack.Screen
        name='Feed'
        component={Feed}
        options={{
          title: 'Feed',
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
