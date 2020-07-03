import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, AsyncStorage, FlatList } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ChatSeek from './SeekerChatScreen'
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from 'firebase'
import { widthPercentageToDP } from 'react-native-responsive-screen';
export class SeekerHomeScreen extends Component {
    state = {
        keys: []
    }
    async UNSAFE_componentWillMount() {
        var user = await AsyncStorage.getItem('user');
        var snapshot = await firebase.database().ref('messages').child(user).once('value')
        var keys = Object.keys(snapshot.val())
        this.setState({ keys: keys })
        //console.warn(this.state.keys)
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
            </View>
        );
    };
    routeToDetail(item) {
        this.props.navigation.navigate('Form2', { name: item });
    }
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        return (
            <View>
                {/* <Text> textInComponent in seeker home screen </Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Form2') }}>
                    <Text>
                        Press me
                    </Text>
                </TouchableOpacity> */}
                <FlatList
                    style={styles.flatlist}
                    data={this.state.keys}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{height:widthPercentageToDP('20%'),padding:10}}>
                            <ListItem
                                //roundAvatar
                                title={item }
                                containerStyle={{ borderBottomWidth: 0 }}
                                onPress={() => this.routeToDetail(item)}
                            />
                        </TouchableOpacity>

                    )}


                    keyExtractor={item => item}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatlist:{
        fontWeight:'bold',
        //color:'#e1f5fe',
        //marginHorizontal:10,
        //width:widthPercentageToDP('95%')
    }
})
const Temp_stack = createStackNavigator(
    {
        Form1: { screen: SeekerHomeScreen },
        Form2: { screen: ChatSeek },
    },
    {
        headerMode: 'none',
        initialRouteName: 'Form1',
    }
);
const Chat = createAppContainer(Temp_stack);
export default Chat;
// import React, { Component } from 'react'
// import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
// import firebase from 'firebase'
// import SeekerScreen from './SeekerChatScreen'
// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
// export class SeekerHomeScreen extends Component {
//     static navigationOptions = {
//         title: 'Chatter',
//     };

//     state = {
//         name: '',
//     };

//     render() {
//         return (
//             <View>
//                 <Text style={styles.title}>Enter your name:</Text>
//                 <TextInput
//                     style={styles.nameInput}
//                     placeHolder="Flutter God Evan Bacon"
//                     onChangeText={name => this.setState({ name })}
//                     value={this.state.name}
//                 />
//                 <TouchableOpacity onPress={() => {
//                     this.props.navigation.navigate('Form2', { name: this.state.name });
//                 }}>
//                     <Text style={styles.buttonText}>Next</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }

// const offset = 24;

// const styles = StyleSheet.create({
//     title: {
//         marginTop: offset,
//         marginLeft: offset,
//         fontSize: offset,
//     },
//     nameInput: {
//         height: offset * 2,

//         margin: offset,
//         paddingHorizontal: offset,
//         borderColor: '#111111',
//         borderWidth: 1,
//     },
//     buttonText: {
//         marginLeft: offset,
//         fontSize: offset,
//     },
// });
// const Temp_stack23 = createStackNavigator(
//     {
//         SeekerHomeScreen: { screen: SeekerHomeScreen },
//         Form2: { screen: SeekerScreen },
//     },
//     {
//         headerMode: 'none',
//         initialRouteName: 'SeekerHomeScreen'
//     }
// );
// const ChatScreen = createAppContainer(Temp_stack23);
// export default ChatScreen;
// // import React, { Component } from 'react'
// // import {
// //     View,
// //     Text,
// //     TouchableOpacity,
// //     AsyncStorage,
// //     FlatList,
// //     SafeAreaView,
// //     Image,
// //     Dimensions,
// // } from 'react-native';

// // import { List, ListItem, SearchBar } from "react-native-elements";

// // console.disableYellowBox = true
// // export  class SeekerHomeScreen extends Component {
// //     static navigationOptions = {
// //         header: null
// //     }
// //     constructor(props) {
// //         super(props)
// //         this.state = {
// //             users: [],
// //             dbRef: firebase.database().ref('/Seeker'),
// //         }
// //     }

// //     async componentDidMount() {

// //         const snapshot = await firebase.database().ref('/Recruiter').once('value');
// //         var data = Object.entries(snapshot.val()).map(item => ({ ...item[1], key: item[0] }));
// //         this.setState({ users: data })
// //         console.log("hello",data)
// //     }

// //     renderSeparator = () => {
// //         return (
// //             <View
// //                 style={{
// //                     height: 0.5,
// //                     width: "100%",
// //                     backgroundColor: "#CED0CE",
// //                 }}
// //             />
// //         );
// //     };

// //     renderFooter = () => {
// //         return (
// //             <View
// //                 style={{
// //                     paddingVertical: 20,
// //                     borderTopWidth: 1,
// //                     borderColor: "#CED0CE"
// //                 }}
// //             >
// //             </View>
// //         );
// //     };


// //     render() {
// //         const { height } = Dimensions.get('window')
// //         return (
// //             <View >
// //                 <SafeAreaView >
// //                     <FlatList
// //                         ListHeaderComponent={() => <Text style={{ fontSize: 30, marginVertical: 10, marginLeft: 10, fontWeight: 'bold' }}>Chats</Text>}
// //                         data={this.state.users}
// //                         renderItem={({ item }) => (
// //                             <TouchableOpacity >
// //                                 <ListItem
// //                                     title={item.Messages}
// //                                     subtitle={<Text style={{ fontSize: 20,flexDirection:'row' }}>{item.fullname}</Text>}
// //                                     onPress={() => this.props.navigation.navigate('Form2', {
// //                                         name:'Talha',
// //                                         email: item.email
// //                                     })}
// //                                     bottomDivider
// //                                     chevron
// //                                 />
// //                             </TouchableOpacity>
// //                         )}
// //                         keyExtractor={item => item.key}
// //                         ItemSeparatorComponent={this.renderSeparator}
// //                         ListFooterComponent={this.renderFooter}
// //                     />
// //                 </SafeAreaView>
// //             </View>
// //         )
// //     }
// // }

// // // const styles = StyleSheet.create({})
