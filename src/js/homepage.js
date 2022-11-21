console.log('viewPostssss');

import { initializeApp } from 'firebase/app';
import {
  documentId,
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAjKm0uKRHxIBRQtiR1ZFq-ZCTRmSh6M-U',
  authDomain: 'webrealmlofo.firebaseapp.com',
  databaseURL: 'https://webrealmlofo-default-rtdb.firebaseio.com',
  projectId: 'webrealmlofo',
  storageBucket: 'webrealmlofo.appspot.com',
  messagingSenderId: '900604719791',
  appId: '1:900604719791:web:2e9ee3e286badcb5669a5a',
  measurementId: 'G-ZZH3G9HQHW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'Posts');

class Post {
  constructor(
    postid,
    islost,
    isfound,
    title,
    description,
    reward,
    possiblelostdatetime,
    postcreatedtimestamp,
    userid,
    username,
    imageURL,
  ) {
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

let postList = [];

getDocs(colRef)
  .then((snapshot) => {
    //        let posts = [];
    snapshot.docs.forEach((docu) => {
      //           posts.push({...docu.data(), id : docu.id});

      postList.push(
        new Post(
          docu.id,
          docu.data().islost,
          docu.data().isfound,
          docu.data().title,
          docu.data().description,
          docu.data().reward,
          docu.data().possiblelostdatetime,
          docu.data().postcreatedtimestamp,
          docu.data().userid,
          docu.data().username,
          docu.data().imageURL,
        ),
      );
    });

    makePostGrid(postList, postview);
  })
  .catch((error) => {
    console.log(error.message);
  });

function makePostGrid(postList, postView) {
  let sortedPostList = postList.sort(
    (a, b) => b.postcreatedtimestamp - a.postcreatedtimestamp,
  );

  sortedPostList.forEach((post) => {
    let postdatetime = new Date(post.postcreatedtimestamp);
    let postdatetimestring =
      postdatetime.toDateString().substring(4) +
      ' - ' +
      postdatetime.getHours() +
      ':' +
      postdatetime.getMinutes();

    let postcontainer = document.createElement('div'); //${post.imageURL}
    postcontainer.setAttribute('class', `item singlepost`);
    postcontainer.innerHTML += `
            <div class="thumbnail" id="${post.postid}">

                <img class="group" src="${post.imageURL}" alt="" />

                <div class="caption">
                    <h4>
                    <span>${post.isfound}:</span> ${post.title}</h4>
                        <h4>
                       <span>Posted By:</span>  ${post.username}</h4>
                    
                        
                            <h4>
                               <span>Created on:</span>  ${postdatetimestring}</h4>
                        
                    
                </div>
                </div>
            </div>`;

    postview.appendChild(postcontainer);

    let griditem = document.getElementById(post.postid);

    if (griditem) {
      griditem.myparam = post.postid;

      griditem.addEventListener('click', (e) => {
        localStorage.setItem('viewpostdocid', e.currentTarget.myparam);
        window.open('#viewpost', '_self');
      });
    }
  });
}

lostFilterButton.addEventListener('click', (e) => {
  e.preventDefault();

  postview.innerHTML = '';
  let postLostList = [];

  postList.forEach((post) => {
    if (post.islost) {
      postLostList.push(post);
    }
  });

  makePostGrid(postLostList, postview);
});

foundFilterButton.addEventListener('click', (e) => {
  e.preventDefault();

  postview.innerHTML = '';
  let postFoundList = [];

  postList.forEach((post) => {
    if (post.isfound) {
      postFoundList.push(post);
    }
  });

  makePostGrid(postFoundList, postview);
});

dateFilter.addEventListener('change', (e) => {
  e.preventDefault();

  postview.innerHTML = '';
  let postDateList = [];

  postList.forEach((post) => {
    let selectedDate = dateFilter.value;

    if (post.possiblelostdatetime.includes(selectedDate)) {
      postDateList.push(post);
    }
  });

  makePostGrid(postDateList, postview);
});

clearFilterButton.addEventListener('click', (e) => {
  e.preventDefault();

  postview.innerHTML = '';
  makePostGrid(postList, postview);
});

//console.log(postList);
