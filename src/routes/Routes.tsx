import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackNavigator } from '../navigators/AppStackNavigator';
import { AuthStackNavigator } from '../navigators/AuthStackNavigator';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { Host } from 'react-native-portalize';
import { colors } from '../../utils/design/colors';

export default function Routes() {
  const { user, login, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user').then((userString) => {
      if (userString) {
        // login();
        setUser({ username: userString });
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
        <Host>{user ? <AppStackNavigator /> : <AuthStackNavigator />}</Host>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
