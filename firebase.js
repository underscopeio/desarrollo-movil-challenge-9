import firebase from "firebase"
import FireStore from 'firebase/firestore'


// Initialize Firebase
const config = {
    apiKey: "AIzaSyCj2CFgcaf6mZDym9nhhg_oorF9Ru6PXK4",
    authDomain: "appchallenge9.firebaseapp.com",
    databaseURL: "https://appchallenge9.firebaseio.com",
    projectId: "appchallenge9",
    storageBucket: "appchallenge9.appspot.com",
    messagingSenderId: "248849209678"
  };
  firebase.initializeApp(config);

let db = firebase.firestore();


// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
  });





//Lee datos

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});


export const setArtistAsFavoriteOnFirebase = (artistid , favoritovalor) => {
 
    // console.warn('favorito',favoritovalor)

    db.collection("favoritos").doc(artistid).set({
        nombre: artistid,
        favorito: favoritovalor
        
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });





}