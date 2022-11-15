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

class Post{
    constructor(postid, islost, isfound, title, description, reward, possiblelostdatetime, postcreatedtimestamp, userid, username, imageURL){
        this.postid = postid;
        this.islost = islost;
        this.isfound = isfound;
        this.title = title;
        this.description = description;
        this.reward = reward;
        this.possiblelostdatetime = possiblelostdatetime;
        this.postcreatedtimestamp = postcreatedtimestamp;
        this.userid = userid;
        this.username = username;
        this.imageURL = imageURL;
    }
}

let postList= [];

getDocs(colRef)
    .then((snapshot) => {
//        let posts = [];
        snapshot.docs.forEach((docu) => {
//           posts.push({...docu.data(), id : docu.id});

            postList.push(new Post(docu.id, docu.data().islost, docu.data().isfound, docu.data().title, docu.data().description, docu.data().reward, docu.data().possiblelostdatetime, docu.data().postcreatedtimestamp, docu.data().userid, docu.data().username, docu.data().imageURL));
            
        });

        makePostGrid(postList, postview);
        
    })
    .catch(error => {
        console.log(error.message);
});


function makePostGrid(postList ,postView){

    postList.forEach((post) => {

        postView.innerHTML += "" + //doc.data().title + "</br>" + doc.data().description + "</br>";
        `<div class="item  col-xs-3 col-lg-3">
            <div class="thumbnail" id="${post.id}">
                <img class="group list-group-image" src="${post.imageURL}" alt="" /> //docu.data().imageURL
                <div class="caption">
                    <h4 class="group inner list-group-item-heading">
                        ${post.title}</h4>
                    <p class="group inner list-group-item-text">
                        ${post.description} </p>
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <p class="lead">
                                ${ 
                                    post.possiblelostdatetime
                                    //docu.data().username
                                 }</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>`
            ;
            let griditem = document.getElementById(post.id);

            if(griditem){
//                        console.log("Grid Item found" + docu.id);
                griditem.myparam = post.id;

                griditem.addEventListener('click',(e)=>{
//                            console.log(e.currentTarget.myparam);
                    localStorage.setItem("viewpostdocid",e.currentTarget.myparam);

                    window.open('#viewpost',"_self");
                });
            }

    });

}

lostFilterButton.addEventListener('click',(e) => {
    e.preventDefault();

    postview.innerHTML = "";
    let postLostList = [];

    postList.forEach((post) => {
        if(post.islost){
            postLostList.push(post);
        }
    });

    makePostGrid(postLostList, postview);

});

foundFilterButton.addEventListener('click',(e) => {
    e.preventDefault();

    postview.innerHTML = "";
    let postFoundList = [];

    postList.forEach((post) => {
        if(post.isfound){
            postFoundList.push(post);
        }
    });

    makePostGrid(postFoundList, postview);

});

dateFilter.addEventListener('change', (e) => {
    e.preventDefault();

    postview.innerHTML = "";
    let postDateList = [];

    postList.forEach((post) => {
        let selectedDate = dateFilter.value;

        if(post.possiblelostdatetime.includes(selectedDate)){
            postDateList.push(post);
        }
    });

    makePostGrid(postDateList, postview);

});

clearFilterButton.addEventListener('click',(e) => {
    e.preventDefault();

    postview.innerHTML = "";
    makePostGrid(postList, postview);

});

//console.log(postList);