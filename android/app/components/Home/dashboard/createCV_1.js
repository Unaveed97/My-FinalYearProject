import React, { Component } from 'react'
import { View, KeyboardAvoidingView, Picker, ProgressBarAndroid, Text, StyleSheet, Image, Alert, TouchableOpacity, Platform, SafeAreaView, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TextInput, Button } from 'react-native-paper';
import { Card } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import CreateCV_2  from './createCV_2'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

class createCV_1 extends Component {
    state = { SkillSet: "", Education: "", Domain: "", WorkingExperience: "", progressVal: 0 }

    checkInputs() {
        const { SkillSet, Education, Domain, WorkingExperience } = this.state;
        if (Education == "") {
            Alert.alert('Error', 'Invalid Title', [{ text: 'OK' }])
            return;
        }
        if (Domain == "") {
            Alert.alert('Error', 'Invalid Location', [{ text: 'OK' }])
            return;
        }
        if (SkillSet == "") {
            Alert.alert('Error', 'Invalid Education', [{ text: 'OK' }])
            return;
        }
        if (WorkingExperience == "") {
            Alert.alert('Error', 'Invalid WorkingExperties', [{ text: 'OK' }])
            return;
        }
        this.props.navigation.navigate('Form2', {
            Education: this.state.Education,
            Domain: this.state.Domain,
            SkillSet: this.state.SkillSet,
            WorkingExperience: parseInt(this.state.WorkingExperience),

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
                    <Picker
                        style={styles.input1}
                        selectedValue={this.state.Education}
                        onValueChange={(itemValue) => this.setState({ Education: itemValue, progressVal: 0.125 })}
                    >
                        <Picker.Item label="Highest Level of Education Achieved" value="" />
                        <Picker.Item label="Bachelor's" value="bachelor" />
                        <Picker.Item label="Master's" value="masters" />
                    </Picker>

                    <Picker
                        style={styles.input1}
                        selectedValue={this.state.Domain}
                        onValueChange={(itemValue, itemIndex) => this.setState({ Domain: itemValue, progressVal: 0.25 })}
                    >
                        <Picker.Item label="Domain of Experties" value="" />
                        <Picker.Item label="Engineeing" value="engineering" />
                        <Picker.Item label="Business" value="business" />
                        <Picker.Item label="Computer Sciences" value="computer sciences" />
                        <Picker.Item label="Biological Sciences" value="biological sciences" />
                        <Picker.Item label="Mass Communication" value="mass communication" />
                        <Picker.Item label="Architecture" value="architecture" />
                    </Picker>


                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='Skills (comma seperated)' value={this.state.SkillSet} onChangeText={text => this.setState({ SkillSet: text, progressVal: 0.375 })} />
                    <TextInput mode='flat' theme={{ colors: { primary: '#1976d2' } }} style={styles.input1} label='Working Experience (in years)' value={this.state.WorkingExperience} onChangeText={text => this.setState({ WorkingExperience: text, progressVal: 0.5 })} />

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
    input1: {
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#e8eaf6',
        marginTop: 15
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
const Temp_stack = createStackNavigator(
    {
        Form1: { screen: createCV_1 },
        Form2: { screen: CreateCV_2 },
    },
    {
        headerMode: 'none'
    }
);
const CvForm = createAppContainer(Temp_stack);
export default CvForm;
