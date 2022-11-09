import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup,onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
apiKey: "AIzaSyAjKm0uKRHxIBRQtiR1ZFq-ZCTRmSh6M-U",
authDomain: "webrealmlofo.firebaseapp.com",
databaseURL: "https://webrealmlofo-default-rtdb.firebaseio.com",
projectId: "webrealmlofo",
storageBucket: "webrealmlofo.appspot.com",
messagingSenderId: "900604719791",
appId: "1:900604719791:web:2e9ee3e286badcb5669a5a",
measurementId: "G-ZZH3G9HQHW"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        username.innerHTML += `<h4>User Name - ${user.displayName} </h4>`
    }
    else{
        username.innerHTML = "No User";
    }
});

signoutbutton.addEventListener('click',()=>{
    console.log("Signingggg OUTTTTTTTT");

    auth.signOut()
    .then(() => {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });

});