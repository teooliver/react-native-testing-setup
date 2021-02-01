import React from 'react';
import { Search } from '../screens/Search/Search';
import { Watchlist } from '../screens/Watchlist/Watchlist';
import { Profile } from '../screens/Profile/Profile';
import Feather from 'react-native-vector-icons/Feather';
import { HomeStackNavigator, HomeStackParamList } from './HomeStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

/*
Specifying undefined means that the route doesn't have params.
A union type with undefined (e.g. SomeType | undefined) means that params are optional.
*/
export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Profile: { userId: string };
  Watchlist: undefined;
  Search: undefined;
};

export const AppTabs = createMaterialTopTabNavigator<RootStackParamList>();

export const AppTabNavigator = () => {
  return (
    <AppTabs.Navigator
      initialRouteName='Home'
      tabBarPosition='bottom'
      tabBarOptions={{
        tabStyle: {
          backgroundColor: 'black',
        },
        activeTintColor: 'red',
        inactiveTintColor: 'white',
        style: { borderTopColor: 'black' },
        showIcon: true,
        labelStyle: {
          fontSize: 10,
        },
        pressOpacity: 1,
      }}
      swipeEnabled={false}
    >
      <AppTabs.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name='home' size={20} color={color} />
          ),
          tabBarTestID: 'home-tab',
        }}
      />

      <AppTabs.Screen
        name='Search'
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Feather name='search' size={20} color={color} />
          ),
          tabBarTestID: 'search-tab',
        }}
      />
      <AppTabs.Screen
        name='Watchlist'
        component={Watchlist}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: ({ color }) => (
            <Feather name='bookmark' size={20} color={color} />
          ),
          tabBarTestID: 'watchlist-tab',
        }}
      />
      <AppTabs.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name='user' size={20} color={color} />
          ),
          tabBarTestID: 'profile-tab',
        }}
      />
    </AppTabs.Navigator>
  );
};
