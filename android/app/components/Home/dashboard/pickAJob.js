import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList,TouchableOpacity,AsyncStorage } from 'react-native'
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from "firebase";
import LinearGradient from 'react-native-linear-gradient';
import { Button,ActivityIndicator,Title } from "react-native-paper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var key=null;
export default class pickAJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    async getJobs() {
        const snapshot = await firebase.database().ref('Selected/').orderByChild('jobTitle').equalTo(key).once('value');
        var user = Object.entries(snapshot.val()).map(item => ({ ...item[1], key: item[0] }));
        this.setState({ data: user })
        //alert(this.state.data)
        //console.warn(this.state.data)
        if (this.state.data==null)
        {
            alert("No jobs found yet")
        }
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
    UNSAFE_componentWillMount()
    {
        //alert("pick")
        key = this.props.navigation.state.params.key;
        this.getJobs()
    }
    

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
    render() {
        // console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        // console.disableYellowBox = true;
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#e0e0e0', '#3949ab', '#e0e0e0']} style={{ flex: 2.5 }}>
                <View>
                <Title style={styles.loginSty} >Selected Candidates for the Job</Title>
               
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <ListItem
                                    //roundAvatar
                                    title={"Candidate Email: "+item.email_seeker}
                                    subtitle={"Selection Date: " + item.current}
                                    //avatar={<UserAvatar size="10" name={item.jobTitle} />}
                                    containerStyle={{ borderBottomWidth: 0 }}
                                    
                                    bottomDivider
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
    
    nextButton:{
        alignItems: 'center',
        padding: 2,
        borderColor:'#5c6bc0',
        borderWidth:3,
        marginTop: 2,
        marginLeft: 20,
        //marginRight: 10,
        //marginBottom: 25,
        borderRadius: 30,
        height: hp('6%'),
    },
    btnnexttext:{
        color: '#3f51b5',
        fontWeight:'bold'
    },
    loginSty: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#1a237e',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,

    }
})
