// @ts-nocheck

import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppTabNavigator } from './src/navigators/AppTabNavigator';
import { AuthStackNavigator } from './src/navigators/AuthStackNavigator';
import { Details } from './src/screens/Details/Details';
import { AuthProvider } from './src/context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes } from './src/routes/Routes';
import { useGetTitles } from './src/hooks/useGetTitles';
import { mockData } from './mocks/api/mockData';
import { IMockUseGetTitles } from './mocks/types/IMockUseGetTitles.ts';
import App from './App';
import { AuthContext } from './src/context/AuthContext';

const queryClient = new QueryClient();

afterEach(cleanup);

jest.mock('./src/hooks/useGetTitles.tsx');

beforeAll(() => {
  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

it('Renders without crash', async () => {
  const component = (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );

  const { getByText } = render(component);

  await waitFor(() => getByText('Welcome'));
  // waitFor( const screenTitle = await queryByText('Welcome'));

  // expect(screenTitle).toBeTruthy();
});

it('Navigates from Home to Search on tab button press', async () => {
  useGetTitles.mockImplementation(
    (): IMockUseGetTitles => ({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
    })
  );

  const component = (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user: 'test-user' }}>
        <NavigationContainer>
          <AppTabNavigator />
        </NavigationContainer>
      </AuthContext.Provider>
    </QueryClientProvider>
  );

  const { getByTestId, getByText, debug } = render(component);

  // const navigationBtn = await getByText('search-tab');

  debug();
  // await waitFor(() => getByTestId('search-tab'));

  // fireEvent(navigationBtn, 'press');
  // const newHeader = getByText('Search');
  // expect(newHeader).toBeTruthy();
});

it.skip('Calls navigation with the Home args', () => {
  const navigate = jest.fn(() => {});
  const component = (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Details navigation={{ navigate }} route={{ params: { itemId: 86 } }} />
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
