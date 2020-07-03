import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Keyboard, AsyncStorage, Dimensions, Animated } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
export default class SeekerChatScreen extends Component {

    state = {
        messages: '',
        name: this.props.navigation.state.params.name,
        messageList: [],
        username: '',
        keyboardHeight: new Animated.Value(0),
        keyboardShowListener: '',
        keyboardHideListener: '',
        bottomPadding: new Animated.Value(60)
    };

    async componentDidMount() {
        //alert(this.state)
        this.state.keyboardShowListener = Keyboard.addListener('keyboardDidShow',
            (e) => {this.keyboardEvent(e, true)});
        this.state.keyboardHideListener = Keyboard.addListener('keyboardDidHide',
            (e) => this.keyboardEvent(e, false));
        var user = await AsyncStorage.getItem('user');
        this.setState({ username: user });
        firebase.database().ref('messages').child(user).child(this.state.name).on('child_added',
            (value) => {
                this.setState((prevstate) => {
                    return {
                        messageList: [...prevstate.messageList, value.val()]
                    }
                })
            })
    }
    keyboardEvent = (event, isShow) => {
        Animated.parallel([
            Animated.timing(this.state.keyboardHeight, {
                duration: event.duration,
                toValue: isShow ? 80 : 0
            }),
            Animated.timing(this.state.bottomPadding, {
                duration: event.duration,
                toValue: isShow ? 140 : 0
            })
        ]).start();
    }
    componentWillUnmount() {
        this.state.keyboardShowListener.remove()
        this.state.keyboardHideListener.remove()
    }
    handleChange = key => val => {
        this.setState({ [key]: val });
    }
    sendMessage = async () => {
        var user = await AsyncStorage.getItem('user');
        //   alert(user)
        if (this.state.messages.length > 0) {
            var msgid = firebase.database().ref('messages').child(user).child(this.state.name).push().key;
            let updates = {};
            let message = {
                messages: this.state.messages,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: user
            }
            updates['messages/' + user + '/' + this.state.name + '/' + msgid] = message
            updates['messages/' + this.state.name + '/' + user + '/' + msgid] = message
            firebase.database().ref().update(updates);
            this.setState({ messages: '' })
        }
    }
    renderRow = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: wp('60%'),
                    alignSelf: item.from == this.state.username ? 'flex-end' : 'flex-start',
                    backgroundColor: item.from == this.state.username ? '#5d99c6' : '#004c8c',//b0bec5
                    borderRadius: 5,
                    marginBottom: 10
                }}
            >
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.messages}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }
    convertTime = (time) => {
        let d = new Date(time)
        let c = new Date()
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        if (c.getDay() != d.getDay()) {
            result = d.getDate() + '/' + (d.getMonth() + 1) + ' ' + result
        }
        return result
    }
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
        console.disableYellowBox = true;
        let { height } = Dimensions.get('window')
        return (
            <KeyboardAvoidingView style={{backgroundColor:'#eeeeee',flex:1}}>
                <Animated.View style={[styles.bottomBar, { bottom: this.state.keyboardHeight }]}>
                    <TextInput
                        style={styles.input1}
                        mode='flat'
                        value={this.state.messages}
                        placeholder='Type message ...'
                        onChangeText={this.handleChange('messages')}
                    />
                    <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={this.sendMessage}>Send</Button>

                </Animated.View>

                <FlatList
                    ref={(ref) => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                    onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    style={{ paddingTop: 5, paddingHorizontal: 5, height:height*0.83 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<Animated.View style={{ height: this.state.bottomPadding }} />}
                />

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    input1: {
        marginVertical: 5,
        
        backgroundColor: '#e8eaf6',
        // marginTop: hp('25%'),
        width: wp('80%')
    },
    btntext: {
        color: '#000',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        padding: 2,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 25,
        marginTop:24,
        height: hp('7%')
    },
    bottomBar: {
        zIndex: 2,
        left: 0,
        right: 0,
        position: 'absolute',
        bottom: 0,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    }
})

// import React, { Component } from 'react'
// import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
// import {TextInput} from 'react-native-paper'
// export default class SeekerChatScreen extends Component {
//     state = {
//         messages: '',
//     };
//     handleChange = key => val => {
//         this.setState({ [key]: val });
//     }
//     render() {
//         return (
//             <SafeAreaView>
//                 <TextInput
//                 value={this.state.messages}
//                 placeholder='Type message ...'
//                 onChangeText={this.handleChange('messages')}
//                 />
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({})



// // import React, { Component } from 'react'
// // import { Text, StyleSheet, View } from 'react-native'
// // import { GiftedChat } from 'react-native-gifted-chat';
// // import Fire from './Fire'
// // console.disableYellowBox = true
// // export default class SeekerChatScreen extends Component {
// //     static navigationOptions = ({ navigation }) => ({
// //         title: (navigation.state.params || {}).name || 'Chat!',
// //     });  // 3.
// //     state = {
// //         messages: '',
// //     };
// //     componentDidMount() {
// //         //   if (this.props.chatMessages !== prevProps.chatMessages) {
// //         //       const { chatMessages } = this.props;
// //         //       this.setState(
// //         //         () => {
// //         //           return {
// //         //             messages: GiftedChat.append([], chatMessages)
// //         //           };
// //         //         },
// //         //         () => this.setMessage()
// //         //       );
// //         //     }

// //         Fire.shared.on(message =>
// //             this.setState(previousState => ({
// //                 messages: GiftedChat.append(previousState.messages, message),
// //             }))
// //         );
// //     }
// //     get user() {  
// //         //alert(Fire.shared.uid)
// //         // Return our name and our UID for GiftedChat to parse
// //         return {
// //             name: this.props.navigation.state.params.name,
// //             _id: Fire.shared.uid,
// //         };
// //     }
// //     componentWillUnmount() {
// //         Fire.shared.off();
// //     }

// //     render() {
// //         return (
// //                 <GiftedChat
// //                     messages={this.state.messages}
// //                     onSend={()=>{Fire.shared.send}}
// //                     user={this.user}
// //                 />
// //         )
// //     }
// // }

// // const styles = StyleSheet.create({})
