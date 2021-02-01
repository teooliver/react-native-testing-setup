import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const Feed: FC<Props> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { data: titles, isSuccess, isLoading } = useGetTitles();

  // Animation
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  return (
    <View style={styles.container} testID='Home'>
      <AnimatedScrollView
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={16}
        onScroll={onScroll}
        // {...{ onScroll }}
      >
        <Text>Home Screen</Text>

        {isLoading && <ActivityIndicator testID='Spinner' />}

        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='Top 10 UK'
            navigation={navigation}
            y={y}
            index={0}
          />
        )}
        {/* {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='Most Recommended'
            navigation={navigation}
            y={y}
            index={1}
          />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='My Filter Name'
            navigation={navigation}
            y={y}
            index={2}
          />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='My Filter Name'
            navigation={navigation}
            y={y}
            index={3}
          />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='My Filter Name'
            navigation={navigation}
            y={y}
            index={4}
          />
        )}
        {isSuccess && titles?.Search && (
          <FilterCarousel
            movies={titles.Search}
            carouselTitle='My Filter Name'
            navigation={navigation}
            y={y}
            index={5}
          />
        )} */}

        {/* <Button
          title='Go to Details'
          onPress={() => navigation.navigate('Details', { itemId: 86 })}
        /> */}
        <Button title='Logout' onPress={logout} />
      </AnimatedScrollView>
    </View>
  );
};
