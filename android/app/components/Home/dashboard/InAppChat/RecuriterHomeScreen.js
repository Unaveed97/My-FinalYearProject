import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import firebase from 'firebase'

import User from './User'

console.disableYellowBox = true

export default class RecuriterChatHomeScreen extends Component {

    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            dbRef: firebase.database().ref('/Seeker'),
        }
    }

    async componentDidMount() {
        const snapshot = await firebase.database().ref('/Seeker').once('value');
        var data = Object.entries(snapshot.val()).map(item => ({ ...item[1], key: item[0] }));
        this.setState({ users: data })
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "#CED0CE",
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

    
    render() {
        const { height } = Dimensions.get('window')
        return (
            <View >
                <SafeAreaView >
                    <FlatList
                        ListHeaderComponent={() => <Text style={{ fontSize: 30, marginVertical: 10, marginLeft: 10, fontWeight: 'bold' }}>Chats</Text>}
                        data={this.state.users}
                        renderItem={({ item }) => (
                            <TouchableOpacity >
                                <ListItem
                                    title={item.Messages}
                                    subtitle={<Text style={{ fontSize: 20,flexDirection:'row' }}>{item.firstname + ' ' + item.lastname}</Text>}
                                    onPress={() => this.props.navigation.navigate('Chat', item)}
                                    bottomDivider
                                    chevron
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.key}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListFooterComponent={this.renderFooter}
                    />
                </SafeAreaView>
            </View>
        )
    }
}