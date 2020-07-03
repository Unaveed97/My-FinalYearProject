import React, { Component } from 'react'
import { Text,  StyleSheet, View, AsyncStorage, FlatList } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { List, ListItem, SearchBar } from "react-native-elements";
import Detail from './jobDetail'
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { ActivityIndicator, Colors ,Title} from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
export class recommendation_seeker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        //this.fetchData = this.fetchData.bind(this)
    }
    async componentDidMount() {

        // var list=['a','b','c']
        // this.setState({data: list})
        //alert(this.state.data)
        var user = await AsyncStorage.getItem('user');
        var list = [];
        await fetch('http://mustafaijaz.pythonanywhere.com/seeker/' + user).then(async response => await response.json()).then(
            response => {
                
                //console.warn(response.users)
                //list = response.users;
                //alert(list)
                this.setState({ data: response.users });
            }

        );
        //alert(this.state.data)
        // if(this.state.data==null)
        // {
        //     alert("No Job matches the required criterion yet");
        //     return
        // }
        //alert(this.state.data)
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

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />;
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
    routeToDetail(item,key)
    {
        this.props.navigation.navigate('Form2',{
            email:item,
            key:key
        });
    }
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
         console.disableYellowBox = true;
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#e0e0e0', '#3949ab', '#e0e0e0']} style={{ flex: 2.5 }}>
                       
            <View>
                <Title style={styles.loginSty} >Select a Job to view its Details</Title>
                <FlatList
                    style={styles.flatlist}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <ListItem
                                //roundAvatar
                                title={item.jobTitle}
                                subtitle={"Recruiter email: "+item.email}
                                //avatar={<UserAvatar size="10" name={item.jobTitle} />}
                                containerStyle={{ borderBottomWidth: 0}}
                                onPress={() => this.routeToDetail(item.email,item.key)}
                            />
                        </TouchableOpacity>
                        // <View>
                        // <Text>
                        //     {item.email}
                        // </Text>
                        // <Text>{item.jobTitle}</Text></View>
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
    parent: {
        flex: 1,
    },
    text:
    {
        fontSize: 50,
        marginLeft: 50
    },
    loginSty: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#1a237e',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,

    }
    ,
    flatlist:{
        //backgroundColor:'#e1f5fe',
        //marginHorizontal:10,
        //width:widthPercentageToDP('95%')
    }
});
const Temp_stack = createStackNavigator(
    {
        Form1: { screen: recommendation_seeker },
        Form2: { screen: Detail },
    },
    {
        headerMode: 'none'
    }
);
const Jobs = createAppContainer(Temp_stack);
export default Jobs;
