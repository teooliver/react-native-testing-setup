import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
}

export const Home: FC<Props> = ({ navigation }) => {
  useEffect(() => {
    runConsole('Hello');
  }, []);

  const runConsole = (log: string) => {
    console.log(log);
  };

  return (
    <View style={styles.container} testID='Home'>
      <Text>Home Screen</Text>
      <TextInput placeholder='Test Input' />
      <Button
        title='Go to Details'
        onPress={() => navigation.navigate('Details', { itemId: 86 })}
      />
    </View>
  );
};
