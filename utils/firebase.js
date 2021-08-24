const firebase = require("firebase");



const firebaseConfig = {
  apiKey: "AIzaSyCRrypgeFaPgqPUCypc1NzAu4zlaEzzmsU",
  authDomain: "vgapp-9cc66.firebaseapp.com",
  databaseURL: "https://vgapp-9cc66-default-rtdb.firebaseio.com",
  projectId: "vgapp-9cc66",
  storageBucket: "vgapp-9cc66.appspot.com",
  messagingSenderId: "119617741588",
  appId: "1:119617741588:web:9ebc96ccaf249321545801",
  measurementId: "G-XJ7E3K3LTE"
};
  
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}


function getFirebase(){
     return firebase;
}

function getDatabase(){
    return firebase.database();
}

module.exports = {
  getDatabase,
  getFirebase
};