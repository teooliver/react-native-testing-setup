import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { colors } from '../../../utils/design/colors';
import { Title } from '../../../utils/types/titles';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';

interface Props {
  y: Animated.Value;
  movies: Title[];
  carouselTitle: string;
  navigation: StackNavigationProp<HomeStackParamList, 'Feed'>;
  index: number;
  // route: RouteProp<RootStackParamList, 'Home'>;
}

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_WIDTH = width * 0.72;
const CAROUSEL_HEIGHT = height / 2;

export const FilterCarousel: React.FC<Props> = ({
  movies,
  carouselTitle,
  navigation,
  y,
  index,
}) => {
  const handlePosterClick = (titleId: string) => {
    console.log(titleId);
    navigation.navigate('Details', { titleId: titleId });
  };

  const handleCarouselTitleClick = (carouselId: string) => {
    navigation.navigate('CarouselGrid', { carouselId: carouselId });
  };

  /* 
  Animation based on
  https://www.youtube.com/watch?v=NiFdK-s6OP8
  
  */

  const position = Animated.subtract(index * CAROUSEL_HEIGHT, y);
  const isDisappearing = -CAROUSEL_HEIGHT;
  const isTop = 0;
  const isBottom = height - CAROUSEL_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    y,
    y.interpolate({
      inputRange: [0, 0.00001 + index * CAROUSEL_HEIGHT],
      outputRange: [0, -index * CAROUSEL_HEIGHT],
      extrapolateRight: 'clamp',
    })
  );

  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });

  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return (
    <Animated.View
      style={{
        backgroundColor: colors.carouselBgColor,
        marginVertical: 20,
        borderRadius: 10,
        transform: [{ translateY: translateY }, { scale }],
        opacity,
      }}
    >
      <TouchableOpacity onPress={() => handleCarouselTitleClick('hello there')}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          {carouselTitle}
        </Text>
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={true}
        data={movies}
        keyExtractor={(item) => item.imdbID}
        horizontal
        contentContainerStyle={{
          alignItems: 'flex-start',
          marginVertical: SPACING,
        }}
        renderItem={({ item: title, index }) => {
          return (
            <View
              style={{
                marginHorizontal: SPACING,
                borderRadius: 10,
              }}
            >
              <TouchableOpacity onPress={() => handlePosterClick(title.imdbID)}>
                <Image
                  resizeMethod='auto'
                  resizeMode='center'
                  style={{
                    width: 120,
                    height: 200,
                  }}
                  source={{
                    uri: title.Poster,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    width: 120,
                  }}
                >
                  {title.Title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </Animated.View>
  );
};
