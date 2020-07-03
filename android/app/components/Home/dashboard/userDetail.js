import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image,AsyncStorage} from 'react-native'
import firebase from 'firebase'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, Card,Title } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
var jobTitle=null;
var jobKey=null;
export default class userDetail extends Component {    
    constructor() {
        super()
        this.state = { education: "", mail: "", experience: 0, interPersonalSkills: "", skills: "",domain:"" ,key:""};
        this.selectForJob = this.selectForJob.bind(this)
    }
    async selectForJob() {

   try {
            var flag=0;
            var date=new Date();
            var current=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            var user = await AsyncStorage.getItem('user');
            var email = await AsyncStorage.getItem('email');
            jobTitle=jobTitle+" "+user 
           await firebase.database().ref('Selected/').child('/' + "Selected " + key + " " + user + '/').update({
                seeker_key: key,
                email_seeker: this.state.mail,
                email_recruiter:email,
                flag,
                jobTitle,
                current,
                status: "Selection Request Sent"
            }).then(
                this.props.navigation.navigate('Form2')
            );
                
        alert('Candidate Selected Successfully');
        } catch (error) {
            alert(error);
        }
    }
    async componentDidMount() {
        
        key = this.props.navigation.state.params.key;
        var email = this.props.navigation.state.params.email;
        //this.setState({key:key})
        jobTitle = this.props.navigation.state.params.JobTitle;
        var temp = email.split('@');
        this.setState({key:temp[0]})
        //jobKey = this.props.navigation.state.params.jobkey;
        //alert(key)
        ///alert(jobTitle)
        var snapshot = await firebase.database().ref('Resume/' + key).once('value');
        //alert(snapshot.val())
        //job=snapshot.val();
         //console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
         console.disableYellowBox = true;
        this.setState({
            education: snapshot.val().Education,
            interPersonalSkills: snapshot.val().InterPersonalSkills,
            skills: snapshot.val().SkillSet,
            mail: snapshot.val().email,
            experience: snapshot.val().WorkingExperience,
            domain:snapshot.val().Domain
        });
    }
    
    
    
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
         console.disableYellowBox = true;
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#e0e0e0', '#1a237e', '#e0e0e0']} style={{ flex: 1 }}>
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
                                    //justifyContent: 'center',
                                    alignItems: 'center',
                                    //marginBottom: 20,
                                }} />
                        </View>

                <Card elevation={7} style={styles.cardStyle}>
                    <Card.Content>
                        <View style={styles.parent}>

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.heading} >Education: </Text>
                                <View style={styles.container}>

                                    <Text style={styles.heading1}>{this.state.education.toUpperCase() + " " + this.state.domain.toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.heading} >Skills: </Text>
                                <View style={styles.container}>
                                    <Text style={styles.heading1}>{this.state.skills}</Text>
                                </View>
                            </View>
                            
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.heading} >Inter Personal Skills: </Text>
                                <View style={styles.container}>
                                    <Text style={styles.heading1}>{this.state.interPersonalSkills}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <Text style={styles.heading} >Experience: </Text>
                                <View style={styles.container}>
                                    <Text style={styles.heading1}>{this.state.experience+" Years"}</Text>
                                </View>
                            </View>
                            
                            
                        </View>

                        <TouchableOpacity onPress={() => this.selectForJob()}>
                            <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => this.selectForJob()}>Select Candidate</Button>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatS',{name:this.state.key})}>
                            <Text style={{marginLeft:25,marginTop:2}} onPress={()=>this.props.navigation.navigate('ChatS',{name:this.state.key})}>
                                Want to ask something from User?
                            </Text>
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        marginTop: 40,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        height: hp('60%'),
    },
    parent: {
        //flex: 1,
        marginTop: 20,
        marginLeft: 20
    },
    heading:
    {
        marginTop: 5,
        fontSize: 18
    },

    heading1:
    {
        fontSize: 18,
        marginTop: 5,
        color: '#01579b',
        flexWrap:'wrap'
    },
    paperbtn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 8,
        marginTop: 40,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 30,
        height: hp('8.5%'),
        borderColor: '#1a237e',
        borderWidth: 3,
    },
    papertext: {
        color: '#3949ab',
        fontWeight: 'bold'
    },
    container: {
        width: 0,
        flexGrow: 1,
        flex: 1,
    }
})
