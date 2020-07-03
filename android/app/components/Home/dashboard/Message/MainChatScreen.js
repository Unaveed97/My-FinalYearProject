import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from './HomeScreen'
//import LoginScreen from './Screens/LoginScreen';
//import AuthLodingScreen from './Screens/AuthLodingScreen'
import ChatScreen from './chatScreen';
import ProfileScreen from './Profilescreen';
//import MapsScreen from './Screens/MapScreen'

console.disableYellowBox = true;

const AppStack = createStackNavigator({
  //Maps:MapsScreen,
  Home: HomeScreen,
  Chat: ChatScreen,
})

AppStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = navigation.state.index === 0 
  return { 
    tabBarVisible
  }
}

const AuthStack = createStackNavigator({ Login: LoginScreen })

const TabNavigator = createBottomTabNavigator({
  Chats: AppStack,
  ProFile: ProfileScreen
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focuesd, horizontal, tintColor }) => {
      const { routeName } = navigation.state
      let imageName = require('../../../../assets/Chats.png')
      if (routeName === 'ProFile') {
        imageName = require('../../../../assets/settings.png')
      }
      return <Image source={imageName} style={{ width: 25, resizeMode: 'contain', tintColor }} />
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  }
})


export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLodingScreen,
  App: TabNavigator,
  Auth: AuthStack
},
  {
    initialRouteName: 'Home'
  }))