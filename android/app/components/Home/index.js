/*import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Signup from './signup/signup';
import RecruiterDashboard from './dashboard/dashboard';
import SeekerDashboard from './dashboard/dashboard_seeker';
import Login from './login/login';
import SeekerLogin from './login/seekerLogin';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import SignupRecruiter from './signup/recruiterSignup';
//import Permission from './signup/signUpRouter';
class Welcome extends Component {
    
    render() {
        
        return (
            <SafeAreaView style={{ flex: 1 }}>
                
            </SafeAreaView>
        );
    }
}

const Mystack = createStackNavigator(
    {
        Welcome: { screen: Welcome },
        Applogin: { screen: Login },
        //seekerLogin:{screen:SeekerLogin},
        PermissionToSignup: {screen:Permission},
        AppSignUp: { screen: Signup },
        //RecruiterSignUp: { screen: SignupRecruiter },
        AppDash: { screen: RecruiterDashboard },
        Seeker: { screen: SeekerDashboard },
    },
    {
        headerMode: 'none'
    }
);
const Myapp = createAppContainer(Mystack);
export default Myapp;

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: wp('100%'),
        height: hp('100%')
    },
    logo:
    {
        width: wp('30%'),
        height: hp('18%'),
        margin: 50
    },
    button:
    {
        fontSize: 20,
    },
    btn:
    {
        padding: 5,
        margin: 15,
        width: wp('70%'),
        backgroundColor: '#00227b',
        borderRadius: 30,
    },
    view:
    {
        marginTop: 50,

    },
    text:
    {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 50
    }
});
*/