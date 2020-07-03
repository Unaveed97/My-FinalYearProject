/** Splash Screen*/
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,Animated,Easing } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainScreen from './index';
import Login from './login/login'
export class Splash extends Component {
        constructor(props)
        {
            super(props);
            this.state={
                fadeValue: new Animated.Value(0),
                xValue:new Animated.Value(hp('-90'))
            }
        }
        /** Renders our interface*/
        UNSAFE_componentWillMount() {
            /*setTimeout(() => {
                this.props.navigation.navigate('Main')
            }, 2000);*/
            Animated.timing(this.state.xValue,{
                toValue:wp('0%'),
                duration:1400,
                easing:Easing.linear
                
    
            }).start(
                ()=>{
                     
                    this.props.navigation.navigate('Applogin')
                }
            );
        }
        render() {
            return (
                <View style={styles.LogoContainer}>
                    <Animated.Image source={require('../../assets/mcLogo.png')} style={[styles.logo, {bottom:this.state.xValue}]}>
    
                    </Animated.Image>
                    
                    <Animated.View style={{left:this.state.xValue}}>
                        <Text style={styles.font}>We Make Your Career</Text>
                        </Animated.View>                   
                
                </View>
    
            )
        }
    }
    
    /** Style sheet for the app */
    const styles = StyleSheet.create({
        LogoContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: hp('100%'),
            width: wp('100%'),
            backgroundColor: '#e0e0e0',
    
        },
        logo: {
            width: wp('50%'),
            height: hp('16%'),
        },
        title: {
            fontWeight: 'bold',
            fontSize: 30,
            color: 'gray',
            textAlign: 'center',
            marginTop: 5,
            opacity: 0.9
        },
        animationView:
        {
            width:wp('100%'), 
            height:hp('100%')
        },
        font:
        {
            fontSize: 17,
            //fontFamily: 'bold',
            color: '#455a64',
            marginTop:25,
            fontFamily: 'serif'
        }
    });


const Mystack = createSwitchNavigator(
    {
        Welcome: { screen: Splash },
        Applogin: { screen: Login },
    }
);
const Myapp = createAppContainer(Mystack);
export default Myapp;


