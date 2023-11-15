const firebase = require("firebase");



const firebaseConfig = {
 
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
function getStorage(){
  return firebase.storage();
}
module.exports = {
  getDatabase,
  getFirebase,
  getStorage
};
