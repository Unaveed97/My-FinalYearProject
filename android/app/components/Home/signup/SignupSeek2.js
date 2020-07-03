import React, { Component } from 'react';
import { View, KeyboardAvoidingView, ProgressBarAndroid, AsyncStorage,Text, StyleSheet, Image, Alert, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from 'react-navigation-stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import { Card } from 'react-native-paper';
//import Signup1 from './recruiterSignUp1';
//import Tab from './index';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'firebase';
const resetActions = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Seeker' })]
});



export default class Signupseeker2 extends Component {

    state = { password: "", confirmpassword: "", progressVal: 0.5 };
    constructor(props) {
        super(props);
        //console.warn(this.props.navigation.state.params);
    }
    checkInputs() {
        const { password, confirmpassword } = this.state


        if (password == "" || password.length < 6) {
            Alert.alert('Error', 'Invalid Password', [{ text: 'OK' }])
            return;
        }
        if (confirmpassword == "" || confirmpassword.length < 6) {
            Alert.alert('Error', 'Invalid Confirm Password', [{ text: 'OK' }])
            return;
        }
        if (password != confirmpassword) {
            Alert.alert('Error', 'Password does not match', [{ text: 'OK' }])
            return;
        }
        //console.warn(firstname+' '+lastname+''+email+''+password+''+confirmpassword);

        /*alert(this.props.navigation.state.params.firstname);
        alert(this.props.navigation.state.params.lastname);*/
        try {

            firebase.auth().createUserWithEmailAndPassword(this.props.navigation.state.params.email, this.state.password);

        } catch (error) {
            alert(error);
            return;
        }
        //alert(this.props.navigation.state.params.email)
        const full = this.props.navigation.state.params.firstname;
        try {
            firebase.database().ref('Seeker/').child('/' + full + '/').update({
                firstname: this.props.navigation.state.params.firstname,
                lastname: this.props.navigation.state.params.lastname,
                email: this.props.navigation.state.params.email,
                password,
            }).then(
                this.props.navigation.navigate('Seeker')
            );

        } catch (error) {
            alert(error);
            return
        }
        //alert("signup successful");
        var email=this.props.navigation.state.params.email;
        var temp = email.split('@');
        AsyncStorage.setItem('email', email)
        AsyncStorage.setItem('user', temp[0]);
        this.props.navigation.dispatch(resetActions);
        this.props.navigation.navigate('Seeker')
        //this.props.navigation.navigate('AppDash');
    }
    render() {
        return (
            <SafeAreaView style={styles.parent}>



                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8'/*'#0942c0'*/, '#0f1654']} style={{ flex: 12.5 }}>
                    <View >
                        <Image style={styles.logo} source={require('../../../assets/mcLogo.png')}></Image>
                        <Text style={styles.fontstyle}>Sign Up</Text>
                    </View>
                </LinearGradient>

                <Card style={styles.card} elevation={7}>
                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} value={this.state.password} label='Password' secureTextEntry={true} onChangeText={text => this.setState({ password: text, progressVal: 0.664 })} />
                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} value={this.state.confirmpassword} label='Confirm Password' secureTextEntry={true} onChangeText={text => this.setState({ confirmpassword: text, progressVal: 1 })} />



                    <Text style={styles.text1}>Page 2/2</Text>
                    <ProgressBarAndroid style={styles.progress} styleAttr='Horizontal' indeterminate={false} progress={this.state.progressVal} />
                    <TouchableOpacity onPress={() => this.checkInputs()}>
                        <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={() => this.checkInputs()}>SignUp</Button>
                    </TouchableOpacity>
                </Card>

                <View style={{ flex: 6, backgroundColor: '#fffafa' }}>

                </View>

            </SafeAreaView>

        );
    }

}
const styles = StyleSheet.create({
    parent: {
        flex: 1,
        //justifyContent: 'center',
        //backgroundColor: '#ffffff',
        //width: wp('100%'),
        //height: hp('100%')
    },
    fontstyle: {
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',

        color: '#e8eaf6',
        marginLeft: 10
    },
    input: {
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#e8eaf6'
    },
    input1: {
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#e8eaf6',
        marginTop: 20
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 3,
        backgroundColor: '#00227b',
        marginTop: 15,
        marginLeft: 55,
        marginRight: 55,
        marginBottom: 25,
        borderRadius: 30,
        height: hp('7%')
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    },
    logo: {
        width: wp('30.5%'),
        height: hp('9.5%'),
        marginLeft: 125,
        marginBottom: 15,
        marginTop: 20
    },
    card:
    {
        marginHorizontal: 10,
        height: hp('60%'),
        marginTop: -10,
        borderRadius: 10,
    },
    progress:
    {
        marginTop: 10,
        marginHorizontal: 10,
        color: '#0f1654'
    },
    text1: {
        marginTop: 25,
        marginLeft: 140
    }
});
/*
const resetActions = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Seeker' })]
});*/

