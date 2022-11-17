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
        useraccountcontainer.innerHTML += `<h3>User Name - ${user.displayName} </h3>
        <h4>Email id - ${user.email} </h4>
        <h4>Contact No - ${user.phoneNumber} </h4>
        `;

        userimage.src = user.photoURL;
    }
    else{
        useraccountcontainer.innerHTML = "No User";
        userimage.src = "";

        signInWithPopup(auth, provider)
                        .then((result) => {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            const credential = GoogleAuthProvider.credentialFromResult(result);
                            const token = credential.accessToken;
                            // The signed-in user info.
                            user = result.user;
            
                                // db.collection("Users").doc(user.uid).set({
                                //         userName: user.displayName
                                // });    

//                            console.log(user);
                            // ...
                        }).catch((error) => {
                            // Handle Errors here.
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // The email of the user's account used.
                            //const email = error.customData.email;
                            // The AuthCredential type that was used.
                            const credential = GoogleAuthProvider.credentialFromError(error);
                            // ...
                        });
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