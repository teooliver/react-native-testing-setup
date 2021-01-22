import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackNavigator } from '../src/navigators/AppStackNavigator';
import { AuthStackNavigator } from '../src/navigators/AuthStackNavigator';

import App from '../App';
import Test from '../src/screens/Test';
import { Home } from '../src/screens/Home/Home';
import { Details } from '../src/screens/Details/Details';
import { AuthProvider, AuthContext } from '../src/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

afterEach(() => {
  // console.log('AFFFFFFFTTTTTTTTTTTTTEEEREEERERRREREr');
});

beforeAll(() => {
  // console.log('HELLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOO');
  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

describe('Router', () => {
  it('Renders without crash', () => {
    const component = (
      <AuthContext.Provider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            {/* <AppStackNavigator /> */}
            <AuthStackNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </AuthContext.Provider>
    );

    const { getByText } = render(component);
    const screenTitle = getByText('Welcome');
    expect(screenTitle).toBeTruthy();
  });

  it('Renders Home without crashing', () => {
    const component = (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      </QueryClientProvider>
    );

    const { getByText } = render(component);
    const screenTitle = getByText('Home Screen');
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
          <AppStackNavigator />
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
    const navigate = jest.fn();
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
