import React, { Component } from 'react'
import { View, ProgressBarAndroid,AsyncStorage, Text, StyleSheet, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button } from 'react-native-paper';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'firebase'

export default class createCV_2 extends Component {
    state = { InterPersonalSkills: "", Address: "", Contact: "",  progressVal: 0.5 }
    
   Prevbtn(){
    this.props.navigation.navigate('Form1');
   }
   async checkInputs() {
        const { InterPersonalSkills, Address, Contact } = this.state;
        if (InterPersonalSkills == "") {
            Alert.alert('Error', 'Invalid Inter Personal Skills', [{ text: 'OK' }])
            return;
        }
        if (Address == "") {
            Alert.alert('Error', 'Invalid Address', [{ text: 'OK' }])
            return;
        }
        if (Contact == "") {
            Alert.alert('Error', 'Invalid Contact', [{ text: 'OK' }])
            return;
        }
        //alert(this.props.navigation.state.params.SkillSet);
        
        try {
            var user=await AsyncStorage.getItem('user');
            var email=await AsyncStorage.getItem('email')
            firebase.database().ref('Resume/').child('/' +"Resume "+user+'/').update({
                email,
                Education:this.props.navigation.state.params.Education,
                Domain:this.props.navigation.state.params.Domain,
                SkillSet:this.props.navigation.state.params.SkillSet,
                WorkingExperience:this.props.navigation.state.params.WorkingExperience,
                InterPersonalSkills,
                Address,
                Contact,
                wokingExpAvg:0,
                skillsAvg:0,
                educationAvg:0,
                distance:0
            }).then(
                this.props.navigation.navigate('Seeker')    
                );
                alert('Resume Creation Successfull!')
        } catch (error) {
            alert(error);    
        }


        


        /*this.props.navigation.navigate('Form2', {
            JobTitle: this.state.JobTitle,
            Joblocation: this.state.Joblocation,
            Education: this.state.Education,
            WorkingExperties: this.state.WorkingExperties,

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
    }
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
         console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.parent}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8'/*'#0942c0'*/, '#0f1654']} style={{ flex: 12.5 }}>
                    <View >
                        <Image style={styles.logo} source={require('../../../assets/mcLogo.png')}></Image>
                        <Text style={styles.fontstyle}>Create CV</Text>
                    </View>
                </LinearGradient>

                <Card style={styles.card} elevation={7}>
                    
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='Contact No.' value={this.state.Contact} onChangeText={text => this.setState({ Contact: text, progressVal: 0.625 })} />
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='Address' value={this.state.Address} onChangeText={text => this.setState({ Address: text, progressVal: 0.875 })} />
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='InterPersona Skills (comma seperated)' value={this.state.InterPersonalSkills} onChangeText={text => this.setState({ InterPersonalSkills: text, progressVal: 1 })} />

                    <Text style={styles.text1}>Page 2/2</Text>
                    <ProgressBarAndroid style={styles.progress} styleAttr='Horizontal' indeterminate={false} progress={this.state.progressVal} />
                    <View style={styles.row_Dir}>
                    <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={() => this.Prevbtn()}>Prev</Button>
                    <Button style={styles.nextButton} labelStyle={styles.btnnexttext} mode='outlined' onPress={() => this.checkInputs()}>Create CV</Button>
                        
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
    input1: {
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#e8eaf6',
        marginTop: 15
    },
    button: {
        //alignSelf: 'stretch',
        alignItems: 'center',
        padding: 2,
        backgroundColor: '#00227b',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 25,
        borderRadius: 30,
        height: hp('7%')
    },
    nextButton:{
        alignItems: 'center',
        padding: 2,
        //backgroundColor: '#00227b',
        marginTop: 10,
        marginLeft: 90,
        marginRight: 10,
        marginBottom: 25,
        borderRadius: 30,
        height: hp('7%'),
        borderColor:'#5c6bc0',
        borderWidth:3
    },
    btnnexttext:{
        color: '#3f51b5',
        fontWeight:'bold'
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
    },
    row_Dir:{
        flexDirection:'row',
        marginTop:10
    },
});