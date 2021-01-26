import React from 'react';

import { Dimensions, View, Image, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Title } from '../../utils/types/titles';

interface Props {
  movies: Title[];
  carouselTitle: string;
}

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_WIDTH = width * 0.72;
const CAROUSEL_HEIGHT = height / 2;

export const FilterCarousel: React.FC<Props> = ({ movies, carouselTitle }) => {
  return (
    <View style={{ backgroundColor: 'black', marginVertical: 10 }}>
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
      <FlatList
        showsHorizontalScrollIndicator={true}
        data={movies}
        keyExtractor={(item) => item.imdbID}
        horizontal
        contentContainerStyle={{
          alignItems: 'center',
          marginVertical: SPACING,
          backgroundColor: 'black',
          height: CAROUSEL_HEIGHT,
        }}
        renderItem={(item) => {
          return (
            <View
              style={{
                height: CAROUSEL_HEIGHT - 30,
                width: ITEM_WIDTH,
                padding: SPACING * 2,
                marginHorizontal: SPACING,

                alignItems: 'center',
                borderRadius: 34,
                backgroundColor: 'red',
              }}
            >
              <Image
                resizeMethod='auto'
                resizeMode='center'
                source={{
                  uri:
                    'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg',
                }}
              />
              <Text>Helllo</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
