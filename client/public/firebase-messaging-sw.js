// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
/* Version is important thing in here */
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyBUT6Gq5yWflD6vYfuEm5MxGETt0DUHRXw",
  authDomain: "q-wapp.firebaseapp.com",
  databaseURL: "https://q-wapp.firebaseio.com",
  projectId: "q-wapp",
  storageBucket: "q-wapp.appspot.com",
  messagingSenderId: "1059054827007",
  appId: "1:1059054827007:web:80be0dd57260b4d5d863ca"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/logo192.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  console.log(event)
  return event;
});
