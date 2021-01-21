import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackNavigator } from '../navigators/AppStackNavigator';
import { AuthStackNavigator } from '../navigators/AuthStackNavigator';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { Asset } from 'expo-asset';

export default function Routes() {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then((userString) => {
      if (userString) {
        login();
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {user ? <AppStackNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
    </View>
  );
  // return (
  //   <View style={styles.container}>
  //     <NavigationContainer>
  //       <AuthStackNavigator />
  //     </NavigationContainer>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: "center",
    // justifyContent: "center",
  },
});
