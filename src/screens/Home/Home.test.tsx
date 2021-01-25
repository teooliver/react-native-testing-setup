import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGetTitles } from '../../hooks/useGetTitles';
import { Home } from './Home';
import { mockData } from '../../../mocks/api/mockData';
import { IMockUseGetTitles } from '../../../mocks/types/IMockUseGetTitles';

// const mockedUseGetTitles = useGetTitles as jest.Mock;

const queryClient = new QueryClient();

// jest.mock('../../hooks/useGetTitles', () => ({
//   useGetTitles: jest.fn(),
// }));

// beforeEach(() => {
//   // @ts-ignore
//   useGetTitles.mockImplementation(() => ({ data: mockData }));
// });

jest.mock('../../hooks/useGetTitles.tsx');
// const mockUseGetTitles = useGetTitles as jest.Mock;

it('Renders Home without crashing', async () => {
  // @ts-ignore
  useGetTitles.mockImplementation(
    (): IMockUseGetTitles => ({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
    })
  );

  const component = (
    // <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Home />
    </NavigationContainer>
    // </QueryClientProvider>
  );

  const { getByText, findByText } = render(component);
  const screenTitle = getByText('Home Screen');
  expect(screenTitle).toBeTruthy();

  const item = await findByText(
    /The Lord of the Rings: The Return of the King/i
  );
  expect(item).toBeTruthy();
});

it('Shows spinner while loading', async () => {
  // @ts-ignore
  useGetTitles.mockImplementation(
    (): IMockUseGetTitles => ({
      data: mockData,
      isLoading: true,
      isSuccess: false,
      isError: false,
    })
  );

  const component = (
    // <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Home />
    </NavigationContainer>
    // </QueryClientProvider>
  );

  const { getByText, getByTestId } = render(component);
  const screenTitle = getByText('Home Screen');
  expect(screenTitle).toBeTruthy();

  const spinner = await getByTestId('Spinner');
  expect(spinner).toBeTruthy();
});
