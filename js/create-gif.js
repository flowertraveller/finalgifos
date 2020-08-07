let video = document.querySelector("#video");
let buffer = document.querySelectorAll(".buffer-bar-item");

// Para timer de gif
let recording = false;
function camaraOn() {
  document.querySelector(".create-gifos-panel").style.display = "none";
  document.querySelector(".record-gifos-panel-sec").style.display = "block";
  const constraints = {
    video: true,
    audio: false
  };
  navigator.mediaDevices
  .getUserMedia(constraints)
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error(error);
  });
}
// RECORD /
function startRecording() {
  recording = true;
  recorder = RecordRTC(video.srcObject, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    onGifRecordingStarted: function () {
      console.log("started");
    }
  });

  recorder.startRecording();
  getDuration();

  document.getElementById("record-panel-title").innerHTML = "Capturando Tu Guifo";
  document.getElementById("startRecord").style.display = "none";
  document.querySelector(".stop").style.display = "block";
}
// STOP RECORD//
function stopRecording() {
  video.srcObject.getTracks().forEach(function (track) {
    track.stop();
  });
  recorder.stopRecording(function () {
    recording = false;
    video.style.display = "none";
    document.querySelector(".gif-preview-container").style.display = "block";
    preview = document.getElementById("gif-preview");
    preview.src = URL.createObjectURL(recorder.getBlob());
    document.getElementById("record-panel-title").innerHTML = "Vista Previa";
   let form = new FormData();
    form.append("file", recorder.getBlob(), "myGif.gif");
    document.getElementById("upload").addEventListener("click", () => {
      uploadGif(form);
    });
  });
  document.querySelector(".stop").style.display = "none";
  document.querySelector(".btns-upload-gif").style.display = "flex";
}

function uploadGif(gif) {
  document.querySelector('.gif-preview-container').innerHTML = `
  <div class='uploading-gif'>
    <img src="./assets/globe_img.png">
    <p class='uploading-gif-title'>Estamos subiendo tu guifo...<p>
    <div class="progress-bar" id="progress-bar">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 años</span> algunos segundos</p>
  </div>
  `;
  animateProgressBar();
  document.querySelector('.btns-upload-gif').innerHTML = `
  <button class="btn-create-gif repeat push" onclick="location.href='create.html'"><span>Cancelar</span></button>
  `
  
  fetch(
    `https://upload.giphy.com/v1/gifs?api_key=IqeMD59NavOyu6it77HFJvw67npZMlvh`,
    {
      method: "POST",
      body: gif
    }
  )
    .then(response => {
      if (response.status === 200) {
        console.log('Gif subido!');
        return response.json();
      } else {
        console.log('error.');
      }
    })
    .then(data => {
      console.log(data);
      fetch(
        `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=IqeMD59NavOyu6it77HFJvw67npZMlvh`
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          localStorage.setItem(
            `mygif-${data.data.id}`,
            JSON.stringify(data.data)
          );
          let alertGif = document.createElement('div');
          alertGif.className = 'alert-gif';
          alertGif.innerHTML = `
          <p class='title-modal'> Guifo subido con éxito! <span style='float: right'><img id='closeModal' src="./assets/close.svg"></span></p>
          <div class='content-modal'>
            <img class='gif-modal' src='${data.data.images.original.url}'>
            <div class='gif-modal-btns'>
              <button>Copiar Enlace Guifo</button>
              <button>Descargar Guifo</button>
            </div>
          <div>
          `;
          document.querySelector('.main-content').style.filter = 'grayscale(70%) blur(2px)';
          document.body.append(alertGif);
          document.getElementById('closeModal').addEventListener('click', () => {
            document.querySelector('.alert-gif').style.display = 'none';
            window.location.href = "./misgifos.html";
          });
        });
    });
}

// TIMER */
function getDuration() {
  let seconds = 0;
  let minutes = 0;
  let timer = setInterval(() => {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = "0" + seconds;
        }
        document.getElementById("timer").style.display = "block";
        document.getElementById(
          "timer"
        ).innerHTML = `00:00:0${minutes}:${seconds}`;
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
    } else {
      clearInterval(timer);
    }
  }, 1000);
}
// BAR //
function animateProgressBar() {
  document.querySelector('.progress-bar').style.display = 'inline-block';
  let progressBar = document.getElementById('progress-bar');
  let liCounter = 0;
  setInterval(function() {
    progressBar.querySelectorAll('li')[liCounter].style.display = 'inline-block';
    if (liCounter >= 15) {
      progressBar.querySelectorAll('li').forEach(element => {
        element.style.display = 'none';
      })
      liCounter = 0;
    }else{
      liCounter++;
    }
  }, 400);
};

const myGifos = document.getElementById("mygifos");
const savedGifos = document.getElementById("savedgifos");

(function displayGifs() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('mygif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        gif.className = 'img-gif';
        myGifos.appendChild(gif);
      }
      if (localStorage.key(i).startsWith('gif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        gif.className = 'img-gif';
        savedGifos.appendChild(gif);
      }
    }

    if(myGifos.innerHTML === ''){
      myGifos.innerHTML = 'Aun no creaste gifs';
    }
    if(savedGifos.innerHTML === ''){
      savedGifos.innerHTML = 'Aun no guardaste ningun gif';
    }
  })();

  // LOCAL STORAGE GIFOS */ 
(function displayGifs() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith('mygif-')) {
      gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
      gif = document.createElement("img");
      gif.id = gifObj.id;
      gif.src = `${gifObj.images.original.url}`;
      gif.className = 'img-gif';
      myGifos.appendChild(gif);
    }
    if (localStorage.key(i).startsWith('gif-')) {
      gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
      gif = document.createElement("img");
      gif.id = gifObj.id;
      gif.src = `${gifObj.images.original.url}`;
      gif.className = 'img-gif';
      savedGifos.appendChild(gif);
    }
  }
  if(myGifos.innerHTML === ''){
    myGifos.innerHTML = 'Aun no creaste gifs';
  }
  if(savedGifos.innerHTML === ''){
    savedGifos.innerHTML = 'Aun no guardaste ningun gif';
  }
})();