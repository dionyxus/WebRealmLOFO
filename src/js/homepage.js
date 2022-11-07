console.log("viewPostssss");

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


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
        snapshot.docs.forEach((doc) => {
            posts.push({...doc.data(), id : doc.id})
            postview.innerHTML += "" + //doc.data().title + "</br>" + doc.data().description + "</br>";
                `<div class="item  col-xs-3 col-lg-3">
                    <div class="thumbnail">
                        <img class="group list-group-image" src="https://vancouver.ca/images/cov/feature/about-vancouver-landing-size.jpg" alt="" />
                        <div class="caption">
                            <h4 class="group inner list-group-item-heading">
                                ${doc.data().title}</h4>
                            <p class="group inner list-group-item-text">
                                ${doc.data().description} </p>
                            <div class="row">
                                <div class="col-xs-12 col-md-6">
                                    <p class="lead">
                                        ${doc.data().possiblelostdatetime}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>`
                    ;
        });
        console.log(posts);

    })
    .catch(error => {
        console.log(error.message);
});