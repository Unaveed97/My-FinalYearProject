import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, StatusBar, FlatList, Image, ScrollView, AsyncStorage } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Card } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import { TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase';
console.disableYellowBox = true;

class SeekerProfile extends Component {
    constructor(props) {
        super(props),
            this.state = {
                Email: '',
                Education: '',
                Domain: '',
                WorkingExperience: '',
                InterPersonalSkills: '',
                Skills:'',
                Address: '',
                Contact: '',
                Fullname:'',
                Edit: false,
            }
            //alert('In the constructor')
    }
   async UNSAFE_componentWillMount() {
        try {
            var user = await AsyncStorage.getItem('user');
            var email = await AsyncStorage.getItem('email');
            //console.warn('user',user);
            //console.warn('email',email);
            //var snapshot =  await firebase.database().ref('Seeker/').once('value');
            var snapshot = await firebase.database().ref('/Seeker').orderByChild('email').equalTo(email).once('value');
            var user = Object.entries(snapshot.val()).map(item => ({ ...item[1], key: item[0] }));
            //console.warn('name',user[0].firstname)
            this.setState({
                Email : user[0].email,
                Fullname : user[0].firstname + ' ' + user[0].lastname,
            })
            var snapshot1 = await firebase.database().ref('/Resume').orderByChild('email').equalTo(email).once('value');
            var resumeData = Object.entries(snapshot1.val()).map(item => ({ ...item[1], key: item[0] }));
            console.warn(resumeData);
            this.setState({
                Address : resumeData[0].Address,
                Contact : resumeData[0].Contact,
                Domain : resumeData[0].Domain,
                Education : resumeData[0].Education,
                Skills : resumeData[0].SkillSet,
            })
        } catch (error) {
        }
    }
    editProfile(){
        this.setState({
            Edit:true,
        });
    }
    updateProfile(){
        this.setState({
            Edit:false,
        });
        alert("Profile Updated Sucessfully");
        
    }

    render() {
        return (
            <ScrollView>
            <SafeAreaView style={styles.parent}>
                
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8'/*'#0942c0'*/, '#0f1654']} style={{ flex: 12.5 }}>
                    <View>
                        <Text style={styles.fontstyle}>
                            Profile
                        </Text>
                    </View>
                </LinearGradient>

                <Card style={styles.card} elevation={7}>
                <Card.Title title="Personal Details"/>
                    <TextInput mode='flat' label='Full Name' theme={{ colors: { primary: '#1976d2' } }} editable={this.state.Edit} style={styles.input}  value={this.state.Fullname} />
                    <TextInput mode='flat' label='Email' theme={{ colors: { primary: '#1976d2' } }} editable={this.state.Edit} style={styles.input}  value={this.state.Email} keyboardType='email-address'  />
                    <TextInput mode='flat' label='Contact Number' theme={{ colors: { primary: '#1976d2' } }} editable={this.state.Edit} style={styles.input} value={this.state.Contact} />
                    <TextInput mode='flat' label='Address' theme={{ colors: { primary: '#1976d2' } }} multiline={true} editable={this.state.Edit} style={styles.inputlast} value={this.state.Address} />                  
                </Card>

                <Card style={styles.card2} elevation={7}>
                    <Card.Title title="Education"/>
                            <TextInput mode='flat' style={styles.input} label='Degree' theme={{ colors: { primary: '#1976d2' } }} editable={this.state.Edit}  value={this.state.Education} />
                            <TextInput mode='flat' style={styles.input} label='Field of study' theme={{ colors: { primary: '#1976d2' } }} editable={this.state.Edit}  value={this.state.Domain} />
                            <TextInput mode='flat' style={styles.input} label='Skills' theme={{ colors: { primary: '#1976d2' } }} multiline={false} editable={this.state.Edit} value={this.state.Skills} />
                            <View style={styles.row_Dir}>
                                
                            <Button mode='outlined' style={styles.button} labelStyle={styles.btntext} onPress={() =>this.editProfile() }>Edit Profile</Button>
                            <Button mode='outlined' style={styles.button1} labelStyle={styles.btntext} onPress={() =>this.updateProfile() } >Update Profile</Button>
                            </View>
                </Card>
                
            </SafeAreaView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1.5,
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
        marginVertical: 3,
        marginHorizontal: 10,
        backgroundColor: '#e8eaf6',
        height:hp('8%')
    },
    inputlast:{
        marginVertical: 3,
        marginHorizontal: 10,
        backgroundColor: '#e8eaf6',
        height:hp('8%'),
        //marginBottom:-3,
    },
    input1: {
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#e8eaf6',
        marginTop: 10,
        height:hp('8%')
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        padding: 1.5,
        backgroundColor: '#00227b',
        marginTop: 15,
        marginLeft: 5,
        marginRight: 185,
        marginBottom: 25,
        borderRadius: 30,
        height: hp('7%')
    },
    button1: {
        alignSelf: 'center',
        alignItems: 'center',
        padding: 1.5,
        backgroundColor: '#00227b',
        marginTop: 15,
        marginLeft: -155,
        //marginRight: 185,
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
        height: hp('47%'),
        marginTop: 10,
        //marginBottom: 5,
        borderRadius: 10,
    },
    card2:
    {
        marginHorizontal: 10,
        height: hp('55%'),
        marginTop: 10,
        //marginBottom: 5,
        borderRadius: 10,
    },
    text1: {
        marginTop: 25,
        marginLeft: 140
    },
    row_Dir:{
        flexDirection:'row',
        marginTop:4,
    },

});
export default SeekerProfile;