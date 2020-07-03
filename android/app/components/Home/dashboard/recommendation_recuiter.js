import React, { Component } from 'react'
import { Text,  StyleSheet, View, AsyncStorage, FlatList } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { List, ListItem, SearchBar } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { ActivityIndicator, Colors,Title } from 'react-native-paper';
import  {widthPercentageToDP as wp}  from 'react-native-responsive-screen';
import { isEmptyStatement } from '@babel/types';

var jobkey=null;
var jobTitle=null;
export class Recommendation_Recruiter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading:1
        }
        //this.fetchData = this.fetchData.bind(this)
    }
    async componentDidMount() {

        // var list=['a','b','c']
        // this.setState({data: list})
        //alert(this.state.data)
         //console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
         console.disableYellowBox = true;
        jobkey = this.props.navigation.state.params.key;
        
        jobTitle = this.props.navigation.state.params.JobTitle;
        //alert(jobTitle)
        var user = await AsyncStorage.getItem('user');
        var list = [];
        await fetch('http://mustafaijaz.pythonanywhere.com/recruiter/' + jobkey).then(async response => await response.json()).then(
            response => {
                
                //console.warn(response.users)
                //list = response.users;
                //alert(list)
                this.setState({ data: response.users });
            }
        );
        // if(isEmptyStatment(this.state.data))
        // {
        //     this.setState({loading:0});
        // }
        // alert(this.state.data)
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
                <ActivityIndicator animating={this.state.loading==1?true:false} color={'#fff'} />
            </View>
        );
    };
    routeToDetail(item,email)
    {
        //alert(item)
        
        this.props.navigation.navigate('Form3',{
            key:item,
            JobTitle:jobTitle,
            job:jobkey,
            email:email
        });
        
    }
    render() {
        console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
         console.disableYellowBox = true;
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#e0e0e0', '#3949ab', '#e0e0e0']} style={{ flex: 2.5 }}>
                       
            <View>
                 <Title style={styles.loginSty} >Select a User to view its Details</Title>
                <FlatList
                    style={styles.flatlist}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <ListItem
                                //roundAvatar
                                title={"Email: "+item.email}
                                subtitle={"Click to view details of the Seeker"}
                                //avatar={<UserAvatar size="10" name={item.jobTitle} />}
                                containerStyle={{ borderBottomWidth: 0}}
                                onPress={() => this.routeToDetail(item.key,item.email)}
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
});
export default Recommendation_Recruiter;
