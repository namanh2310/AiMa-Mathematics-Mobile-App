import {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {html} from '../../../Components/html';
import axios from 'axios';

const Fundamental = ({navigation}) => {
  const webviewRef = useRef();

  const handleSubmit = data => {
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Calculus/fundamental', {data})
          // .post('http://10.238.30.185:8081/Calculus/fundamental', {data})
          .then(res => {
            navigation.navigate('Fundamental SOL', {
              data: res.data.result,
              equation: res.data.equation,
              step: res.data.step,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  };

  function onMessage(data) {
    console.log('log o day', data.nativeEvent.data);
    handleSubmit(data.nativeEvent.data);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        ref={webviewRef}
        style={{flex: 1, padding: 0, margin: 0}}
        scalesPageToFit={false}
        bounces={false}
        scrollEnabled={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        source={{
          html: html,
        }}
      />
    </SafeAreaView>
  );
};

export default Fundamental;
