import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Button,
    TouchableWithoutFeedback, StatusBar, Keyboard, FlatList
    , TouchableOpacity, KeyboardAvoidingView, Alert, ProgressBarAndroid, ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon, Container, Header, Content, Left, Card, CardItem, Title, Right } from 'native-base';
//import { NavigationBar } from 'navigationbar-react-native';
import { TextInput } from 'react-native-paper';
import { NavigationActions, StackActions, SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
//import { Dropdown } from 'react-native-material-dropdown';
//import DatePicker from 'react-native-datepicker'
//import ImagePicker from 'react-native-image-picker';
//import ic_menu from '../Images/list.png'
import Drawer from 'react-native-drawer';
//console.disableYellowBox = true;
const menu = [
    { 'title': 'Home' },
    { 'title': 'Wishlist' },
    { 'title': 'About us' },
    { 'title': 'Contact us' },
    { 'title': 'Log out' }
]

export default class Home extends Component {

    state = { avatarSource: null, JobTitle: '', JobDescription: '', SkillSet: '', Education: '', WorkingExperties: '' }
    checkInputs() {
        const { JobTitle, JobDescription, SkillSet, Education, WorkingExperties } = this.state

        if (JobTitle == "") {
            Alert.alert('Error', 'Invalid Job Title', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (JobDescription == "") {
            Alert.alert('Error', 'Invalid Job Description', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (SkillSet == "") {
            Alert.alert('Error', 'Invalid Skill Set', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (Education == "") {
            Alert.alert('Error', 'Invalid Education Feild', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
        if (WorkingExperties == "") {
            Alert.alert('Error', 'Invalid Working Experties', [{ text: 'OK' }])
            return;
        }
        else {
            this.setState({ progressVal: 0.125 });
        }
    }
    constructor(props) {
        super(props)

    }

    /*SelectImage = async () => {
        ImagePicker.showImagePicker({noDare:true,mediaType:"photo"}, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                avatarSource:  response.uri,
                opacity: 0
              });
            }
        });
    }*/

    renderDrawer() {
        //SlideMenu
        return (
            <View style={styles.menuContainer}>
                <FlatList
                    //style={{}}
                    data={menu}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.menuTitleContainer}>
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        )
    }

    openDrawer() {
        this.drawer.open()
    }

    closeDrawer() {
        this.drawer.close()
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#0f1654" barStyle="light-content" />
                <SafeAreaView style={styles.parent}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8'/*'#0942c0'*/, '#0f1654']} style={{ flex: 12.5 }} >
                    <View style={styles.textstyle}>
                             <Text>POST JOB</Text>
                    </View>
                    </LinearGradient>
                    
                    <View>
                        <Drawer
                            ref={(ref) => this.drawer = ref}
                            content={this.renderDrawer()}
                            type='static'
                            tapToClose={true}
                            openDrawerOffset={0.35}
                            styles={drawerStyles}>
                            {/* //Main View */}
                            <View>
                                <View>
                                    <TouchableOpacity
                                        onPress={this.openDrawer.bind(this)}>
                                        <Image style={{ tintColor: 'white', width: wp('11%'), height: hp('05%'), marginTop: 0 }} source={require('../../../assets/index.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </Drawer>    
                            
                            <Card style={styles.card} elevation={7}>
                                <TextInput mode='flat' label='Job Title' value={this.state.JobTitle} onChangeText={text => this.setState({ JobTitle: text, progressVal: 0.125 })} />
                                <TextInput mode='flat' multiline={true}  label='Job Description' value={this.state.JobDescription} onChangeText={text => this.setState({ JobDescription: text, progressVal: 0.125 })} />
                                <TextInput mode='flat'  label='Skill Set' value={this.state.SkillSet} onChangeText={text => this.setState({ SkillSet: text, progressVal: 0.25 })} />
                                <TextInput mode='flat'  label='Education' value={this.state.Education} onChangeText={text => this.setState({ Education: text, progressVal: 0.5 })} />
                                <TextInput mode='flat' multiline={true}  label='Working Experties' value={this.state.WorkingExperties} keyboardType='email-address' onChangeText={text => this.setState({ WorkingExperties: text, progressVal: 0.375 })} />
                            </Card>
                        
                    </View>
                    <View style={{ flex: 2, backgroundColor: '#fffafa' }}>
                </View>
                </SafeAreaView>
            </Container>
        );
    }
}

const drawerStyles = {
    drawer: {
        flex: 1.0,
        backgroundColor: '#0f1654',
    },
    main: {
        flex: 1.0,
        backgroundColor: 'white'
    }
}

const styles = {
    parent: {
        flex: 1,
    },
    textstyle:{
        textAlign:'center',
        alignItems:'center',
        color:'#fff',
        fontSize:20,
        fontWeight:14,
    },
    mainContainer: {
        flex: 1.0,
        backgroundColor: '#0f1654'
    },
    input: {
        marginTop: 10,
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#e8eaf6'

    },
    safeAreaStyle: {
        //flex: 1.0,
        backgroundColor: '#3B5998',
    },
    headerContainer: {
        //height:hp('10%'),
        //flexDirection: 'row',
        //backgroundColor: '#0f1654',
    },
    card:{
        marginHorizontal: 10,
        height: hp('50%'),
        marginTop: -10,
        borderRadius: 10,
    },
    /*linearGradient: {
        width:wp('110%'),
        height:hp('40%'), 
    },*/
    /*headerTitle: {
        flex: 1.0,
        textAlign: 'center',
        color: 'white'
    },**/
    menuButton: {
        marginLeft: 8,
        marginRight: 8,
        tintColor: 'white'
    },
    menuContainer: {
        flex: 1.0,
        backgroundColor: '#0f1654',
    },
    menuTitleContainer: {
        alignItem: 'center',
        height: 60,
        width: '100%',
        flexDirection: 'row',
    },
    menuTitle: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf: 'center',
    },
    HeaderGradient: {
        /*width:wp('110%'),
        height:hp('10%'),*/
    },
    TopCard: {
        //marginTop:-10,
        /*width: wp('100%'),
        height: hp('40%'),
        justifyContent:'center',*/
    },
    AddImage: {
        width: wp('100%'),
        height: hp('40%'),
    },
    MeLogo: {
        /*width:wp('38%'),
        height:hp('19%'),
        //marginTop:-10,
        //marginLeft:-20,
        justifyContent:'center',
        alignSelf:'center',*/
    },
    imageText: {
        /*marginTop:10,
        marginLeft:-30,
        fontSize: 18,
        color: 'rgba(255,255,255,0.6)',
        alignSelf:'center',
        justifyContent:'center',*/
    },
    InfoCard: {
        /*height:hp('65%'),
        width:wp('90%'),
        //marginTop:-140,
        borderRadius:15,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(250,250,250)',*/
        elevation: 10,
    },
    FormCard1: {
        /*height:hp('50%'),
        width:wp('85%'),
        //marginTop:-70,
        backgroundColor:'rgb(245,245,245)',
        borderRadius:15,
        alignSelf:'center',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',*/
    },
    InputFeilds: {
        /*justifyContent:'center',
        alignItems:'center',
        borderRadius:20,*/
    },
    HeadText: {
        /*fontSize:15,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.5)'*/
    },
    input3: {
        /*width:wp('75%'),
        backgroundColor: '#e8eaf6',
        borderColor: 'rgba(0,0,0,0.2)',
        marginTop:15,*/
    },
    input2: {
        marginVertical: 5,
        marginHorizontal: 15,
        backgroundColor: '#e8eaf6'
    },
    BtnCard: {
        /*marginTop:5,
        marginBottom:-60,
        height:hp('12%'),
        width:wp('85%'),
        borderRadius:15,
        backgroundColor:'rgb(245,245,245)',
        elevation:10,*/
    },
    ProgressView: {
        /*justifyContent:'center',
        alignItems:'center',
        flex:1,*/
    },
    progress: {
        /*marginBottom:10,
        width:200,
        alignSelf:'center',
        color:'#0f1654',*/
    },
    ProgressText: {
        /*marginLeft:20,
        marginRight:20,
        alignSelf:'center',*/
    },
    BottomBtnProgress: {
        flexDirection: 'row',
    },
    PrevBtn: {
        /*height:hp('8%'),
        width:wp('30%'),
        borderRadius:20,
        justifyContent:'center',*/
    },
    ProgressBtnText: {
        /*alignSelf:'center',
        fontSize:20,
        fontWeight:'bold',
        color:'white',
        borderRadius:15,*/
    },
    linearGradient3: {
        /*height:hp('8%'),
        width:wp('30%'),
        borderRadius:20,*/
    },

}