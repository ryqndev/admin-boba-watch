import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    //paste config here
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
    }).catch(err => {
        console.error(err)
    });      
}
export {
    ui,
    firebase,
    login,
    logout,
    database,
}