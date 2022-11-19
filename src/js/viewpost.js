console.log("View Single Post page");

//console.log(localStorage.getItem("viewpostdocid"));

import { initializeApp } from "firebase/app";
import { documentId, getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup,onAuthStateChanged,GoogleAuthProvider } from "firebase/auth";


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

const provider = new GoogleAuthProvider();
const auth = getAuth();

let postuserid;

async function getData (coll, id) {
    const snap = await getDoc(doc(db, coll, id))

    if (snap.exists())
      return snap.data();
    else
      return Promise.reject(Error(`No such document: ${coll}.${id}`))
  }

  console.log("Getting data");
  console.log(localStorage.getItem("viewpostdocid"));

  getData("Posts",localStorage.getItem("viewpostdocid") ).then((data)=>{
  //  console.log(data);
    
    let postdatetime = new Date(data.possiblelostdatetime);
    let postdatetimestring = postdatetime.toDateString().substring(4) + " - " + postdatetime.getHours()+":"+postdatetime.getMinutes();

  document.getElementById("title").innerHTML = data.title;
  document.getElementById("desc").innerHTML =  data.description;
  document.getElementById("username").innerHTML = "<span>Post Owner</span>" + data.username;
  document.getElementById("reward").innerHTML = "<span>Reward:</span> " + data.reward;
  document.getElementById("datetime").innerHTML = "<span>Date/Time:</span> " + postdatetimestring;

    itemimage.src = data.imageURL;

    postuserid = data.userid;

  });


  const messageColRef = collection(db, 'Messages');
  const userColRef = collection(db, 'Users');

  sendmessagebutton.addEventListener('click', (e) => {

    e.preventDefault();
    
    onAuthStateChanged(auth, (user) => {
            if (user) {

              addDoc(messageColRef, {
                    receiverid: postuserid,
                    senderid: user.uid,
                    postid: localStorage.getItem("viewpostdocid"),
                    message: messagebox.value,
                    timestamp: Date.now()
                })
                .then(() => {
                        console.log("Message Sent");
                })
                .catch((error) => {
                        console.log(error.message);
                }) 

                addDoc(userColRef, {
                  userid: user.uid,
                  userName: user.displayName,
                  useremailid: user.email,
                  userPhoto: user.photoURL,
                  userContactNo: user.phoneNumber
              })
              .then(() => {
                      console.log("User Added");
              })
              .catch((error) => {
                      console.log(error.message);
              }); 
            
              }else{
                    signInWithPopup(auth, provider)
                    .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential = GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;
                        // The signed-in user info.
                        user = result.user;

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
  });