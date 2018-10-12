import React from 'react';
import { StyleSheet, Text, View, Image, Button } from "react-native"
import Expo from "expo"
import Firebase from '../lib/firebase'

export default class FacebookScreen extends React.Component {

    constructor(props) {
     super(props)
     this.state = {
       signedIn: false,
       token: "",
     }
   }

   signIn = async () => {
        let firebase = Firebase.getInstance();
        await firebase.loginWithFacebook(function(result) {
            console.log(result);
          this.setState({
                signedIn: true,
                token: result.token,
           });
        }.bind(this));
   }
   render() {
     return (
       <View style={styles.container}>
         {this.state.signedIn ? (
           <LoggedInPage token={this.state.token}/>
         ) : (
           <LoginPage signIn={this.signIn} />
         )}
       </View>
     )
   }
 }

 const LoginPage = props => {
   return (
     <View>
       <Text style={styles.header}>Sign In With Facebook</Text>
       <Button title="Sign in with Facebook" onPress={() => props.signIn()} />
     </View>
   )
 }

 const LoggedInPage = props => {
   return (
     <View style={styles.container}>
       <Text style={styles.header}>Token :{props.token}</Text>
     </View>
   )
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#fff",
     alignItems: "center",
     justifyContent: "center"
   },
   header: {
     fontSize: 25
   },
   image: {
     marginTop: 15,
     width: 150,
     height: 150,
     borderColor: "rgba(0,0,0,0.2)",
     borderWidth: 3,
     borderRadius: 150
   }
});
