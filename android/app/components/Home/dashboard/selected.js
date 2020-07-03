import React, { Component } from 'react'
import { Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, View, AsyncStorage } from 'react-native'
import firebase from 'firebase'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";
import { Title } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient';
import pickJob from './pickAJob'

export class selected extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    async UNSAFE_componentWillMount() {
        var email = await AsyncStorage.getItem('email');
        //var email = "Bcd@gmail.com"
        const snapshot = await firebase.database().ref('/Job').orderByChild('email').equalTo(email).once('value');
        var user = Object.entries(snapshot.val()).map(item => ({ ...item[1], key: item[0] }));
        this.setState({ data: user })
        //console.warn(this.state.data)
    }
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };
    renderFooter = () => {

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating={true} color={'#fff'} />
            </View>
        );
    };
    routeToDetail(item, jobTitle) {
        // //alert(item)
        // var job=this.state.data;

        // alert(job)
        this.props.navigation.navigate('Form2', {
            key: item,
            JobTitle: jobTitle
        });
    }
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#e0e0e0', '#3949ab', '#e0e0e0']} style={{ flex: 2.5 }}>
                <View>
                    <Title style={styles.loginSty} >Select a Job to view its Selected Candidates</Title>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <ListItem
                                    //roundAvatar
                                    title={item.JobTitle}
                                    subtitle={"Recruiter email: " + item.email}
                                    //avatar={<UserAvatar size="10" name={item.jobTitle} />}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    onPress={() => this.routeToDetail(item.key, item.JobTitle)}
                                />
                            </TouchableOpacity>

                        )}


                        keyExtractor={item => item.key}
                        ItemSeparatorComponent={this.renderSeparator}
                        //ListHeaderComponent={this.renderHeader}
                        ListFooterComponent={this.renderFooter}
                    />
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    loginSty: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#1a237e',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,

    }
});
const Temp_stack = createStackNavigator(
    {
        Form1: { screen: selected },
        Form2: { screen: pickJob },

    },
    {
        headerMode: 'none'
    }
);


const Jobs = createAppContainer(Temp_stack);
export default Jobs;

