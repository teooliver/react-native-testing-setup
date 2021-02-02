import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from '@testing-library/react-native';
import { AuthProvider } from '../../context/AuthContext';
import Routes from '../../routes/Routes';
import { useGetTitles } from '../../hooks/useGetTitles';
import { IMockUseGetTitles } from '../../../mocks/types/IMockUseGetTitles';

jest.mock('../../hooks/useGetTitles.tsx');

afterEach(cleanup);

beforeAll(() => {
  jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  jest.spyOn(global.console, 'error').mockImplementation(() => {});
});

// describe('Login Screen', () => {
// afterEach(cleanup);
it('Can login with valid email and password', async () => {
  // @ts-ignore
  useGetTitles.mockImplementation(
    (): IMockUseGetTitles => ({
      data: {},
      isLoading: true,
      isSuccess: false,
      isError: false,
    })
  );

  const component = (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );

  const { getByText, getByTestId, findByText, debug } = render(component);
  const screenTitle = await findByText('Welcome');
  expect(screenTitle).toBeTruthy();

  const signInBtn = getByText('Sign In');
  fireEvent(signInBtn, 'press');

  const newHeader = await findByText('Login');
  expect(newHeader).toBeTruthy();

  const emailInput = getByTestId('emailInput');
  const passwordInput = getByTestId('passwordInput');

  fireEvent.changeText(emailInput, 'teo@test.com');
  fireEvent.changeText(passwordInput, '123qweasd');

  const loginBtn = getByText('Log In');
  expect(loginBtn).toBeTruthy();

  // debug();
  await act(async () => {
    fireEvent(loginBtn, 'press');
  });
  // fireEvent(loginBtn, 'press');

  // await waitFor(() => expect(getByTestId('Home')).toBeTruthy());
});

it('Shows error message when validation fail', async () => {
  // @ts-ignore

  const component = (
    // <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    // </QueryClientProvider>
  );

  const { getByText, getByTestId, findByText, queryByTestId } = render(
    component
  );
  const screenTitle = await findByText('Welcome');
  expect(screenTitle).toBeTruthy();

  const signInBtn = getByText('Sign In');
  fireEvent(signInBtn, 'press');

  const newHeader = await findByText('Login');
  expect(newHeader).toBeTruthy();

  const emailInput = getByTestId('emailInput');
  const passwordInput = getByTestId('passwordInput');

  fireEvent.changeText(emailInput, 'teo');
  fireEvent.changeText(passwordInput, '123');

  const emailValidation = await findByText(
    /Username must be 4 characters long/i
  );
  const passwordValidation = await findByText(
    /Password must be 8 characters long/i
  );

  expect(emailValidation).toBeTruthy();
  expect(passwordValidation).toBeTruthy();

  const loginBtn = getByText('Log In');
  await act(async () => {
    fireEvent(loginBtn, 'press');
  });

  // debug();
  await waitFor(() => expect(queryByTestId('Home')).not.toBeTruthy());
});
// });
