import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import Firebase from '../lib/firebase';

import t from 'tcomb-form-native'; // 0.6.11

const Form = t.form.Form;

const User = t.struct({
    username: t.maybe(t.String),
    email: t.String,
    password: t.String,
    terms: t.Boolean,
});

const Login = t.struct({
    mail: t.String,
    pwd: t.String,
});

const options = {
  fields: {
    email: {
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    password: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember',
      secureTextEntry: true,
      password: true
    },
    terms: {
      label: "Agree to terms",
    },
  },
};

const options_login = {
  fields: {
    mail: {
      error: 'Il faut un mail'
    },
    pwd: {
      error: 'Un mot de passe est necessaire',
      secureTextEntry: true,
      password: true
    },
  },
};


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleSubmit = () => {
    const value = this.formRef.getValue();
    let firebase = Firebase.getInstance();
    let that = this;
    if (value.email && value.password && value.username) {
        console.log(value.email, value.password, value.username);
        firebase.createUser(value.email, value.password)
           .then(function (res) {
               //console.log(res);
               that.alertMessage('Success',res.toString());
               this.saveUsername(res.user.uid, value.username);
            })
           .catch(function (error) {
               //console.log(error);
               that.alertMessage('Error',error.toString());
           });
    }
  }

  saveUsername(uid, username){
      let firebase = Firebase.getInstance();
      firebase.storeMoreInformation(uid, username);
  }

  loginSubmit = () => {
    const value = this.formRef2.getValue();
    let firebase = Firebase.getInstance();
    let that = this;
    if (value.mail && value.pwd) {
        console.log(value.mail, value.pwd);
        firebase.loginUser(value.mail, value.pwd)
           .then(function (res) {
               //console.log(res);
               that.alertMessage('Success',res.toString());
            })
           .catch(function (error) {
               //console.log(error);
               that.alertMessage('Error',error.toString());
           });
     }
  }

  alertMessage(title, msg) {
     Alert.alert(
        title,
        msg,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
    );
  }

  render() {
    return (

        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>

           <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffff'}}>
               <View style={{marginTop: 50, flex:3}}>
                   <Form ref={c => this.formRef = c} type={User} options={options} />
                   <Button title="Sign Up" onPress={this.handleSubmit} />
              </View>
              <View style={{flex:1, height: 50, backgroundColor: 'skyblue'}}>
              </View>
              <View style={{flex:2}}>
                  <Form ref={c => this.formRef2 = c} type={Login} options={options_login} />
                  <Button title="Sign In"  color="orange" onPress={this.loginSubmit} />
             </View>
          </View>

        </ScrollView>

    );
  }
}
