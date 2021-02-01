import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { AppTabNavigator } from '../navigators/AppTabNavigator';
import { AuthStackNavigator } from '../navigators/AuthStackNavigator';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { Host } from 'react-native-portalize';
import { colors } from '../../utils/design/colors';

export default function Routes() {
  const { user, login, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const routeNameRef = React.useRef<NavigationContainerRef>(null);
  const navigationRef = React.useRef<NavigationContainerRef>(null);

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
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          // @ts-ignore
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          // @ts-ignore
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          // @ts-ignore
          if (previousRouteName !== currentRouteName) {
            // The line below uses the expo-firebase-analytics tracker
            // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
            // Change this line to use another Mobile analytics SDK
            // Analytics.setCurrentScreen(currentRouteName, currentRouteName);
            console.log(`The route changed to ${currentRouteName}`);
          }

          // Save the current route name for later comparision
          // @ts-ignore
          routeNameRef.current = currentRouteName;
        }}
      >
        <Host>{user ? <AppTabNavigator /> : <AuthStackNavigator />}</Host>
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
