const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)),
  databaseURL: 'https://q-wapp.firebaseio.com'
});

const messaging = admin.messaging();

module.exports = { messaging }
