import React, { Component } from 'react'
import { Text, AsyncStorage, StyleSheet, View,Image } from 'react-native'
import firebase from 'firebase'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button, Card } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeProvider } from 'react-native-paper';
var key = null;
var job = null;
export class jobDetail extends Component {

    constructor() {
        super()
        this.state = { education: "", mail: "", Title: "", domain: "", experience: 0, location: "", skills: "", Description: "",key:"" };
        this.applyForJob = this.applyForJob.bind(this)
    }
    async applyForJob() {



        const { Title } = this.state;
        // alert(Title)

        var user = await AsyncStorage.getItem('user');
        var email = await AsyncStorage.getItem('email');
        try {
            firebase.database().ref('Apply/').child('/' + "Apply " + Title + " " + user + '/').update({
                key: key,
                email: email,
                Title: Title
            }).then(
                this.props.navigation.navigate('Seeker')
            );

        } catch (error) {
            alert(error);
        }
        alert('Applied');
    }
    async componentDidMount() {
        key = this.props.navigation.state.params.key;
        //alert(key)
        //alert(key)
        emailKey=this.props.navigation.state.params.email;
        //alert(emailKey)
        var key1=emailKey;
        
        //alert(key1)
        var temp = emailKey.split('@');
        //alert(emailKey)
        this.setState({key:temp[0]})
        //alert(this.state.key)
        //key2=key1
        //         AsyncStorage.setItem('email', email)
        //         AsyncStorage.setItem('user', temp[0]);
        var snapshot = await firebase.database().ref('Job/' + key).once('value');
        //alert(snapshot.val())
        //job=snapshot.val();

        this.setState({
            Title: snapshot.val().JobTitle,
            Description: snapshot.val().JobDescription,
            education: snapshot.val().Education,
            location: snapshot.val().Joblocation,
            skills: snapshot.val().SkillSet,
            mail: snapshot.val().email,
            domain: snapshot.val().jobDomain,
            experience: snapshot.val().workingExperience
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

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.heading} >Job Title: </Text>
                                <View style={styles.container}>
                                    <Text style={styles.heading1}>{this.state.Title.toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                <Text style={styles.heading} >Job Description: </Text>
                                <View style={styles.container}>
                                    <Text style={styles.heading1}>{this.state.Description.toUpperCase()}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                <Text style={styles.heading} >Education: </Text>
                                <View style={styles.container}>

                                    <Text style={styles.heading1}>{this.state.education.toUpperCase() + " " + this.state.domain.toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                <Text style={styles.heading} >Skills: </Text>
                                <View style={styles.container}>
                                    <Text style={styles.heading1}>{this.state.skills}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                <Text style={styles.heading} >Experience: </Text>
                                <View style={styles.container}>
                                    <Text style={styles.heading1}>{this.state.experience+" Years"}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                                <Text style={styles.heading} >Location: </Text>

                                <Text style={styles.heading1}>{this.state.location}</Text>

                            </View>
                            
                        </View>

                        <TouchableOpacity onPress={() => this.applyForJob()}>
                            <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => this.applyForJob()}>Apply</Button>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatS',{name:this.state.key})}>
                            <Text style={{marginLeft:25,marginTop:5,color:'#3949ab'}} onPress={()=>this.props.navigation.navigate('ChatS',{name:this.state.key})}>
                                Ask something from Recruiter?
                            </Text>
                        </TouchableOpacity>
                    </Card.Content>
                </Card>
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create(
    {
        box1: {
            //flex: 2.5,
            //backgroundColor: '#191970',
        },
        cardStyle: {
            marginTop: 40,
            borderRadius: 10,
            marginLeft: 10,
            marginRight: 10,
            height: hp('65%'),
        },
        parent: {
            //flex: 1,
            marginTop: 10,
            marginLeft: 20
        },
        heading:
        {
            marginTop: 3,
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
            marginTop: 30,
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
    }
);
export default jobDetail;