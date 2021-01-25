import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home/Home';
import { Details } from '../screens/Details/Details';

export const AppStack = createBottomTabNavigator<RootStackParamList>();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName='Home'>
      <AppStack.Screen
        name='Home'
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <AppStack.Screen
        name='Details'
        component={Details}
        // @ts-ignore
        options={({ route }) => ({ title: route.params?.itemId })}
      />
    </AppStack.Navigator>
  );
};
