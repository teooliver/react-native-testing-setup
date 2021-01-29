import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useRef, useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Feather from 'react-native-vector-icons/Feather';
import { useGetTitleById } from '../../hooks/useGetTitleById';
import { HomeStackParamList } from '../../navigators/HomeStackNavigator';
import { styles } from './styles';

interface Props {
  navigation: StackNavigationProp<HomeStackParamList, 'Details'>;
  route?: RouteProp<HomeStackParamList, 'Details'>;
}

const { width, height } = Dimensions.get('window');

export const Details: FC<Props> = ({ navigation, route }) => {
  const { data: title, isSuccess, isLoading, isError } = useGetTitleById(
    route!.params?.titleId || ''
  );

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  if (isLoading)
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        testID='Spinner'
      >
        <Text>LOADING</Text>
      </View>
    );

  if (isSuccess) {
    return (
      <>
        <View style={styles.container}>
          <Image
            style={StyleSheet.absoluteFillObject}
            source={{
              uri: title?.Poster,
            }}
            blurRadius={30}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 50,
              top: 30,
              left: 10,
              zIndex: 10000,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name='chevron-left' size={30} />
          </TouchableOpacity>

          <Text>{title?.Title}</Text>
          <Text>ItemID: {route!.params?.titleId}</Text>
          <Image
            resizeMethod='auto'
            resizeMode='center'
            style={{
              width: 120,
              height: 200,
            }}
            source={{
              uri: title?.Poster,
            }}
          />

          <TouchableOpacity onPress={onOpen} testID='share-icon'>
            <Feather name='share' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <Portal>
          <Modalize
            ref={modalizeRef}
            useNativeDriver
            snapPoint={height - height / 3}
            modalStyle={{
              marginHorizontal: 10,
              padding: 5,
              backgroundColor: 'rgba(30,30,30,0.95)',
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', height: 20 }} testID='share-modal'>
              Modal
            </Text>
          </Modalize>
        </Portal>
      </>
    );
  }
  return null;
};
