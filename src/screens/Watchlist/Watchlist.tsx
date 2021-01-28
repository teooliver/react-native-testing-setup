import React from 'react';
import { View, Text } from 'react-native-animatable';

interface WatchlistProps {}

export const Watchlist: React.FC<WatchlistProps> = ({}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Watchlist</Text>
    </View>
  );
};
