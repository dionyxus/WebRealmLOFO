//reference : https://davidwalsh.name/browser-camera

const video = document.getElementById('video');

// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);

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

  //we can pass the content of canvas as blob (a file like object)
  const imageBlob = canvas.toBlob(handleBlob, 'image/jpeg');
});

document.getElementById('stop').addEventListener('click', () => {
  const tracks = video.srcObject.getTracks();
  tracks.forEach((track) => track.stop());
});

function handleBlob(blob) {
  // we can turn the blob into DOMString
  const objectURL = window.URL.createObjectURL(blob);
  const copyImg = document.createElement('img');
  copyImg.style.height = '120px';
  //(objectURL is only contains the address of image object in browser memory)
  //it is vaid for current browser session
  copyImg.src = objectURL;
  document.body.appendChild(copyImg);
  console.log('objectURL:', objectURL);

  //if we want to store the image into server, one way is to
  //create base64 rendition of the the blob using FileReader
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    console.log('Base64:', reader.result);
  });
  // if you want to deal with it as base64 string (e.g. img src)
  reader.readAsDataURL(blob);
  //if you want to read it binary
  //reader.readAsArrayBuffer(blob);
}

/* below is LEGACY code using navigator.getUserMedia in case you want to support older browsers
else if(navigator.getUserMedia) { // Standard
	navigator.getUserMedia({ video: true }, function(stream) {
		video.src = stream;
		video.play();
	}, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
	navigator.webkitGetUserMedia({ video: true }, function(stream){
		video.src = window.webkitURL.createObjectURL(stream);
		video.play();
	}, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
	navigator.mozGetUserMedia({ video: true }, function(stream){
		video.srcObject = stream;
		video.play();
	}, errBack);
}
*/
