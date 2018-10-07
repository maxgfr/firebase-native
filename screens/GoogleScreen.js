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

import Firebase from '../lib/firebase';

export default class GoogleScreen extends React.Component {
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
            <TouchableOpacity style={styles.buttonContainer}
                           onPress={this.onButtonPress}>
                   <Text style={styles.buttonText}>Log in with Google</Text>
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
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 25,
        paddingHorizontal: 25
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }
});
