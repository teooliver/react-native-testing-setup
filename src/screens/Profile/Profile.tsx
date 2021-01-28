import React from 'react';
import { View, Text } from 'react-native';

interface Props {}

export const Profile: React.FC<Props> = ({}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
};
