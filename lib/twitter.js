import firebase from 'react-native-firebase';
//twitter login
import {
    NativeModules
} from 'react-native';
const { RNTwitterSignIn } = NativeModules;
const config = {
    consumer_key: "YYYYYYYY",
    consumer_secret: "ZZZZZZZ"
};

export const linkTwitterAccount = async ()=> {


    RNTwitterSignIn.init(config.consumer_key, config.consumer_secret);

    let linkToTwitterResult;
    let twitterTokensObject;
    let loginData;
    //get credentials

    try{
        loginData = await RNTwitterSignIn.logIn();
        console.log("Twitter login data", loginData);
    }catch(err){
        console.log("Error with twitter login result",error);
    }

    //link to react native firebase

    try{

        const { authToken, authTokenSecret } = loginData;
        const user = firebase.auth().currentUser;
        // create a new firebase credential with the token
        const twitterCredential = firebase.auth.TwitterAuthProvider.credential(authToken,authTokenSecret);
        console.log(twitterCredential);

        // link to this account with credential
        const linkingResult = await user.linkAndRetrieveDataWithCredential(twitterCredential);
        console.log("Success Linking twitter",linkingResult);
    }catch(err){
        console.log("Error linking account",err);
    }

}
