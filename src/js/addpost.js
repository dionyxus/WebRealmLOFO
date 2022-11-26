import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} from 'firebase/firestore';

import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

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

const postColRef = collection(db, 'Posts');

const userColRef = collection(db, 'Users');

const provider = new GoogleAuthProvider();
const auth = getAuth();

const storage = getStorage();

video.style.display = 'none';
canvas.style.display = 'none';

let isCaptureImage = false;

let positionObj = {};

console.log('Slim Shady Posting.....');

const user = auth.currentUser;

if (user) console.log('User Dispname - ' + user.displayName);
else console.log('No User');

submitpostbutton.addEventListener('click', (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('On Auth State Change - ' + user.displayName);

      let file;
      let storageRef;

      if (isCaptureImage) {
        storageRef = ref(storage, `ItemImages/${Date.now()}.jpg`);
        file = jpegBlob;
      } else {
        file = document.getElementById('uploadimage').files[0];
        storageRef = ref(storage, `ItemImages/${file.name}`);
      }

      if (file) {
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded image!');

          getDownloadURL(storageRef)
            .then((url) => {
              console.log(url);

              addDoc(postColRef, {
                islost: lostRadioButton.checked,
                isfound: foundRadioButton.checked,
                title: title.value,
                description: desc.value,
                reward: reward.value,
                possiblelostdatetime: possibleLostDateTime.value,
                position: positionObj,
                postcreatedtimestamp: Date.now(),
                userid: user.uid,
                username: user.displayName,
                imageURL: url,
              })
                .then(() => {
                  console.log('Post Submitted');
                  postForm1.reset();
                  alert('Post Submitted!');
                })
                .catch((error) => {
                  console.log(error.message);
                });

              addDoc(userColRef, {
                userid: user.uid,
                userName: user.displayName,
                useremailid: user.email,
                userPhoto: user.photoURL,
                userContactNo: user.phoneNumber,
              })
                .then(() => {
                  console.log('User Added');
                })
                .catch((error) => {
                  console.log(error.message);
                });
            })
            .catch((error) => {
              // Handle any errors
              console.log(error.message);
            });
        });
      }
    } else {
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

          console.log(user);
          // ...
        })
        .catch((error) => {
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

const context = canvas.getContext('2d');
context.scale(0.5, 0.5);

let jpegBlob;

document.getElementById('start').addEventListener('click', function (e) {
  e.preventDefault();
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      //video.src = window.URL.createObjectURL(stream);
      video.srcObject = stream;
      video.style.display = 'block';
      itemimage.style.display = 'none';
      // video.play();  // or autplay
    });
  } else {
    console.log('media devices not available in this browser');
  }
});

// Trigger photo take
document.getElementById('snap').addEventListener('click', (e) => {
  e.preventDefault();
  //canvas.width = video.videoWidth;
  //canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);

  //JPEG
  var jpegFile = canvas.toDataURL('image/jpeg');

  var jpegFile64 = jpegFile.replace(/^data:image\/(png|jpeg);base64,/, '');
  jpegBlob = base64ToBlob(jpegFile64, 'image/jpeg');

  //Stop Cam
  const tracks = video.srcObject.getTracks();
  tracks.forEach((track) => track.stop());

  itemimage.setAttribute('src', jpegFile);

  video.style.display = 'none';
  canvas.style.display = 'none';
  itemimage.style.display = 'block';

  isCaptureImage = true;
});

function base64ToBlob(base64, mime) {
  mime = mime || '';
  var sliceSize = 1024;
  var byteChars = window.atob(base64);
  var byteArrays = [];

  for (
    var offset = 0, len = byteChars.length;
    offset < len;
    offset += sliceSize
  ) {
    var slice = byteChars.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mime });
}

uploadimage.addEventListener('change', (e) => {
  e.preventDefault();

  console.log('Upload init');
  itemimage.setAttribute('src', URL.createObjectURL(uploadimage.files[0]));

  isCaptureImage = false;
});

let map;
function initMap() {
  console.log('Chekc');
  var latlng = new google.maps.LatLng(49.22397277736316, -123.1080958773155);
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 20,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  // google.maps.event.addListener(map, 'click', function (event) {
  var marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: 'Place the marker for your location!',
    draggable: true,
  });
  google.maps.event.addListener(marker, 'dragend', function (a) {
    console.log('a', a);
    positionObj = {
      lat: a.latLng.lat(),
      lng: a.latLng.lng(),
    };
    console.log('positionObj', positionObj);
  });
}

initMap();
