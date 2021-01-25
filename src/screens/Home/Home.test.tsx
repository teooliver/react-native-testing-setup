import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGetTitles } from '../../hooks/useGetTitles';
import { Home } from './Home';
import { mockData } from '../../../mocks/api/mockData';

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
  useGetTitles.mockImplementation(() => ({
    data: mockData,
    isLoading: false,
    isSuccess: true,
  }));

  const component = (
    // <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Home />
    </NavigationContainer>
    // </QueryClientProvider>
  );

  const { getByText, debug, findByText } = render(component);
  const screenTitle = getByText('Home Screen');
  expect(screenTitle).toBeTruthy();

  debug();
  const item = await findByText(
    /The Lord of the Rings: The Return of the King/i
  );
  expect(item).toBeTruthy();
});
