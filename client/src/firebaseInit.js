import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBUT6Gq5yWflD6vYfuEm5MxGETt0DUHRXw",
  authDomain: "q-wapp.firebaseapp.com",
  databaseURL: "https://q-wapp.firebaseio.com",
  projectId: "q-wapp",
  storageBucket: "q-wapp.appspot.com",
  messagingSenderId: "1059054827007",
  appId: "1:1059054827007:web:80be0dd57260b4d5d863ca"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const requestFirebaseNotificationPermission = () =>
  new Promise((resolve, reject) => {
    messaging
      .requestPermission()
      .then(() => messaging.getToken())
      .then((firebaseToken) => {
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
      const notificationTitle = payload.data.title;
      const notificationOptions = {
        body: payload.data.body,
        icon: '/icon-192x192.png'
      };

      const notification = new Notification(notificationTitle, notificationOptions);

      return notification
      // return self.registration.showNotification(notificationTitle,
      //   notificationOptions);
    });
  });
