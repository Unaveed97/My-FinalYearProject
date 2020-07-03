import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import firebase from 'firebase'
console.disableYellowBox = true
export default class fire extends Component {
    
    // 1.
    // async giveuser()
    // {
    //     var user= await AsyncStorage.getItem('user');
    //     return user;
    // }
     get ref() {
        return firebase.database().ref('messages').child('mahrukh');
    }// 2.
    on = callback =>{
        this.ref.on('child_added', snapshot => callback(this.parse(snapshot)));}
    //     this.ref
    // .limitToLast(20)
    // .on('child_added', snapshot => callback(this.parse(snapshot)));// 3.
parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
        _id,
        timestamp,
        text,
        user,
    };
    return message;
}// 4.
off() {
    this.ref.off();
}
get uid() {

    return (firebase.auth().currentUser || {}).uids;
}// 2.
get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
}

// 3.
send = messages => {
    for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];    // 4.
        const message = {
            text,
            user,
            timestamp: this.timestamp,
        };
        //this.append(message);
        this.ref.push(message)
    }
};// 5.
append = message => this.ref.push(message);
render() {
    return (
        <View>
            <Text> textInComponent </Text>
        </View>
    )
}
}

fire.shared = new fire();