import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Titles } from '../../../utils/types/titles';
import { FilterCarousel } from '../../components/FilterCarousel/FilterCarousel';
import { AuthContext } from '../../context/AuthContext';
import { useGetTitles } from '../../hooks/useGetTitles';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'Feed'>;
  route: RouteProp<HomeStackParamList, 'Feed'>;
}

// Possible type for state
// type titlesState =
//   | { idLoading: boolean, data: null }
//   | { isSuccess: true; data: Titles }
//   | { isError: boolean, data: null };

export const Feed: FC<Props> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { data: titles, isSuccess, isLoading, isError } = useGetTitles();

  return (
    <View style={styles.container} testID='Home'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Home Screen</Text>

        {isLoading && <ActivityIndicator testID='Spinner' />}

        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='Top 10 UK'
            navigation={navigation}
          />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='Most Recommended'
            navigation={navigation}
          />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='My Filter Name'
            navigation={navigation}
          />
        )}

        {/* <Button
          title='Go to Details'
          onPress={() => navigation.navigate('Details', { itemId: 86 })}
        /> */}
        <Button title='Logout' onPress={logout} />
      </ScrollView>
    </View>
  );
};
