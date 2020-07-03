/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import * as Firebase from 'firebase';
import { CardView } from 'react-native-cardview';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SplashScreen from './android/app/components/Home/splashScreen';
import { TextInput,Title, Card, Button } from 'react-native-paper';
export default class App extends Component {
  UNSAFE_componentWillMount (){
    const firebaseConfig = {
      apiKey: "AIzaSyBi-VWFHKQDqXIWA-eDm80bPbqZUVzDshY",
      authDomain: "fyp-testing-6738e.firebaseapp.com",
      databaseURL: "https://fyp-testing-6738e.firebaseio.com",
      projectId: "fyp-testing-6738e",
      storageBucket: "fyp-testing-6738e.appspot.com",
      messagingSenderId: "94121752844",
      appId: "1:94121752844:web:bf240a7a255d0a74f17129",
      measurementId: "G-PL2XNJ3PEV"
    };
    !Firebase.apps.length? Firebase.initializeApp(firebaseConfig): Firebase.app();
  }
  render() {
    return (
      <SplashScreen />
    );
  }
}
