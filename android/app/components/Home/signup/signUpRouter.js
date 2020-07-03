import React, { Component } from 'react';
import { View, KeyboardAvoidingView, ProgressBarAndroid, Text, StyleSheet, Image, Alert, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from 'react-navigation-stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import { Card } from 'react-native-paper';
//import Tab from './index';
import LinearGradient from 'react-native-linear-gradient'
const resetActions = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'AppDash' })]
});



export default class PermissionSignup extends Component {


    render() {
        return (
            <SafeAreaView style={styles.parent}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8'/*'#0942c0'*/, '#0f1654']} style={{ flex: 12.5 }}>
                    <View >
                        <Text style={styles.fontstyle}>Please select registration mode</Text>
                    </View>
                </LinearGradient>

                <Card style={styles.card} elevation={9}>
                    <View style={styles.viewStyles}>
                        <View >
                            <TouchableOpacity style={{ width: wp('30'), height: hp('20') }} onPress={() => this.props.navigation.navigate('Rec')}>
                                <LinearGradient colors={['#4c669f', '#0f1654', '#3b5998']} style={styles.linearGradient2}>
                                    <Image source={require('../../../assets/Builsing.png')}
                                        style={styles.loginImage1}>
                                    </Image>
                                </LinearGradient>
                            </TouchableOpacity>
                            <Text style={styles.recText}>Signup as {"\n"}job Recuriter</Text>
                        </View>
                        <View style={{marginLeft:60}}>
                            <TouchableOpacity style={{ width: wp('30'), height: hp('20') }} onPress={() => this.props.navigation.navigate('AppSignUp')}>
                                <LinearGradient colors={['#4c669f', '#0f1654', '#3b5998']} style={styles.linearGradient2}>
                                    <Image source={require('../../../assets/jobseeker.png')}
                                        style={styles.loginImage1}>
                                    </Image>
                                </LinearGradient>
                            </TouchableOpacity>
                            <Text style={styles.recText}>Signup as {"\n"}job Seeker</Text>
                        </View>
                    </View>
                </Card>

                <View style={{ flex: 8, backgroundColor: '#fffafa' }}>
                <Text style={styles.textRegister}>                   ─────────  Or  ─────────</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Applogin')}>
                <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' >Sign In</Button>
                </TouchableOpacity>
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
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop:130,
        color: '#e8eaf6',
        marginLeft: 10
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 3,
        backgroundColor: '#00227b',
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 30,
        height: hp('7%')
    },
    btntext: {
        color: '#fff',
        //fontWeight: 'bold',
        fontSize:17
    },
    card:
    {
        marginHorizontal: 10,
        height: hp('50%'),
        marginTop: -40,
        borderRadius: 10,
    },
    text1: {
        marginTop: 25,
        marginLeft: 140
    },
    linearGradient: {
        width: wp('100%'),
        height: hp('100%'),
    },
    SignUpBtn: {
        marginTop: 20,
        width: wp('90%'),
        height: hp('7%'),
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#0f1654',
        fontFamily: 'Roboto',
    },
    BtnText: {
        marginTop: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 25,
        color: 'white',
    },
    linearGradient2: {
        //width: 120,
        //height: 120,
        width: wp('32'),
        height: hp('18'),
        borderRadius: 20,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textRegister: {
        marginTop: 15,
        alignSelf: 'center',
        opacity: 0.2,
        width:wp('120%'),
        alignItems:'center',
        alignContent:'center',
        //marginLeft:25

    },
    loginImage1: {
        marginBottom: 2,
        height: hp('14'),
        width: wp('24'),
    },
    RecItem: {
        alignSelf: 'center',
        marginLeft: 10,
    },
    recText: {
        alignSelf: 'center',
        fontSize: 15,
        marginLeft:10,
        fontFamily: 'Roboto',
    },
    viewStyles: {
        flexDirection:'row',
        marginTop:90,
        marginHorizontal:25
    }
});