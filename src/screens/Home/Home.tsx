import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Titles } from '../../../utils/types/titles';
import { AuthContext } from '../../context/AuthContext';
import { useGetTitles } from '../../hooks/useGetTitles';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
}

// Possible type for state
// type titlesState =
//   | { idLoading: boolean, data: null }
//   | { isSuccess: true; data: Titles }
//   | { isError: boolean, data: null };

export const Home: FC<Props> = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { data: titles, isLoading, isSuccess, isError } = useGetTitles();

  useEffect(() => {
    // runConsole('Hello');
  }, []);

  const runConsole = (log: string) => {
    console.log(log);
  };

  // console.log('From Login Test');

  return (
    <View style={styles.container} testID='Home'>
      <Text>Home Screen</Text>
      <TextInput placeholder='Test Input' />
      {isSuccess &&
        titles?.Search.map((title) => (
          <Text key={title.imdbID}>{title.Title}</Text>
        ))}

      <Button
        title='Go to Details'
        onPress={() => navigation.navigate('Details', { itemId: 86 })}
      />
      <Button title='Logout' onPress={logout} />
    </View>
  );
};
