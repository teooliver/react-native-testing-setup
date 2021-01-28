import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, View, Image, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Title } from '../../../utils/types/titles';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';

interface Props {
  movies: Title[];
  carouselTitle: string;
  navigation: StackNavigationProp<HomeStackParamList, 'Feed'>;
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
}) => {
  const handlePosterClick = (titleId: string) => {
    console.log(titleId);
    navigation.navigate('Details', { titleId: titleId });
  };

  const handleCarouselTitleClick = (carouselId: string) => {
    navigation.navigate('CarouselGrid', { carouselId: carouselId });
  };

  return (
    <View
      style={{ backgroundColor: 'black', marginVertical: 20, borderRadius: 10 }}
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
          backgroundColor: 'black',
        }}
        renderItem={(item) => {
          return (
            <View
              style={{
                marginHorizontal: SPACING,
                // justifyContent: 'flex-end',
                // alignItems: 'baseline',
                borderRadius: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePosterClick(item.item.imdbID)}
              >
                <Image
                  resizeMethod='auto'
                  resizeMode='center'
                  style={{
                    width: 120,
                    height: 200,
                  }}
                  source={{
                    uri: item.item.Poster,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    width: 120,
                  }}
                >
                  {item.item.Title}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};
