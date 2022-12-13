console.log("Messages Page");

import { initializeApp } from "firebase/app";
import { documentId, getFirestore, collection, addDoc, doc, getDocs, getDoc } from "firebase/firestore";
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

const messageColRef = collection(db, 'Messages');
const userColRef = collection(db, 'Users');
const postColRef = collection(db, 'Posts');

let messages = new Map;
let users = new Map;
let posts = new Map;

let dataloadcounter = 0;

let currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;

        dataloadcounter++;
        makemessagelist();
    }
    else{
        console.log("No User in Messages");
    }
}
);

getDocs(messageColRef)
    .then((snapshot) => {
        snapshot.docs.forEach((docu) => {

            messages.set(docu.id, {
                receiverid: docu.data().receiverid,
                senderid: docu.data().senderid,
                message: docu.data().message,
                timestamp: docu.data().timestamp,
                postid: docu.data().postid
            });
            
        });
        
//        console.log(messages);
        dataloadcounter++;
        makemessagelist();

    })
    .catch(error => {
        console.log(error.message);
});

function makemessagelist(){

    if(dataloadcounter < 4)
    return;

    let sortedMessages = new Map([...messages.entries()].sort((a,b) =>
        b[1].timestamp - a[1].timestamp
    ));

    maincontainer.innerHTML = "";
    console.log("Making list....")
    sortedMessages.forEach((value,key) => {

        if(value.receiverid === currentUser.uid)
        {
            let username = users.get(value.senderid) ? users.get(value.senderid).username : "";
            let title = posts.get(value.postid) ? posts.get(value.postid).title : "";
            
            let datetime = new Date(value.timestamp);
            let datetimestring = datetime.toDateString().substring(4) + " - " + datetime.getHours()+":"+datetime.getMinutes();

            let chatcontainer = document.createElement("div");
            chatcontainer.innerHTML += `
            <div class="messagecontainer">
            <div class="chatuserinfo">
            <span> User:</span> ${username} 
            <span>Post:</span> ${title} 
            <h5>${datetimestring}</h5>
             </div>
             
           <h4> <span>Message:</span> ${value.message} </h4>
             <input type="text" id="${key}_textinput">  
             <input type="button" value="Reply" id="${key}_button"> 
            </div>
          
            `;

            maincontainer.appendChild(chatcontainer);

            let replyButton = document.getElementById(key + "_button");

            if(replyButton){
                replyButton.myparam = {key,value};

                replyButton.addEventListener("click", (e) => {
                    let messageObj = e.currentTarget.myparam;
                //console.log(e.currentTarget.myparam);
                
                addDoc(messageColRef, {
                    receiverid: messageObj.value.senderid,
                    senderid: messageObj.value.receiverid,
                    postid: messageObj.value.postid,
                    message: document.getElementById(messageObj.key + "_textinput").value,
                    timestamp: Date.now()
                })
                .then(() => {
                        console.log("Reply message sent");
                        alert("Reply message sent");
                })
                .catch((error) => {
                        console.log(error.message);
                }) 
                
                });
            }

       }

    })
}

getDocs(userColRef)
    .then((snapshot) => {
        snapshot.docs.forEach((docu) => {

            users.set(docu.data().userid, {
                username: docu.data().userName
            });
        });
        dataloadcounter++;
        makemessagelist();
//        console.log(users);
    })
    .catch(error => {
        console.log(error.message);
});

getDocs(postColRef)
    .then((snapshot) => {
        snapshot.docs.forEach((docu) => {

            posts.set(docu.id, {
                title: docu.data().title
            });
        });
        dataloadcounter++;
        makemessagelist();
//        console.log(posts);
    })
    .catch(error => {
        console.log(error.message);
});
