import React, { Component } from 'react';
import {
    View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Dimensions, Animated, Platform, Keyboard, Image, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import firebase from 'firebase'

import User from './User'
import { FlatList } from 'react-native-gesture-handler';

console.disableYellowBox = true;
const isIOS = Platform.OS === 'ios'

export default class ChatScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            person: {
                name: props.navigation.getParam('firstname'),
                lastname: props.navigation.getParam('lastname'),
                email: props.navigation.getParam('email'),
            },
            textmessage: '',
            messageList: [],
            dbRef: firebase.database().ref('messages')
        }
        this.keyboardHeight = new Animated.Value(0)
        this.bottomPadding = new Animated.Value(60)
    }
    static navigationOptions = {
        header: null
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('firstname', null)
        }
    }

    componentDidMount() {
        this.KeyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow', (e) => this.keyboardEvent(e, true))
        this.KeyboardHideListener = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide', (e) => this.keyboardEvent(e, false))
        this.state.dbRef.child(User.Username).child(this.state.person.name).on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
        console.log('hello kasa ho',this.state.person)
    }

    componentWillUnmount() {
        this.state.dbRef.off()
        this.KeyboardShowListener.remove()
        this.KeyboardHideListener.remove()
    }

    keyboardEvent = (event, isShow) => {
        let heightOS = isIOS ? 60 : 80
        let bottomOS = isIOS ? 120 : 140
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: isShow ? heightOS : 0
            }),
            Animated.timing(this.bottomPadding, {
                duration: event.duration,
                toValue: isShow ? bottomOS : 60
            })
        ]).start()
    }

    handelChange = key => val => {
        this.setState({ [key]: val })
    }

    convertTime = (time) => {
        let d = new Date(time)
        let c = new Date()
        let result = (d.getHours() < 10 ? '0' : ' ') + d.getHours() + ':'
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        if (c.getDay !== d.getDay) {
            result = d.getDay() + ' ' + d.getMonth + ' ' + result
        }
        return result
    }

    sendMessage = async () => {
        if (this.state.textmessage.length > 0) {
            let msgId = this.state.dbRef.child(User.Username).child(this.state.person.name).push().key
            let updates = {}
            let message = {
                message: this.state.textmessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.email
            }
            updates[User.Username + '/' + this.state.person.name + '/' + msgId] = message
            updates[this.state.person.name + '/' + User.Username + '/' + msgId] = message
            this.state.dbRef.update(updates)
            this.setState({ textmessage: '' })
        }
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                maxWidth: '60%',
                alignSelf: item.from === User.email ? "flex-end" : "flex-start",
                backgroundColor: item.from === User.email ? "#00897b" : "#7cb342",
                borderRadius: 5,
                marginBottom: 10,
            }}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>{this.convertTime(item.time)}</Text>
            </View>
        )
    }


    render() {
        let { height } = Dimensions.get('window')
        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                <Animated.View style={[styles.bottomBar, { bottom: this.keyboardHeight }]}>
                    <TextInput
                        style={styles.inputMessage}
                        value={this.state.textmessage}
                        placeholder="Type Message ..... "
                        onChangeText={this.handelChange('textmessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={styles.sendBtn}>
                        <Image source={require('../Images/send.png')} style={{ tintColor: 'white', resizeMode: 'contain', height: 20 }} />
                    </TouchableOpacity>
                </Animated.View>
                <FlatList
                    ListHeaderComponent={() => <Text style={{ fontSize: 30, marginVertical: 10, marginLeft: 10, fontWeight: 'bold' }}>{this.state.person.name} {this.state.person.lastname}</Text>}
                    ref={ref => this.flaList = ref}
                    onContentSizeChange={() => this.flaList.scrollToEnd({ animated: true })}
                    onLayout={() => this.flaList.scrollToEnd({ animated: true })}
                    style={{ paddingTop: 5, paddingHorizontal: 5, height }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<Animated.View style={{ height: this.bottomPadding }} />}
                />
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: hp('100%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        marginBottom: 10,
        borderRadius: 10,
    },
    inputMessage: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '85%',
        marginBottom: 10,
        borderRadius: 20,
    },
    BtnText: {
        color: 'darkblue',
        fontSize: 20
    },
    bottomBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        height: 60,
    },
    sendBtn: {
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
        height: 40,
        width: 40,
        paddingTop: 10,
        paddingLeft: 5,
        backgroundColor: '#2196F3',
        borderRadius: 20
    },
})

