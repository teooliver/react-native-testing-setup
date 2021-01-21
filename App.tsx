import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackNavigator } from './src/navigators/AppStackNavigator';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthStackNavigator } from './src/navigators/AuthStackNavigator';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { Login } from './src/screens/Login/Login';
import Routes from './src/routes/Routes';

function cacheImages(images: any[]) {
  return images.map((image) => {
    if (typeof image === 'string') {
      // @ts-ignore
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/images/omid-armin-i15TJ2zBh3c-unsplash.jpg'),
    ]);

    await Promise.all([...imageAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
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
