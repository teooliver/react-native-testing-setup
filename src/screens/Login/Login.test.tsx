import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigator } from '../../navigators/AuthStackNavigator';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import Routes from '../../routes/Routes';

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

describe('Login Screen', () => {
  afterEach(cleanup);
  it('Can login', async () => {
    const component = (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </QueryClientProvider>
    );

    const { getByText, getByTestId, findByText, debug } = render(component);
    const screenTitle = await findByText('Welcome');
    expect(screenTitle).toBeTruthy();

    const signInBtn = getByText('Sign In');
    fireEvent(signInBtn, 'press');

    const newHeader = await findByText('Login');
    expect(newHeader).toBeTruthy();

    const loginBtn = getByText('Log In');
    await act(async () => {
      fireEvent(loginBtn, 'press');
    });

    debug();
    await waitFor(() => expect(getByTestId('Home')).toBeTruthy());
  });
});
