
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const colRef = collection(db, 'Posts');

console.log("Slim Shady Posting.....");

/*
const db = getDatabase();

submitpostbutton.addEventListener('click', submitForm);

function submitForm(e){
        e.preventDefault();

        console.log("Posting Stuff");

        set(ref(db, '/posts/' + 'post11'), {
                    lost: postlostcheckbox.value,
                    name: postname.value,
                    desc: postdesc.value
                });
};
*/
submitpostbutton.addEventListener('click', (e) => {

        e.preventDefault();

        addDoc(colRef, {
                islost: lostRadioButton.checked,
                isfound: foundRadioButton.checked,
                title: title.value,
                description : desc.value,
                reward: reward.value,
                possiblelostdatetime: possibleLostDateTime.value,
                postcreatedtimestamp: Date.now()
        })
        .then(() => {
                console.log("Post Submitted");
                postForm.reset();
        })
        .catch((error) => {
                console.log(error.message);
        })
});
