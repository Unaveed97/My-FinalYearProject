import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    SafeAreaView,
    Image,
    Dimensions
} from 'react-native';
import firebase from 'firebase'

import User from './User'

console.disableYellowBox = true

export default class ChatHomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        users: [],
        dbRef: firebase.database().ref('user')
    }

    async componentWillMount() {
        var userData = await AsyncStorage.getItem("UserName");
        console.log('Hello i am user', userData)
        let SeekerInfo = await firebase.database().ref('/Seeker').orderByChild('firstname').equalTo(userData).once('value')
        let RecruiterInfo = await firebase.database().ref('/Recruiter').orderByChild('fullname').equalTo(userData).once('value')
        console.log(RecruiterInfo)
    }

    render() {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        )
    }
}