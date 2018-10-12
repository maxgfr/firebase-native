import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
const GOOGLE_APP_ANDROID_ID = process.env.GOOGLE_ANDROID_ID
const GOOGLE_APP_IOS_ID = process.env.GOOGLE_IOS_ID

export default class Firebase {

    static myInstance = null;

    /**
     * @returns {Firebase}
     */
    static getInstance() {
        if (Firebase.myInstance == null) {
            Firebase.myInstance = new Firebase();
        }
        return this.myInstance;
    }

    constructor(){
      this.access_token = null;
      firebase.initializeApp(firebaseConfig);
      console.log(firebase);
    }

    createUser(email, password) {
        return new Promise(function (resolve, reject) {
            var uid = '';
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(res) {
                console.log(res);
                resolve(res);
            })
            .catch(function(error) {
              console.log(error);
              reject(error);
            });
        });
    }

    loginUser(email, password) {
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(res) {
                console.log(res);
                resolve(res);
            })
            .catch(function(error) {
              console.log(error);
              reject(error);
            });
        });
    }

    async loginWithFacebook(callback) {
        console.log('Login with Facebook');

        const result = await Expo.Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_APP_ID,
            { permissions: ['public_profile'] }
        );

        if (result.type === 'success') {
            console.log('Facebook login - SUCCESS');
            console.log(result);
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(result.token);
            console.log(credential);
            // Sign in with credential from the Facebook user.
            firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                console.log(error);
            });
            callback(result);
        }
    }

    async loginWithGoogle(callback) {
        console.log('Login with Google');
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: GOOGLE_APP_ANDROID_ID,
                iosClientId: GOOGLE_APP_ANDROID_ID,
                scopes: ["profile", "email"]
            })
            if (result.type === "success") {
                console.log('Google login - SUCCESS');
                console.log(result);
                // Build Firebase credential with the Google access token.
                const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
                console.log(credential);
                // Sign in with credential from the Google user.
                const signIn = firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
                    console.log(error);
                });
                console.log(signIn);
                callback(result);
            } else {
                console.log("Google login - ERROR");
                console.log(result);
            }
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    storeMoreInformation(userId, username) {
      firebase.database().ref('users/' + userId).set({
        username: username
      });
    }


    getMoreInformation(userId) {
      firebase.database().ref('users/' + userId).on('value', (snapshot) => {
        const username = snapshot.val().username;
        console.log("Username of userId: " + username);
      });
    }



}
