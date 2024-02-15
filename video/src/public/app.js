const socket = io();

const myVideo = document.getElementById("myVideo");
const audioBtn = document.getElementById("audio");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameraSelect");
const messages = document.getElementById("messages");
const chatForm = document.getElementById("chat");

const waitRoom = document.getElementById("waitRoom");
const waitRoomForm = waitRoom.querySelector("form");

const callRoom = document.getElementById("callRoom");

// callRoom.hidden = true;
callRoom.style.display = "none";

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let nickname;
let myPeerConnection;
let myDataChannel;

async function getMedia() {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    myVideo.srcObject = myStream;
    await getCamera();
  } catch (e) {
    console.log(e);
  }
}

async function getCamera() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");

    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      cameraSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

function handleAudioClick() {
  myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));

  if (!muted) {
    audioBtn.innerText = "Unmute";
  } else {
    audioBtn.innerText = "Mute";
  }
  muted = !muted;
}

function handleCameraClick() {
  myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
  if (!cameraOff) {
    cameraBtn.innerText = "Turn Camera On";
  } else {
    cameraBtn.innerText = "Turn Camera Off";
  }
  cameraOff = !cameraOff;
}

async function handleCameraChange() {
  await getMedia();

  if (myPeerConnection) {
    const newVideoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(newVideoTrack);
  }
}

audioBtn.addEventListener("click", handleAudioClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("change", handleCameraChange);

// --------------- wait room form (choose and enter a room) -----------------

function showRoom() {
  waitRoom.style.display = "none";

  callRoom.hidden = false;
  callRoom.style.display = "flex";
}

async function handleRoomSubmit(e) {
  e.preventDefault();

  // 카메라, 마이크 장치 연결 설정
  await initCall();

  // 닉네임 설정
  socket.emit("set_nickname", "상대방");

  // 채팅방 입장
  socket.emit("enter_room", "chatRoom", showRoom);

  roomName = "chatRoom";
  nickname = "상대방";
}

async function initCall() {
  // waitRoom.style.display = "none";
  // // waitRoom.hidden = true;
  // callRoom.hidden = false;
  // callRoom.style.display = "flex";
  await getMedia();
  makeConnection();
}

waitRoomForm.addEventListener("submit", handleRoomSubmit);

// --------- Socket Code ----------

socket.on("welcome", async () => {
  myDataChannel = myPeerConnection.createDataChannel("chat");
  myDataChannel.addEventListener("message", addMessage);

  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  socket.emit("send_offer", offer, roomName);
});

socket.on("receive_offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (e) => {
    myDataChannel = e.channel;
    myDataChannel.addEventListener("message", addMessage);
  });
  myPeerConnection.setRemoteDescription(offer);

  // getMedia
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("send_answer", answer, roomName);
});

socket.on("receive_answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("receive_ice", (ice) => {
  myPeerConnection.addIceCandidate(ice);
});

// --------- RTC Code ---------

function handleIce(data) {
  socket.emit("send_ice", data.candidate, roomName);
}

function handleAddStream(data) {
  const peerVideo = document.getElementById("peerVideo");
  peerVideo.srcObject = data.stream;
}

function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myPeerConnection.addEventListener("icecandidate", handleIce);

  // "addstream" event
  myPeerConnection.addEventListener("addstream", handleAddStream);

  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

// --------- Data Channel Code ---------

function addMessage(e) {
  const li = document.createElement("li");
  li.innerHTML = e.data;
  messages.append(li);
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = chatForm.querySelector("input");
  myDataChannel.send(`${nickname}: ${input.value}`);
  addMessage({ data: `나: ${input.value}` });
  input.value = "";
}

chatForm.addEventListener("submit", handleChatSubmit);
