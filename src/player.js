const speedButtons = document.querySelectorAll(".speed-controls button")

const videoContainer = document.querySelector(".video-container")
const videoElement = document.querySelector("video")

window.addEventListener("load", function () {
    const params = new URLSearchParams(window.location.search)
    const src = params.get("url") || '';
    videoElement.src = src;
    if (!src) {
        loader.innerHTML = 'Please pass a video url as a query param.'
    }
});

const loader = document.querySelector(".loader")
const overlayPlayPause = document.querySelector(".overlay.play")

let selectedSpeed = speedButtons[0]
selectedSpeed.classList.add("highlight")

let videoPlaying = false;

speedButtons.forEach(button => {
    button.addEventListener("click", function (event) {
        selectedSpeed.classList.remove("highlight")
        selectedSpeed = event.target
        selectedSpeed.classList.add("highlight")
        videoElement.playbackRate = selectedSpeed.dataset.speed
    })
})

videoElement.addEventListener("loadeddata", function (event) {
    if (videoElement.readyState >= 3) {
        loader.style.display = "none"
        overlayPlayPause.style.display = "block"
        const lastPlayed = window.localStorage.getItem(videoElement.src) || 0;
        videoElement.currentTime = lastPlayed;
    }
})

overlayPlayPause.addEventListener("click", function () {
    videoPlaying ? videoElement.pause() :
        videoElement.play()
})

videoElement.addEventListener("play", function () {
    videoPlaying = true;
    overlayPlayPause.style.display = "none";
})

videoElement.addEventListener("pause", function () {
    videoPlaying = false;
    overlayPlayPause.style.display = "block";
    window.localStorage.setItem(videoElement.src, videoElement.currentTime)
})

let lastUpdate = 0;
videoElement.addEventListener("timeupdate", function () {
    if (videoElement.currentTime - lastUpdate > 5) {
        lastUpdate = videoElement.currentTime;
        window.localStorage.setItem(videoElement.src, lastUpdate)
    }
})