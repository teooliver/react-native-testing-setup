import React, { useState } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { Routes } from './src/routes/Routes';
import { QueryClient, QueryClientProvider } from 'react-query';

function cacheImages(images: any[]) {
  return images.map((image) => {
    if (typeof image === 'string') {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const queryClient = new QueryClient();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/images/omid-armin-i15TJ2zBh3c-unsplash.png'),
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
}
