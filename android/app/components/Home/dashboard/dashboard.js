import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Entypo';
import MyComponent from './card';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import PostJob3 from './Postjob';
import { Card, Button, Title } from 'react-native-paper';
import { DrawerNavigator } from 'react-navigation';
import RecruiterProfileView from './Profile/RecuiterProfile';
import ChatRec from './InAppChat/SeekerHomeScreen';
export class Home extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#c5cae9' }}>
                <Text style={styles.dashboard}>DASHBOARD</Text>
                <Card elevation={8} style={styles.cardStyle} onPress={() => this.props.navigation.navigate('Postjob_1')}>
                    <Image style={styles.imgStyle} source={require("../../../assets/we-are-hiring1.jpg")} />
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Postjob_1') }} >
                        <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => this.props.navigation.navigate('Postjob_1')}>Post Job</Button>
                    </TouchableOpacity>
                </Card>
                <View style={styles.space}>
                </View>
                <Card elevation={8} style={styles.cardStyle} onPress={() => { this.props.navigation.navigate('Candidates') }}>
                    <Image style={styles.imgStyle} source={require("../../../assets/Shortlisted.jpg")} />
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Candidates') }}>
                        <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => { this.props.navigation.navigate('Candidates') }}>View Shortlisted Candidates</Button>
                    </TouchableOpacity>
                </Card>
                <View style={styles.space}>
                </View>
                <Card elevation={8} style={styles.cardStyle} onPress={() => { this.props.navigation.navigate('CandidateSelection') }}>
                    <Image style={styles.imgStyle} source={require("../../../assets/selected.jpeg")} />
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('CandidateSelection') }}>
                        <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => { this.props.navigation.navigate('CandidateSelection') }}>View Selected Candidates</Button>
                    </TouchableOpacity>
                </Card>
            </ScrollView>
        );
    }
}
export class Messages extends Component {
    render() {
        return (
            <ChatRec />
        );
    }
}
export class Profile extends Component {
    render() {
        return (
            <View >
                <RecruiterProfileView />
            </View>
        );
    }
}
const MyApp = createMaterialTopTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" color={tintColor} size={24} />
            )
        }
    },

    setting: {
        screen: ChatRec,
        navigationOptions: {
            tabBarLabel: 'inbox',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="chat" color={tintColor} size={24} />
            )
        }
    },
    profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="users" color={tintColor} size={24} />
            )

        }
    },
}, 
{
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'lightslategrey',
        showIcon: true,
        style:
        {
            backgroundColor: '#001064',
            flex: 0,
        },
    },
});

const styles = StyleSheet.create({
    dashboard: {
        margin: 25,
        fontSize: 25,
        fontWeight: 'bold',
    },
    cardStyle: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        marginHorizontal: 10,
        marginVertical: 10,
        width: wp('85%'),
        height: hp('35'),
    },
    textStyle: {
        alignItems: 'center',
        alignContent: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        textAlign: 'center',

    },
    space: {
        marginVertical: 10,
    },
    paperbtn: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 8,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 30,
        marginBottom: 15,
        height: hp('8.5%'),
        borderColor: '#1a237e',
        borderWidth: 3,
    },
    papertext: {
        color: '#3949ab',
        fontWeight: 'bold'
    },
});

const MainNavigator = createAppContainer(MyApp);
export default MainNavigator;
