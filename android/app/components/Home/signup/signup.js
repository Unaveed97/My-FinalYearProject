import React, { Component } from 'react';
import { View, KeyboardAvoidingView, ProgressBarAndroid, Text, StyleSheet, Image, Alert, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from 'react-navigation-stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient'
const resetActions = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Seeker' })]
});
class SignupSeek1 extends Component {
 state = { firstname: "", lastname: "", email: "", progressVal: 0 }
    checkInputs() {
        const { firstname, lastname, email } = this.state
        if (firstname == "") {
            Alert.alert('Error', 'Invalid Firstname', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (lastname == "") {
            Alert.alert('Error', 'Invalid Lastname', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (email == "") {
            Alert.alert('Error', 'Invalid Email', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        this.props.navigation.navigate('Signup2', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
        });
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

                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='First Name' value={this.state.firstname} onChangeText={text => this.setState({ firstname: text, progressVal: 0.166 })} />
                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Last Name' value={this.state.lastname} onChangeText={text => this.setState({ lastname: text, progressVal: 0.332 })} />
                    <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Email' value={this.state.email} keyboardType='email-address' onChangeText={text => this.setState({ email: text, progressVal: 0.498 })} />
                    <Text style={styles.text1}>Page 1/2</Text>
                    <ProgressBarAndroid style={styles.progress} styleAttr='Horizontal' indeterminate={false} progress={this.state.progressVal} />
                    <TouchableOpacity onPress={() => this.checkInputs()}>
                        <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={() => this.checkInputs()}>Next</Button>
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
export default SignupSeek1;
/*
const resetActions = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Seeker' })]
});*/


/*TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} value={this.state.password} label='Password' secureTextEntry={true} onChangeText={text => this.setState({ password: text })} />
<TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} value={this.state.confirmpassword} label='Confirm Password' secureTextEntry={true} onChangeText={text => this.setState({ confirmpassword: text })} />
<TouchableOpacity style={styles.buton} onPress={_ => this.checkInputs()}>
    <Text style={styles.btntext}>
        SIGNUP
</Text>*/