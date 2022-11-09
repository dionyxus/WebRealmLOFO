console.log("View Single Post page");

console.log(localStorage.getItem("viewpostdocid"));

import { initializeApp } from "firebase/app";
import { documentId, getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";


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

async function getData (coll, id) {
    const snap = await getDoc(doc(db, coll, id))

    if (snap.exists())
      return snap.data();
    else
      return Promise.reject(Error(`No such document: ${coll}.${id}`))
  }

  console.log("Getting data");

  getData("Posts",localStorage.getItem("viewpostdocid") ).then((data)=>{
  //  console.log(data);
    
    document.getElementById("title").innerHTML = data.title;
    document.getElementById("desc").innerHTML = "Description - " + data.description;
    document.getElementById("username").innerHTML = "User Name - " + data.username;
    document.getElementById("reward").innerHTML = "Reward - " + data.reward;
    document.getElementById("datetime").innerHTML = "Possible Lost Date/Time - " + data.possiblelostdatetime;

    itemimage.src = data.imageURL;

  });