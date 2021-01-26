import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Titles } from '../../../utils/types/titles';
import { FilterCarousel } from '../../components/FilterCarousel';
import { AuthContext } from '../../context/AuthContext';
import { useGetTitles } from '../../hooks/useGetTitles';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
}

// Possible type for state
// type titlesState =
//   | { idLoading: boolean, data: null }
//   | { isSuccess: true; data: Titles }
//   | { isError: boolean, data: null };

export const Home: FC<Props> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { data: titles, isSuccess, isLoading, isError } = useGetTitles();

  useEffect(() => {
    // runConsole('Hello');
  }, []);

  const runConsole = (log: string) => {
    console.log(log);
  };

  // console.log('From Login Test');

  return (
    <View style={styles.container} testID='Home'>
      <ScrollView>
        <Text>Home Screen</Text>
        <TextInput placeholder='Test Input' />

        {isLoading && <ActivityIndicator testID='Spinner' />}

        {/* {isSuccess &&
        titles?.Search.map((title) => (
          <Text key={title.imdbID}>{title.Title}</Text>
        ))} */}
        {isSuccess && titles?.Search && (
          <FilterCarousel movies={titles.Search} carouselTitle='Top 10 UK' />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='Most Recommended'
          />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='My Filter Name'
          />
        )}

        <Button
          title='Go to Details'
          onPress={() => navigation.navigate('Details', { itemId: 86 })}
        />
        <Button title='Logout' onPress={logout} />
      </ScrollView>
    </View>
  );
};
