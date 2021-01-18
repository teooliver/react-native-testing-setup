import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

export const Details: FC<Props> = ({ navigation, route }) => {
  const [title, setTitle] = useState('Details Screen');

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>ItemID: {route.params?.itemId}</Text>
      <Button
        title='Go to Details... again'
        onPress={() => {
          setTitle('Details Screen 2');
          navigation.navigate('Details');
        }}
      />
      <Button title='Go back' onPress={() => navigation.goBack()} />
      <Button
        title='Update Title'
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </View>
  );
};
