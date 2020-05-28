import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBI9BeKwO6ydTVlgYNohzU5ZNZsktFgPTA",
    authDomain: "sprintviews.firebaseapp.com",
    databaseURL: "https://sprintviews.firebaseio.com",
    projectId: "sprintviews",
    storageBucket: "sprintviews.appspot.com",
    messagingSenderId: "589988109950",
    appId: "1:589988109950:web:d5340f09c88fbe4aaac22f"
}
firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
