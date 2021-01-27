import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { View, Text, Button } from 'react-native';
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

  if (isLoading) return <Text>LOADING</Text>;

  if (isSuccess) {
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>ItemID: {route!.params?.titleId}</Text>
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
    );
  }
};
