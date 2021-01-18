import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackNavigator } from './src/navigators/AppStackNavigator';

import App from './App';
import Test from './src/screens/Test';
import { Home } from './src/screens/Home/Home';
import { Details } from './src/screens/Details/Details';

describe('Router', () => {
  it('Renders without crash', () => {
    const component = (
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    );

    const { getByText } = render(component);
    const screenTitle = getByText('Home Screen');
    expect(screenTitle).toBeTruthy();
  });

  it('Renders Home without crashing', () => {
    const component = (
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );

    const { getByText } = render(component);
    const screenTitle = getByText('Home Screen');
    expect(screenTitle).toBeTruthy();
  });

  it('Renders Detail without crashing', () => {
    const component = (
      <NavigationContainer>
        <Details route={{ params: { itemId: 86 } }} />
      </NavigationContainer>
    );

    const { getByText } = render(component);
    const screenTitle = getByText('Details Screen');
    const itemId = getByText('ItemID: 86');

    expect(screenTitle).toBeTruthy();
    expect(itemId).toBeTruthy();
  });

  it('Navigates from Home to Details on button press', () => {
    const component = (
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    );

    const { getByText } = render(component);
    const navigationBtn = getByText('Go to Details');

    fireEvent(navigationBtn, 'press');
    const newHeader = getByText('Details Screen');
    expect(newHeader).toBeTruthy();
  });
});
