import React, { Component } from 'react'
import { View,AsyncStorage, Picker, KeyboardAvoidingView, ProgressBarAndroid, Text, StyleSheet, Image, Alert, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from 'react-navigation-stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'firebase';

class PostJob2 extends Component {
    
    state = { JobTitle: "", JobDescription: "", Joblocation: "", SkillSet: "", Education: "", jobDomain: "",WorkingExperience:"", progressVal: 0.5 }
   constructor(props)
   {
       super(props)
   }
   Prevbtn(){
    this.props.navigation.navigate('Form1');
   }

    async checkInputs() {
        const { JobTitle, JobDescription, Joblocation,Education,jobDomain,WorkingExperience,SkillSet} = this.state

        if (SkillSet == "") {
            Alert.alert('Error', 'Invalid SkillSet', [{ text: 'OK' }])
            return;
        }
        if (JobDescription == "") {
            Alert.alert('Error', 'Invalid Description', [{ text: 'OK' }])
            return;
        }
        
        if (WorkingExperience == "") {
            Alert.alert('Error', 'Invalid Description', [{ text: 'OK' }])
            return;
        }

        try {
            var user=await AsyncStorage.getItem('user');
            var email=await AsyncStorage.getItem('email')
            var title=this.props.navigation.state.params.JobTitle;
            var workingExperience=parseInt(WorkingExperience)
            firebase.database().ref('Job/').child('/'+title +" "+user+'/').update({
                email,
                JobTitle:this.props.navigation.state.params.JobTitle,
                Joblocation:this.props.navigation.state.params.Joblocation,
                Education:this.props.navigation.state.params.Education,
                jobDomain:this.props.navigation.state.params.WorkingExperties,
                JobDescription,
                workingExperience,
                SkillSet,
                wokingExpAvg:0,
                skillsAvg:0,
                educationAvg:0,
                distance:0
            }).then(
                    this.props.navigation.navigate('AppDash')    
                );
                alert('Job Posted Successfully!')
        } catch (error) {
            alert(error);    
        }


        /*if (SkillSet == "") {
            Alert.alert('Error', 'Invalid Skillset', [{ text: 'OK' }])
            return;
        }
        if (Education == "") {
            Alert.alert('Error', 'Invalid Education', [{ text: 'OK' }])
            return;
        }
        if (WorkingExperties == "") {
            Alert.alert('Error', 'Invalid WorkingExperties', [{ text: 'OK' }])
            return;
        }*/
        /*this.props.navigation.navigate('RecSignUp2', {
            email1: this.state.email,
            fullname: this.state.fullname,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword,

        });*/
        //alert("signup successful");

        //this.props.navigation.navigate('AppDash');
        /*firebase.database().ref('Recuiter/').push({
            fullname,
            email,
            password,
            confirmpassword,
        });*/
        //console.warn(this.state.fullname+' '+this.state.email+' '+this.state.password+' '+this.state.confirmpassword);
    }//this.props.navigation.navigate('RecSignUp2')
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
         console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.parent}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8'/*'#0942c0'*/, '#0f1654']} style={{ flex: 12.5 }}>
                    <View >
                        <Image style={styles.logo} source={require('../../../assets/mcLogo.png')}></Image>
                        <Text style={styles.fontstyle}>Post Job</Text>
                    </View>
                </LinearGradient>

                <Card style={styles.card} elevation={7}>
                    
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='SkillSet' value={this.state.SkillSet} onChangeText={text => this.setState({ SkillSet: text, progressVal: 0.5 })} />
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='Working Experience (in years)' value={this.state.WorkingExperience} onChangeText={text => this.setState({ WorkingExperience: text, progressVal: 0.75 })} />
                    <TextInput multiline={true} mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Job-Description' value={this.state.JobDescription}  onChangeText={text => this.setState({ JobDescription: text, progressVal:1 })} />
                    <Text style={styles.text1}>Page 2/2</Text>
                    
                    <ProgressBarAndroid style={styles.progress} styleAttr='Horizontal' indeterminate={false} progress={this.state.progressVal} />
                    <View style={styles.row_Dir}>
                    <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={() => this.Prevbtn()}>Prev</Button>
                    <Button style={styles.nextButton} labelStyle={styles.btnnexttext} mode='outlined' onPress={() => this.checkInputs()}>Post Job</Button>
                        
                    </View>
                    
                </Card>

                <View style={{ flex: 2, backgroundColor: '#fffafa' }}>

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
        color: '#e8eaf6',
        marginLeft: 10
    },
    row_Dir:{
        flexDirection:'row',
        marginTop:10
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
    nextButton:{
        alignItems: 'center',
        padding: 2,
        borderColor:'#5c6bc0',
        borderWidth:3,
        marginTop: 10,
        marginLeft: 100,
        marginRight: 10,
        marginBottom: 25,
        borderRadius: 30,
        height: hp('7%'),
    },
    btnnexttext:{
        color: '#3f51b5',
        fontWeight:'bold'
    },
    button: {
        //alignSelf: 'stretch',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#00227b',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 10,
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
        height: hp('70%'),
        marginTop: -10,
        borderRadius: 10,
    },
    progress:
    {
        marginTop: 10,
        marginHorizontal: 10,
        color: '#0f1654',
    },
    text1: {
        marginTop: 25,
        marginLeft: 140,
    }
});
//RS2 = props =>{email}
export default PostJob2;