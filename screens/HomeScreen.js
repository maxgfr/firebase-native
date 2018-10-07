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


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleSubmit = () => {
    const value = this.formRef.getValue();
    let firebase = Firebase.getInstance();
    let that = this;
    if (value) {
        firebase.createUser(value)
           .then(function (res) {
               console.log(res);
               that.alertMessage('Success',res.toString());
            })
           .catch(function (error) {
               console.log(error);
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
        <View style={styles.container}>

            <Form ref={c => this.formRef = c} type={User} options={options} />
            <Button title="Sign Up" onPress={this.handleSubmit} />

       </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
        flex:1
  },
});
