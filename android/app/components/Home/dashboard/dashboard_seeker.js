import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Entypo'
import MyComponent from './card.js';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CC1 from './createCV_1';
import { Card, Button, Title } from 'react-native-paper';
import Chat  from './InAppChat/SeekerHomeScreen';
import ProfileView from './Profile/SeekerProfile';
//import Profile1 from './ViewProfile'

//import PickFile from './uploadCV';
export class Home extends Component {
  
  render() {
  //  console.disableYellowBox = true;

    return (

      <ScrollView style={{ flex: 1, backgroundColor: '#c5cae9'/*'#e8eaf6'*/ }}>
        <Text style={styles.dashboard}>DASHBOARD</Text>

        <Card elevation={8} style={styles.cardStyle} onPress={() => this.props.navigation.navigate('CreateCV1')}>
          <Image style={styles.imgStyle} source={require("../../../assets/create_1.jpg")} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateCV1')} >
            <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => { this.props.navigation.navigate('CreateCV1') }}>Create Resume</Button>
          </TouchableOpacity>
        </Card>
        <View style={styles.space}>
        </View>

        <Card elevation={8} style={styles.cardStyle} onPress={() => this.props.navigation.navigate('SeekerResume') }>
          <Image style={styles.imgStyle} source={require("../../../assets/resume.jpg")} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SeekerResume')}>
            <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => this.props.navigation.navigate('SeekerResume')}>Upload Resume</Button>
          </TouchableOpacity>
        </Card>
        <View style={styles.space}>
        </View>

        <Card elevation={8} style={styles.cardStyle} onPress={() => this.props.navigation.navigate('Jobs')}>
          <Image style={styles.imgStyle} source={require("../../../assets/job.jpg")} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Jobs')}>
            <Button style={styles.paperbtn} labelStyle={styles.papertext} mode='outlined' onPress={() => this.props.navigation.navigate('Jobs')}>View Jobs</Button>
          </TouchableOpacity>
        </Card>
        <View style={styles.space}>
        </View>



      </ScrollView>

    );

  }

}

// export class PickJob extends Component {
//   render() {
//     return (
//       <View >
//         <Text>pick a job</Text>
//       </View>
//     );

//   }
// }
export class Messages extends Component {
  render() {
    return (
      <View >
        <Chat/>
      </View>
    );

  }
}

export class Profile extends Component {
  render() {
    return (
      <View >
        <ProfileView/>
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
  // PickaJob: {
  //   screen: PickJob,
  //   navigationOptions: {
  //     tabBarLabel: 'Pick A Job',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="paper-plane" color={tintColor} size={24} />
  //     )
  //   }
  // },
  setting: {
    screen: Chat,
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
}, {
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