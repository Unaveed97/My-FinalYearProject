import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import PostJob4 from './Postjob';
class MyComponent extends React.Component {
    state = { varible: "" }
    constructor(props)
    {
        super(props);
        //this.state = props.state;
    }
    
    test(){
        this.props.navigation.navigate('PostJob4');
        
    }
    render() {
        return (

            <View style={styles.container}>
                <Card button onPress={() => this.test()}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={this.props.imageUri}
                            style={{
                                flex: 1,
                                height: hp('35%'),
                                width: wp('80%'),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                    <View>
                        <Text style={styles.paragraph}>
                            {this.props.name}
                        </Text>
                    </View>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 12,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default MyComponent;