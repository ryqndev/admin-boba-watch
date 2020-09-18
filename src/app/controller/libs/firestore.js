import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ",
    authDomain: "boba-watch-firebase.firebaseapp.com",
    databaseURL: "https://boba-watch-firebase.firebaseio.com",
    projectId: "boba-watch-firebase",
    storageBucket: "boba-watch-firebase.appspot.com",
    messagingSenderId: "674375234614",
    appId: "1:674375234614:web:fdaf98c291204b9c",
    measurementId: "G-C2DYVHCWDR"
};
firebase.initializeApp(firebaseConfig);

let database, ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

database = firebase.firestore(); 
database.enablePersistence().catch(err => {console.error(err)});

let login = (callback) => {
    firebase.auth().onAuthStateChanged(user => {
        if(!user) return callback(user);    // if not logged in user
        callback(user)
    });
}

const logout = () => {
    firebase.auth().signOut().then(function() {
        let theme = localStorage.getItem('theme');
        localStorage.clear();
        localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(console.error);      
}
window.logout = logout;
export {
    ui,
    firebase,
    login,
    logout,
    database,
}