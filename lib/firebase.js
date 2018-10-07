import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET
};

export default class Firebase {

    constructor(){
      this.access_token = null;
    }

    getInfo() {
        firebase.initializeApp(firebaseConfig);
        console.log(firebase);
    }


}
