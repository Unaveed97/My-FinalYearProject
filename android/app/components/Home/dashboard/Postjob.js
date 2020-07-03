import React, { Component } from 'react'
import { View, KeyboardAvoidingView, Picker, ProgressBarAndroid, Text, StyleSheet, Image, Alert, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Header } from 'react-navigation-stack';
import { TextInput, Button } from 'react-native-paper';
import { NavigationActions, StackActions } from 'react-navigation';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as firebase from 'firebase';
import PostForm2 from './Postjob2';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

class PostJob extends Component {
    state = { JobTitle: "", JobDescription: "", Joblocation: "", SkillSet: "", Education: "", WorkingExperties: "", progressVal: 0 }

    checkInputs() {
        const { JobTitle, JobDescription, Joblocation, Education, WorkingExperties } = this.state;
        if (JobTitle == "") {
            Alert.alert('Error', 'Invalid Title', [{ text: 'OK' }])
            return;
        }
        if (Joblocation == "") {
            Alert.alert('Error', 'Invalid Location', [{ text: 'OK' }])
            return;
        }
        if (Education == "") {
            Alert.alert('Error', 'Invalid Education', [{ text: 'OK' }])
            return;
        }
        if (WorkingExperties == "") {
            Alert.alert('Error', 'Invalid WorkingExperties', [{ text: 'OK' }])
            return;
        }
        this.props.navigation.navigate('Form2', {
            JobTitle: this.state.JobTitle,
            Joblocation: this.state.Joblocation,
            Education: this.state.Education,
            WorkingExperties: this.state.WorkingExperties,

        });
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
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='Job-Title' value={this.state.JobTitle} onChangeText={text => this.setState({ JobTitle: text, progressVal: 0.125 })} />
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} label='Job-Location' value={this.state.Joblocation} onChangeText={text => this.setState({ Joblocation: text, progressVal: 0.25 })} />

                    <Picker
                        style={styles.input}
                        selectedValue={this.state.Education}
                        onValueChange={(itemValue, itemIndex) => this.setState({ Education: itemValue,progressVal: 0.375 })}
                    >
                        <Picker.Item label="Highest Level of Education Required" value="" />
                        <Picker.Item label="Bachelor's" value="bachelor" />
                        <Picker.Item label="Master's" value="masters" />
                    </Picker>
                    
                    <Picker
                        style={styles.input}
                        selectedValue={this.state.WorkingExperties}
                        onValueChange={(itemValue, itemIndex) => this.setState({ WorkingExperties: itemValue,progressVal: 0.5 })}
                    >
                        <Picker.Item label="Job Domain" value="" />
                        <Picker.Item label="Engineeing" value="engineering" />
                        <Picker.Item label="Business" value="business" />
                        <Picker.Item label="Computer Sciences" value="computer sciences" />
                        <Picker.Item label="Biological Sciences" value="biological sciences" />
                        <Picker.Item label="Mass Communication" value="mass communication" />
                        <Picker.Item label="Architecture" value="architecture" />
                    </Picker>


                    <Text style={styles.text1}>Page 1/2</Text>
                    <ProgressBarAndroid style={styles.progress} styleAttr='Horizontal' indeterminate={false} progress={this.state.progressVal} />

                    <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={() => this.checkInputs()}>Next</Button>


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
        //alignSelf: 'stretch',
        //alignItems: 'center',
        padding: 2,
        backgroundColor: '#00227b',
        marginTop: 10,
        marginLeft: 195,
        marginRight: 10,
        marginBottom: 25,
        borderRadius: 40,
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
const Temp_stack = createStackNavigator(
    {
        Form1: { screen: PostJob },
        Form2: { screen: PostForm2 },
    },
    {
        headerMode: 'none'
    }
);
const JobForm = createAppContainer(Temp_stack);
export default JobForm;

/*

                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} value={this.state.Education} label='Education-Required' onChangeText={text => this.setState({ Education: text, progressVal: 0.375 })} />
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input} value={this.state.WorkingExperties} label='Working-Expertise' onChangeText={text => this.setState({ WorkingExperties: text, progressVal: 0.5 })} />
*/ 