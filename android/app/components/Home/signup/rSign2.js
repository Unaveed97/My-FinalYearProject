import React, { Component } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage, ProgressBarAndroid, Text, StyleSheet, Image, Alert, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from 'react-navigation-stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import { Card } from 'react-native-paper';
import * as firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import { isEmptyStatement } from '@babel/types';
const resetActions = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'AppDash' })]
});
export default class rSign2 extends Component {
    state = { fullname: "", organization: "", location: "", contactNo: "", email: "", password: "", confirmpassword: "", progressVal: 0.5 };
    constructor(props) {
        super(props);
    }
    checkInputs() {
        const { fullname, organization, location, contactNo, email, password, confirmpassword } = this.state
        if (organization == "") {
            Alert.alert('Error', 'Invalid Organization Name', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (location == "") {
            Alert.alert('Error', 'Invalid Address', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (contactNo == "") {
            Alert.alert('Error', 'Invalid Contact Number', [{ text: 'OK' }])
            return;
        }
        try {
            firebase.auth().createUserWithEmailAndPassword(this.props.navigation.state.params.email1, this.props.navigation.state.params.password);
        } catch (error) {
            alert(error);
            return;
        }
        const full = this.props.navigation.state.params.fullname;
        try {
            firebase.database().ref('Recruiter/').child('/' + full + '/').update({
                fullname: this.props.navigation.state.params.fullname,
                email: this.props.navigation.state.params.email1,
                password: this.props.navigation.state.params.password,
                organization,
                contactNo,
                location,
            }).then(
                this.props.navigation.navigate('AppDash')
            );
        } catch (error) {
            alert(error);
            return
        }
        var email1 = this.props.navigation.state.params.email1;
        var temp = email1.split('@');
        AsyncStorage.setItem('email', email1)
        AsyncStorage.setItem('user', temp[0]);
        this.props.navigation.dispatch(resetActions);
        this.props.navigation.navigate('AppDash')
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
                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Organization Name' value={this.state.organization} onChangeText={text => this.setState({ organization: text, progressVal: 0.25 })} />
                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Contact No.' value={this.state.contactNo} onChangeText={text => this.setState({ contactNo: text, progressVal: 0.625 })} />
                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Address' value={this.state.location} onChangeText={text => this.setState({ location: text, progressVal: 1 })} />
                    <Text style={styles.text1}>Page 2/2</Text>
                    <ProgressBarAndroid style={styles.progress} styleAttr='Horizontal' indeterminate={false} progress={this.state.progressVal} />
                    <TouchableOpacity onPress={() => this.checkInputs()} >
                        <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={() => this.checkInputs()}>Sign Up</Button>
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
    },
    fontstyle: {
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',

        color: '#e8eaf6',
        marginLeft: 10
    },
    input: {
        marginTop: 10,
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