import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useGetTitleById } from '../../hooks/useGetTitleById';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'Details'>;
  route: RouteProp<HomeStackParamList, 'Details'>;
}

export const Details: FC<Props> = ({ navigation, route }) => {
  const [pageTitle, setPageTitle] = useState('Details Screen');
  const { data: title, isSuccess, isLoading, isError } = useGetTitleById(
    route!.params?.titleId || ''
  );

  console.log(title);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LOADING</Text>
      </View>
    );

  if (isSuccess) {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 50,
            top: 30,
            left: 10,
            zIndex: 10000,
            // marginLeft: 5,
            // marginTop: 50,
            // backgroundColor: 'black',
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name='chevron-left' size={30} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text>{title?.Title}</Text>
          <Text>ItemID: {route!.params?.titleId}</Text>
          <Image
            resizeMethod='auto'
            resizeMode='center'
            style={{
              width: 120,
              height: 200,
            }}
            source={{
              uri: title?.Poster,
            }}
          />
          {/* <Button
          title='Go to Details... again'
          onPress={() => {
            setPageTitle('Details Screen 2');
            navigation!.navigate('Details');
          }}
        /> */}
          <Button title='Go back' onPress={() => navigation!.goBack()} />
          {/* <Button
          title='Update Title'
          onPress={() => navigation!.setOptions({ title: 'Updated!' })}
        /> */}
        </View>
      </>
    );
  }
};
