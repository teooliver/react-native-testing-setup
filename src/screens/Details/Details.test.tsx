import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGetTitleById } from '../../hooks/useGetTitleById';
import { mockData } from '../../../mocks/api/mockData';
import { IMockUseGetTitles } from '../../../mocks/types/IMockUseGetTitles';
import { Feed } from '../Feed/Feed';
import { Details } from './Details';
import { Host, Portal } from 'react-native-portalize';

jest.mock('../../hooks/useGetTitleById.tsx');

it('Renders Title Details Screen without crashing', async () => {
  // @ts-ignore
  useGetTitleById.mockImplementation(
    (): IMockUseGetTitles => ({
      data: mockData.Search[0],
      isLoading: false,
      isSuccess: true,
      isError: false,
    })
  );

  const component = (
    <NavigationContainer>
      <Host>
        <Details route={{ params: { titleId: 'tt0167260' } }} />
      </Host>
    </NavigationContainer>
  );

  const { getByText } = render(component);
  const screenTitle = getByText(
    /The Lord of the Rings: The Return of the King/i
  );
  expect(screenTitle).toBeTruthy();
});

it('Shows spinner while loading title', async () => {
  // @ts-ignore
  useGetTitleById.mockImplementation(
    (): IMockUseGetTitles => ({
      data: mockData.Search[0],
      isLoading: true,
      isSuccess: false,
      isError: false,
    })
  );

  const component = (
    <NavigationContainer>
      <Host>
        <Details route={{ params: { titleId: 'tt0167260' } }} />
      </Host>
    </NavigationContainer>
  );

  const { getByTestId } = render(component);

  const spinner = await getByTestId('Spinner');
  expect(spinner).toBeTruthy();
});

it('Should open share title modal', async () => {
  // @ts-ignore
  useGetTitleById.mockImplementation(
    (): IMockUseGetTitles => ({
      data: mockData.Search[0],
      isLoading: false,
      isSuccess: true,
      isError: false,
    })
  );

  const component = (
    <NavigationContainer>
      <Host>
        <Details route={{ params: { titleId: 'tt0167260' } }} />
      </Host>
    </NavigationContainer>
  );

  const { getByTestId, getByText } = render(component);

  const shareModal = await getByTestId('share-icon');
  fireEvent(shareModal, 'press');

  const modal = getByText(/modal/i);

  expect(modal).toBeTruthy();
});
