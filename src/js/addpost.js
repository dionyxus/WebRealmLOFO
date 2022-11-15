
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore";

import { getAuth, signInWithPopup,onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

import {getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

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

const userColRef = collection(db, 'Users');

const provider = new GoogleAuthProvider();
const auth = getAuth();

const storage = getStorage();


console.log("Slim Shady Posting.....");

const user = auth.currentUser;

if(user)
        console.log("User Dispname - " + user.displayName);
else
        console.log("No User");

submitpostbutton.addEventListener('click', (e) => {

        e.preventDefault();
        
        const user = auth.currentUser;
        onAuthStateChanged(auth, (user) => {
                if (user) {

                        console.log("On Auth State Change - " + user.displayName);

                        let file;
                        let storageRef;

                        if(captureCheckbox.checked){
                                // TODO add check for image capture
                                storageRef = ref(storage, `ItemImages/${Date.now()}.jpg}`);
                                file = jpegBlob;

                        }else{
                                file = document.getElementById('itemimage').files[0];
                                storageRef = ref(storage, `ItemImages/${file.name}`);

                        }


                        if(file){

                                uploadBytes(storageRef, file)
                                .then((snapshot) => {
                                console.log('Uploaded image!');

                                getDownloadURL(storageRef)
                                        .then((url) => {
                                        console.log(url);

                                        addDoc(colRef, {
                                                islost: lostRadioButton.checked,
                                                isfound: foundRadioButton.checked,
                                                title: title.value,
                                                description : desc.value,
                                                reward: reward.value,
                                                possiblelostdatetime: possibleLostDateTime.value,
                                                postcreatedtimestamp: Date.now(),
                                                userid: user.uid,
                                                username: user.displayName,
                                                imageURL: url 
                                        })
                                        .then(() => {
                                                console.log("Post Submitted");
                                                postForm1.reset();
                                        })
                                        .catch((error) => {
                                                console.log(error.message);
                                        })      
                

                                        })
                                        .catch((error) => {
                                        // Handle any errors
                                        });

                                }); 

                        }

                        

                }else{
                        signInWithPopup(auth, provider)
                        .then((result) => {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            const credential = GoogleAuthProvider.credentialFromResult(result);
                            const token = credential.accessToken;
                            // The signed-in user info.
                            user = result.user;
            
                                db.collection("Users").doc(user.uid).set({
                                        userName: user.displayName
                                });    

                            console.log(user);
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


const context = canvas.getContext('2d');
context.scale(0.5, 0.5);

let jpegBlob;

document.getElementById('start').addEventListener('click', function () {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Not adding `{ audio: true }` since we only want video now
          navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            // video.play();  // or autplay
          });
        } else {
          console.log('media devices not available in this browser');
        }
      });

      // Trigger photo take
document.getElementById('snap').addEventListener('click', () => {
        //canvas.width = video.videoWidth;
        //canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

//JPEG
        var jpegFile = canvas.toDataURL("image/jpeg");

        var jpegFile64 = jpegFile.replace(/^data:image\/(png|jpeg);base64,/, "");
        jpegBlob = base64ToBlob(jpegFile64, 'image/jpeg');  

        //Stop Cam
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());

      });


      function base64ToBlob(base64, mime) 
      {
          mime = mime || '';
          var sliceSize = 1024;
          var byteChars = window.atob(base64);
          var byteArrays = [];

          for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
              var slice = byteChars.slice(offset, offset + sliceSize);

              var byteNumbers = new Array(slice.length);
              for (var i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
              }

              var byteArray = new Uint8Array(byteNumbers);

              byteArrays.push(byteArray);
          }

          return new Blob(byteArrays, {type: mime});
      }