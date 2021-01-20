import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TouchableOpacity, View, Text, StatusBar } from 'react-native';
import { styles } from './styles';
import Feather from 'react-native-vector-icons/Feather';

interface WelcomeProps {
  navigation: StackNavigationProp<AuthStackParamList, 'Welcome'>;
  route: RouteProp<AuthStackParamList, 'Welcome'>;
}

export const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  return (
    <View style={{ ...styles.container, padding: 20 }}>
      {/* <View style={styles.header}> */}
      <StatusBar backgroundColor='#009387' barStyle='light-content' />
      <Text style={{ ...styles.text_header, marginTop: 40 }}>Welcome</Text>
      {/* </View> */}
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.signIn}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.signIn}
          >
            <Text style={{ ...styles.textSign, color: '#fff' }}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            ...styles.signIn,
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 15,
          }}
        >
          <Text style={{ ...styles.textSign, color: '#009387' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
