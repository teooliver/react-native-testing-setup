import React, { FC, useContext, useState } from 'react';
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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from './styles';
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
  route: RouteProp<AuthStackParamList, 'Login'>;
}

export const Login: FC<Props> = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState(false);
  const [isValidUser, setIsValidUser] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const { login } = useContext(AuthContext);

  const handleEmail = (email: string) => {
    if (email.trim().length >= 4) {
      setIsValidUser(true);
      setIsValid(true);
    } else {
      setIsValidUser(false);
      setIsValid(false);
    }
    setFormData({ ...formData, email: email });
  };

  const handlePassword = (password: string) => {
    if (password.trim().length >= 8) {
      setIsValidPassword(true);
      // setIsValid(true);
    } else {
      setIsValidPassword(false);
      // setIsValid(false);
    }
    setFormData({ ...formData, password: password });
  };

  const handleLogin = () => {
    if (formData.email.length === 0 || formData.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{ text: 'Okay' }]
      );
      return;
    }
    if (!isValidUser || !isValidPassword) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        { text: 'Okay' },
      ]);
      return;
    }
    login();
  };

  // const handleValidateUser = (text: string) => {
  //   if (text.length >= 4) {
  //     setIsValidUser(true);
  //   } else {
  //     setIsValidUser(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* <View style={styles.container}> */}

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
        <Text style={styles.text_header}>Login</Text>
      </View>
      <Animatable.View animation='fadeInUpBig'>
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.footer}>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name='user-o' color='#05375a' size={20} />
            <TextInput
              placeholder='Your Email'
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(text) => handleEmail(text)}
              // onEndEditing={(e) => handleValidateUser(e.nativeEvent.text)}
            />
            {isValid ? (
              <Animatable.View animation='bounceIn'>
                <Feather name='check-circle' color='green' size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {!isValidUser ? (
            <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 characters long
              </Text>
            </Animatable.View>
          ) : null}
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
          {!isValidPassword ? (
            <Animatable.View animation='fadeInLeft' duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long
              </Text>
            </Animatable.View>
          ) : null}
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleLogin}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.signIn}
              >
                <Text style={{ ...styles.textSign, color: '#fff' }}>
                  Log In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};
