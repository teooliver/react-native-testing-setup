import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
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
  const { data: titles, isSuccess, isLoading, isError } = useGetTitles();

  const handlePosterClick = (titleId: string) => {
    navigation.navigate('Details', { titleId: titleId });
  };

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
            <TouchableOpacity onPress={() => handlePosterClick(title.imdbID)}>
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
