const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Prod env
let firebaseKey = process.env.FIREBASE_CREDENTIALS

// Dev env
if (process.env.NODE_ENV === "production") {
  firebaseKey = JSON.parse(fs.readFileSync(process.env.FIREBASE_CREDENTIALS, 'utf8').replace(/\\n/g, '\n'))
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
  databaseURL: 'https://q-wapp.firebaseio.com'
});

const messaging = admin.messaging();

module.exports = { messaging }
