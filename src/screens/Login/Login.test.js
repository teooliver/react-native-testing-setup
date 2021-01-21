import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigator } from '../../navigators/AuthStackNavigator';
import { AuthContext, AuthProvider } from '../../context/AuthContext';
import Routes from '../../routes/Routes';

// cleanup before test?
//  act(() => {
//         /* fire events that update state */
//       });
//       /* assert on the output */

describe('Login Screen', () => {
  it('Login', async () => {
    const component = (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );

    const { getByText, getByTestId } = render(component);
    const screenTitle = getByText('Welcome');
    expect(screenTitle).toBeTruthy();

    const signInBtn = getByText('Sign In');
    fireEvent(signInBtn, 'press');

    const newHeader = getByText('Login');
    expect(newHeader).toBeTruthy();

    const loginBtn = getByText('Log In');
    act(() => {
      /* fire events that update state */
      fireEvent(loginBtn, 'press');
    });

    // await waitFor(() => expect(getByTestId('Home')).toBeTruthy());
  });
});
