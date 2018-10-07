import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID

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

    logoutUser() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }).catch(function(error) {
          // An error happened.
        });
    }

    async loginWithFacebook() {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        FACEBOOK_APP_ID,
        { permissions: ['public_profile'] }
      );

      if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).catch((error) => {
          console.log(error);
        });
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
