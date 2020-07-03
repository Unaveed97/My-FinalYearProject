import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Button, TextInput } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import { Tile } from 'react-native-elements';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import FileUploader from "react-firebase-file-uploader";
export default class uploadCV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      file: null,
      name: null,
      type: null,

      data:null
    };
  }

  async Filepicker() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],

      });

      this.setState({
        path: res.uri,
        name: res.name,
        type: res.type,
        file: res
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    };
  }
  checkFile() {
    if (this.state.path === '') {
      alert('Browse the file to upload');
    }
    else {
      // firebase.firestore().
      // collection('Documents').
      // add(res.uri).then(
      //   alert('File Uploaded Sucessfully')
      // )
      const Blob = RNFetchBlob.polyfill.Blob;
      const fs = RNFetchBlob.fs;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
      window.Blob = Blob;

      console.warn(this.state)
      let bucketName = 'resumes'
      let uploadBlob = null;
      let file = this.state.file;
      let type = this.state.type;
      let uri = this.state.path;
      console.warn(file)
      // const data=new FormData();
      // data.append('file_attachment', file);
      let name = 'mahrukh'+'.pdf'

      let storageRef = firebase.storage().ref('/resumes/' + name)
      console.warn(storageRef)
      //let ref=storageRef.child('/resumes/'+name)//.put(file)//.put(this.state.path)
      //console.warn(ref)
      // // let upload = storageRef.put(uri).then(function (snapshot) {
      // //   console.log('Uploaded the file!');
      // // })
      // console.warn(upload)

      fs.readFile(uri, 'base64')
      .then(data => {
        return Blob.build(data, { type:'application/pdf;base64' });
      })
      .then(blob => {
        uploadBlob = blob;
        return storageRef.put(blob, { contentType: 'application/pdf', name: name });
      })
      .then(() => {
        uploadBlob.close()
        return storageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(error => {
        reject(error)
    })
    /*var user = await AsyncStorage.getItem('user');
        var list = [];
        await fetch('http://mustafaijaz.pythonanywhere.com/seeker/' + user).then(async response => await response.json()).then(
            response => {
                
                //console.warn(response.users)
                //list = response.users;
                //alert(list)
                this.setState({ data: response.users });
            }

        );*/
//     var user=await AsyncStorage.getItem('user');
//     var email=await AsyncStorage.getItem('email')
//     firebase.database().ref('Resume/').child('/' +"Resume "+user+'/').update({
//         email,
//         Education:this.props.navigation.state.params.Education,
//         Domain:this.props.navigation.state.params.Domain,
//         SkillSet:this.props.navigation.state.params.SkillSet,
//         WorkingExperience:this.props.navigation.state.params.WorkingExperience,
//         InterPersonalSkills,
//         Address,
//         Contact,
//         wokingExpAvg:0,
//         skillsAvg:0,
//         educationAvg:0,
//         distance:0
//     }).then(
//         this.props.navigation.navigate('Seeker')    
//         );
//         alert('Resume Creation Successfull!')
// } catch (error) {
//     alert(error);    
// }
      // ).on(
      // firebase.storage.TaskEvent.STATE_CHANGED,
      // ()=>{
      //   alert('upload Sccessful')
      // })

      alert('Upload Successful')
  

    }
  }
  render() {
    return (
      <SafeAreaView style={styles.parent}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#e0e0e0', '#6e97e8'/*'#0942c0'*/, '#0f1654']} style={{ flex: 12.5 }}>
          <View >
            <Image style={styles.logo} source={require('../../../assets/mcLogo.png')}></Image>
            <Text style={styles.fontstyle}>Upload File</Text>
          </View>
        </LinearGradient>
        <Card style={styles.card} elevation={7}>
          <TextInput mode='flat' style={styles.input} label='Path' theme={{ colors: { primary: '#1976d2' } }} editable={false} value={this.state.path} />
          <Button style={styles.button} labelStyle={styles.btntext} mode='outlined' onPress={() => this.Filepicker()}>
            Browse
        </Button>
          <Button style={styles.button1} labelStyle={styles.btntext} mode='outlined' onPress={() => this.checkFile()}>
            Upload File
        </Button>
        </Card>
        <View style={{ flex: 8 }}></View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#00227b',
    marginTop: 25,
    marginLeft: 55,
    marginRight: 55,
    marginBottom: 25,
    borderRadius: 30,
    height: hp('7%'),
  },
  button1: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 3,
    backgroundColor: '#00227b',
    marginLeft: 55,
    marginRight: 55,
    marginBottom: 25,
    borderRadius: 30,
    height: hp('7%'),

  },
  logo: {
    width: wp('30.5%'),
    height: hp('9.5%'),
    marginLeft: 125,
    marginBottom: 15,
    marginTop: 20
  },
  fontstyle: {
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#e8eaf6',
    marginLeft: 10
  },
  card:
  {
    marginHorizontal: 10,
    height: hp('42%'),
    marginTop: -10,
    borderRadius: 10,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 30,
    marginVertical: 5,
    marginHorizontal: 15,
    backgroundColor: '#e8eaf6'
  },
});
//<Button style={{ marginLeft:225,marginTop:20,fontSize:15,color:'#1976d2' }} onPress={alert('File Uploaded')}>Upload</Button>