import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home/Home';
import { Details } from '../screens/Details/Details';
import { Search } from '../screens/Search/Search';
import { Watchlist } from '../screens/Watchlist/Watchlist';
import { Profile } from '../screens/Profile/Profile';
import Feather from 'react-native-vector-icons/Feather';

export const AppStack = createBottomTabNavigator<RootStackParamList>();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName='Home'>
      <AppStack.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name='home' size={20} />,
        }}
        bar-chart-2
      />
      {/* <AppStack.Screen
        name='Details'
        component={Details}
        // @ts-ignore
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({ color, size }) => (
            <Feather name='bar-chart-2' size={20} />
          ),
        }}
      /> */}
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
