console.log("viewPostssss");

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

const colRef = collection(db, 'Posts');


getDocs(colRef)
    .then((snapshot) => {
        let posts = [];
        snapshot.docs.forEach((docu) => {
            posts.push({...docu.data(), id : docu.id});

            postview.innerHTML += "" + //doc.data().title + "</br>" + doc.data().description + "</br>";
                `<div class="item  col-xs-3 col-lg-3">
                    <div class="thumbnail" id="${docu.id}">
                        <img class="group list-group-image" src=" ${docu.data().imageURL} " alt="" />
                        <div class="caption">
                            <h4 class="group inner list-group-item-heading">
                                ${docu.data().title}</h4>
                            <p class="group inner list-group-item-text">
                                ${docu.data().description} </p>
                            <div class="row">
                                <div class="col-xs-12 col-md-6">
                                    <p class="lead">
                                        ${ 
                                            docu.data().possiblelostdatetime
                                            //docu.data().username
                                         }</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>`
                    ;
                    let griditem = document.getElementById(docu.id);

                    if(griditem){
                        console.log("Grid Item found" + docu.id);
                        griditem.myparam = docu.id;

                        griditem.addEventListener('click',(e)=>{
                            console.log(e.currentTarget.myparam);
                            localStorage.setItem("viewpostdocid",e.currentTarget.myparam);

                            window.open('#viewpost',"_self");
                        });
                    }
            
        });
//        console.log(posts);
        
    })
    .catch(error => {
        console.log(error.message);
});
