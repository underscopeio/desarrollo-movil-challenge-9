import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyDcvAVDGSr5otrT1HeJOZK44jZ8R6iM6aI',
  authDomain: 'coderhouse-test.firebaseapp.com',
  databaseURL: 'https://coderhouse-test.firebaseio.com',
  projectId: 'coderhouse-test',
  storageBucket: 'coderhouse-test.appspot.com',
  messagingSenderId: '834425741739',
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore()
export const auth = firebase.auth()

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true,
})

export const getCurrentUser = () => {
  return auth
    .signInAnonymously()
    .then(() => {
      return auth.currentUser
    })
    .catch(function(error) {
      console.error(error)
    })
}

export default firebase
