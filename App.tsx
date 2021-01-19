import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackNavigator } from './src/navigators/AppStackNavigator';
import { AuthContext, AuthProvider } from './src/context/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStackNavigator } from './src/navigators/AuthStackNavigator';

export default function App() {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then((userString) => {
      if (userString) {
        login();
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          {user ? <AppStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center",
    // justifyContent: "center",
  },
});
