import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useGetTitles } from '../../hooks/useGetTitles';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';
import { styles } from './styles';
interface CarouselGridProps {
  navigation: StackNavigationProp<HomeStackParamList, 'CarouselGrid'>;
  route: RouteProp<HomeStackParamList, 'CarouselGrid'>;
}

export const CarouselGrid: FC<CarouselGridProps> = ({ navigation }) => {
  const { data: titles, isSuccess, isLoading } = useGetTitles();

  const handlePosterClick = (titleId: string) => {
    navigation.navigate('Details', { titleId: titleId });
  };

  useEffect(() => {
    console.log('viewing GRID');
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <ScrollView style={{ marginTop: StatusBar.currentHeight || 42 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.shareBtn}
        >
          <Feather name='chevron-left' size={30} />
        </TouchableOpacity>
        <View style={styles.container}>
          {titles?.Search.map((title) => (
            <TouchableOpacity
              onPress={() => handlePosterClick(title.imdbID)}
              key={title.imdbID}
            >
              <Image
                resizeMethod='auto'
                resizeMode='center'
                style={styles.image}
                source={{
                  uri: title.Poster,
                }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }
  return null;
};
