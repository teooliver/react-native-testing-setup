import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Search } from '../screens/Search/Search';
import { Watchlist } from '../screens/Watchlist/Watchlist';
import { Profile } from '../screens/Profile/Profile';
import Feather from 'react-native-vector-icons/Feather';
import { HomeStackNavigator } from './HomeStackNavigator';

/* 
Specifying undefined means that the route doesn't have params. 
A union type with undefined (e.g. SomeType | undefined) means that params are optional.
*/
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Watchlist: undefined;
  Search: undefined;
};

export const AppStack = createBottomTabNavigator<RootStackParamList>();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName='Home'>
      <AppStack.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name='home' size={20} />,
        }}
        bar-chart-2
      />

      <AppStack.Screen
        name='Search'
        component={Search}
        // @ts-ignore
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => <Feather name='search' size={20} />,
        }}
      />
      <AppStack.Screen
        name='Watchlist'
        component={Watchlist}
        // @ts-ignore
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: ({ color, size }) => (
            <Feather name='bookmark' size={20} />
          ),
        }}
      />
      <AppStack.Screen
        name='Profile'
        component={Profile}
        // @ts-ignore
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <Feather name='user' size={20} />,
        }}
      />
    </AppStack.Navigator>
  );
};
