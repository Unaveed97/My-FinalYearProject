import React, { Component } from 'react';
import { View, AsyncStorage, Text, StyleSheet, StatusBar, Alert, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Dashboard from '../dashboard/dashboard';
import { NavigationActions, StackActions } from 'react-navigation';
import { TextInput, Button, Title, Card, ActivityIndicator } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Container } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Signup from '../signup/signup';
import RecruiterDashboard from '../dashboard/dashboard';
import Shortlist from '../dashboard/shortlist_candidates';
import SeekerDashboard from '../dashboard/dashboard_seeker';
import Permission from '../signup/signUpRouter';
import RS1 from '../signup/RecSign';
import RS2 from '../signup/rSign2';
import SeekSignup2 from '../signup/SignupSeek2';
import firebase from 'firebase'
import { isEmptyStatement } from '@babel/types';
import Postjob11 from '../dashboard/Postjob';
import CV1 from '../dashboard/createCV_1';
import RSeeker from '../dashboard/recommendation_seeker';
import PickFile from '../dashboard/uploadCV';
import SelectedCandidate from '../dashboard/selected';
import Chat from '../dashboard/InAppChat/SeekerHomeScreen';
import Chatting from '../dashboard/InAppChat/SeekerChatScreen';
import ProfileView from '../dashboard/Profile/SeekerProfile';
import RecruiterProfileView from '../dashboard/Profile/RecuiterProfile';
const resetActions1 = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'AppDash' })]
});

const resetActions2 = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Seeker' })]
});

var recruiter = 0;
var seeker = 0;
var user_val = 1;
class LoginMain extends Component {

    state = { email: "", password: "", user_val: 1, recruiter: 0, seeker: 0, loading: 0 };
    constructor(props) {
        super(props)
        this.checkInputs = this.checkInputs.bind(this)
    }
    async checkInputs() {
        const { email, password } = this.state
        if (email == "") {
            Alert.alert('Error', 'Invalid Email', [{ text: 'OK' }])
            return;
        }
        else if (password == "" || password.length < 6) {
            Alert.alert('Error', 'Invalid Password', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ loading: 1 });
            await this.Database(email, password);
            if (recruiter == 1) {
                var temp = email.split('@');
                AsyncStorage.setItem('email', email)
                AsyncStorage.setItem('user', temp[0]);
                this.routeToRecruiter()
            } else if (seeker == 1) {
                var temp = email.split('@');
                AsyncStorage.setItem('email', email)
                AsyncStorage.setItem('user', temp[0]);
                this.routeToSeeker()
            }
        }
    }
    async Database(email, password) {

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                user_val = 1;
            }).catch(function (error) {
                user_val = 0;
            });
            if (user_val == 1) {
                try {
                    const snapshot = await firebase.database().ref('/Recruiter').orderByChild('email').equalTo(email).once('value');
                    console.disableYellowBox = true;
                    if (snapshot.val() == null) {
                        const snapshot = await firebase.database().ref('/Seeker').orderByChild('email').equalTo(email).once('value');
                        if (snapshot.val() == null) {
                            alert("Kindly enter correct Email/Password")
                            return;
                        }
                        else {
                            seeker = 1;
                        }
                    }
                    else {
                        recruiter = 1
                    }
                } catch (error) {
                    alert(error)
                }
            }
            else {
                alert('Invalid user ', user_val);
                this.setState({ loading: 0 });
                return;
            }
        } catch (error) {
            alert(error)
        }
    }
    routeToSignup() {
        this.props.navigation.navigate('PermissionToSignup');
        console.disableYellowBox = true;
    }
    routeToRecruiter() {
        this.props.navigation.dispatch(resetActions1);
        this.props.navigation.navigate('AppDash');
        console.disableYellowBox = true;
    }
    routeToSeeker() {
        this.props.navigation.dispatch(resetActions2);
        this.props.navigation.navigate('Seeker');
        console.disableYellowBox = true;
    }
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        return (
            <Container>
                <StatusBar backgroundColor='#0f1654' barStyle='light-content' />
                <SafeAreaView style={styles.parent}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8', '#0f1654']} style={{ flex: 2.5 }}>
                        <View style={styles.box1}>
                            <Image
                                source={require('../../../assets/mcLogo.png')}
                                style={{
                                    marginLeft: 125,
                                    marginBottom: 5,
                                    marginTop: 30,
                                    height: hp('10%'),
                                    width: wp('30.5%'),
                                    resizeMode: 'contain',
                                    alignItems: 'center',
                                }} />
                            <Title style={styles.loginSty} >Login</Title>
                        </View>
                    </LinearGradient>
                    <Card elevation={7} style={styles.cardStyle}>
                        <Card.Content>
                            <View style={{ marginTop: 10 }}>
                                <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Email' value={this.state.email} keyboardType='email-address' onChangeText={email => this.setState({ email })} />
                                <TextInput mode='outlined' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} value={this.state.password} label='Password' secureTextEntry={true} onChangeText={password => this.setState({ password })} />

                                <TouchableOpacity onPress={() => this.checkInputs()}>
                                    <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => this.checkInputs()}>LOGIN</Button>
                                </TouchableOpacity>
                                <ActivityIndicator animating={this.state.loading == 1 ? true : false} style={{ marginTop: 10 }} color={'#0f1654'} />
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={styles.smallFont}>Don't have an account yet?</Text>
                                    <TouchableOpacity onPress={_ => this.routeToSignup()}><Text style={styles.smallFont1}>Signup</Text></TouchableOpacity>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                    <View style={styles.box2}>
                    </View>
                </SafeAreaView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    parent: {

        justifyContent: 'center',
        width: wp('100%'),
        height: hp('100%')
    },
    fontstyle: {
        fontSize: 25,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    input: {
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#e8eaf6',
    },
    box1: {
        //flex: 2.5,
    },
    box2: {
        flex: 1.5,
        backgroundColor: '#fffafa',
    },
    cardStyle: {
        marginTop: -60,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        height: hp('55%'),
    },
    textSyle: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    style1: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#191970',
    },
    loginSty: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 25,
    },
    input:
    {
        marginBottom: 10
    },
    buton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#00227b',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 30
    },
    paperbtn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 8,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 30,
        height: hp('8.5%'),
        borderColor: '#5c6bc0',
        borderWidth: 3,
    },
    papertext: {
        color: '#3949ab',
        fontWeight: 'bold'
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold',
    },
    smallFont: {
        fontSize: 15,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 5,
    },
    smallFont1: {
        fontSize: 16,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginRight: 20,
        color: '#1565c0',
        fontWeight: 'bold',

    },
});


const Mystack = createStackNavigator(
    {
        Applogin: { screen: LoginMain },
        PermissionToSignup: { screen: Permission },
        AppSignUp: { screen: Signup },
        AppDash: { screen: RecruiterDashboard },
        Seeker: { screen: SeekerDashboard },
        Rec: { screen: RS1 },
        RecSignUp2: { screen: RS2 },
        Signup2: { screen: SeekSignup2 },
        Postjob_1: { screen: Postjob11 },
        CreateCV1: { screen: CV1 },
        Jobs: { screen: RSeeker },
        Candidates: { screen: Shortlist },
        SeekerResume: { screen: PickFile },
        CandidateSelection: { screen: SelectedCandidate },
        SeekerChat: { screen: Chat },
        ChatS: { screen: Chatting },
        UserProfile: { screen: ProfileView },
        RecProfileInfo: { screen: RecruiterProfileView },
    },
    {
        headerMode: 'none'
    }
);
const Myapp = createAppContainer(Mystack);
export default Myapp;

