import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feed } from '../screens/Feed/Feed';
import { Details } from '../screens/Details/Details';
import { CarouselGrid } from '../screens/CarouselGrid/CarouselGrid';

export type HomeStackParamList = {
  Feed: undefined;
  Details: { titleId: string };
  CarouselGrid: { carouselId: string };
};

export const HomeStack = createStackNavigator<HomeStackParamList>();

// createMaterialTopTabNavigator doesnt have types at the moment
export const HomeStackNavigator = ({ navigation }: any) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e: any) => {
      // Prevent default behavior
      e.preventDefault();
      // Do something manually
      navigation.navigate('Feed');
      // ...
    });

    return unsubscribe;
  }, [navigation]);
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
      <HomeStack.Screen
        name='CarouselGrid'
        component={CarouselGrid}
        options={{
          title: 'CarouselGrid',
        }}
      />
    </HomeStack.Navigator>
  );
};
