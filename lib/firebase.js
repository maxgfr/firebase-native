import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};

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

    createUser(val) {
        return new Promise(function (resolve, reject) {
            //console.log(val);
            var email = null;
            var password = null;
            var username = null;
            if (val.email && val.password && val.username) {
                email = val.email;
                password = val.password;
                username = val.username;
            }
            console.log(email, password, username);
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(res) {
                //console.log(res);
                resolve(res);
            })
            .catch(function(error) {
              //console.log(error);
              reject(error);
            });
        });
    }

    loginFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        console.log(provider);
        provider.addScope('user_birthday');
        firebase.auth().languageCode = 'fr_FR';
        provider.setCustomParameters({
          'display': 'popup'
        });

        firebase.auth().signInWithPopup(provider).then(function(result) {
            console.log(result);
        }).catch(function(error) {
            console.log(error);
        });
    }


}
