import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useGetTitles } from '../../hooks/useGetTitles';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';

interface CarouselGridProps {
  navigation: StackNavigationProp<HomeStackParamList, 'CarouselGrid'>;
  route: RouteProp<HomeStackParamList, 'CarouselGrid'>;
}

const { width, height } = Dimensions.get('window');

export const CarouselGrid: FC<CarouselGridProps> = ({ navigation }) => {
  const { data: titles, isSuccess, isLoading, isError } = useGetTitles();

  const handlePosterClick = (titleId: string) => {
    console.log(titleId);
    navigation.navigate('Details', { titleId: titleId });
  };

  if (isLoading) {
    <View>
      <Text>Loading</Text>
    </View>;
  }

  if (isSuccess) {
    return (
      <ScrollView style={{ marginTop: 40 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 50,
            marginLeft: 5,
            // backgroundColor: 'black',
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name='chevron-left' size={30} />
        </TouchableOpacity>
        <View style={styles.container}>
          {titles?.Search.map((title) => (
            <TouchableOpacity onPress={() => handlePosterClick(title.imdbID)}>
              <Image
                resizeMethod='auto'
                resizeMode='center'
                style={{
                  width: width / 3 - 5,
                  height: (width / 3 - 5) / 0.675,
                }}
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
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 5,
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
