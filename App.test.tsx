// @ts-nocheck

import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabNavigator } from './src/navigators/AppTabNavigator';
import { AuthStackNavigator } from './src/navigators/AuthStackNavigator';
import { Details } from './src/screens/Details/Details';
import { AuthProvider } from './src/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

afterEach(() => {});

beforeAll(() => {
  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

describe('Router', () => {
  afterEach(cleanup);
  it('Renders without crash', () => {
    const component = (
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {/* <AppStackNavigator /> */}
            <AuthStackNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </AuthProvider>
    );

    const { getByText } = render(component);
    const screenTitle = getByText('Welcome');
    expect(screenTitle).toBeTruthy();
  });

  it('Renders Detail without crashing', () => {
    const component = (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Details route={{ params: { itemId: 86 } }} />
        </NavigationContainer>
      </QueryClientProvider>
    );

    const { getByText } = render(component);
    const screenTitle = getByText('Details Screen');
    const itemId = getByText('ItemID: 86');

    expect(screenTitle).toBeTruthy();
    expect(itemId).toBeTruthy();
  });

  it('Navigates from Home to Details on button press', () => {
    const component = (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppTabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    );

    const { getByText } = render(component);
    const navigationBtn = getByText('Go to Details');

    fireEvent(navigationBtn, 'press');
    const newHeader = getByText('Details Screen');
    expect(newHeader).toBeTruthy();
  });

  it('Calls navigation with the Home args', () => {
    const navigate = jest.fn(() => {});
    const component = (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Details
            navigation={{ navigate }}
            route={{ params: { itemId: 86 } }}
          />
        </NavigationContainer>
      </QueryClientProvider>
    );

    const { getByText } = render(component);
    const navigationBtn = getByText('Go to Details... again');

    fireEvent(navigationBtn, 'press');
    expect(navigate).toHaveBeenCalledWith('Details');
    const newHeader = getByText('Details Screen 2');
    expect(newHeader).toBeTruthy();
  });
});
