import React, { FC, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
  route: RouteProp<AuthStackParamList, 'Login'>;
}

export const Register: FC<Props> = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleEmail = (email: string) => {
    if (email.length !== 0) {
      setFormData({ ...formData, email: email });
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handlePassword = (password: string) => {
    setFormData({ ...formData, password: password });
  };

  const handleConfirmPassword = (password: string) => {
    setFormData({ ...formData, confirmPassword: password });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      console.log('all good');
    } else {
      console.log('passwords dont match');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle='light-content' />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 40,
          left: 15,
          backgroundColor: 'rgba(158, 158, 158, 0.11)',
          borderRadius: 50,
        }}
      >
        <Feather name='chevron-left' color='grey' size={25} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register</Text>
      </View>
      <Animatable.View animation='fadeInUpBig' style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name='user-o' color='#05375a' size={20} />
          <TextInput
            placeholder='Your Email'
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={(text) => handleEmail(text)}
          />
          {isValid ? (
            <Animatable.View animation='bounceIn'>
              <Feather name='check-circle' color='green' size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={{ ...styles.text_footer, marginTop: 35 }}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name='lock' color='#05375a' size={20} />
          <TextInput
            placeholder='Your Password'
            secureTextEntry={isPasswordVisible}
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={(text) => handlePassword(text)}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Feather name='eye-off' color='grey' size={20} />
            ) : (
              <Feather name='eye' color='grey' size={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.text_footer, marginTop: 35 }}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <FontAwesome name='lock' color='#05375a' size={20} />
          <TextInput
            placeholder='Confirm Password'
            secureTextEntry={isPasswordVisible}
            style={styles.textInput}
            autoCapitalize='none'
            onChangeText={(text) => handleConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? (
              <Feather name='eye-off' color='grey' size={20} />
            ) : (
              <Feather name='eye' color='grey' size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.signIn}
          >
            <Text style={{ ...styles.textSign, color: '#fff' }}>Sign Up</Text>
          </LinearGradient>
        </View>
      </Animatable.View>
    </View>
  );
};
