import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Details'>;
  route: RouteProp<RootStackParamList, 'Details'>;
}

export const Details: FC<Props> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>ItemID: {route.params?.itemId}</Text>
      <Button
        title='Go to Details... again'
        onPress={() => navigation.navigate('Details')}
      />
      <Button title='Go back' onPress={() => navigation.goBack()} />
      <Button
        title='Update Title'
        onPress={() => navigation.setOptions({ title: 'Updated!' })}
      />
    </View>
  );
};
