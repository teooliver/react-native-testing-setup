import React from 'react';
import { View, Text } from 'react-native-animatable';

interface Props {}

export const Search: React.FC<Props> = ({}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search</Text>
    </View>
  );
};
