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
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onButtonPress() {
      WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  }

  render() {
    return (
        <View style={styles.loginContainer}>

            <View style={styles.formContainer}>
            <TextInput style = {styles.input}
                     autoCapitalize="none"
                     onSubmitEditing={() => this.passwordInput.focus()}
                     autoCorrect={false}
                     keyboardType='email-address'
                     returnKeyType="next"
                     placeholder='Name'
                     placeholderTextColor='rgba(0, 16, 0, 1)'/>


             <TextInput style = {styles.input}
                      autoCapitalize="none"
                      onSubmitEditing={() => this.passwordInput.focus()}
                      autoCorrect={false}
                      keyboardType='email-address'
                      returnKeyType="next"
                      placeholder='Email or Mobile Num'
                      placeholderTextColor='rgba(0, 16, 0, 1)'/>

            <TextInput style = {styles.input}
                    returnKeyType="go"
                    ref={(input)=> this.passwordInput = input}
                    placeholder='Password'
                    placeholderTextColor='rgba(0, 16, 0, 1)'
                    secureTextEntry/>

            <TouchableOpacity style={styles.buttonContainer}
                           onPress={this.onButtonPress}>
                   <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            </View>
       </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(1,1,1,0)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
