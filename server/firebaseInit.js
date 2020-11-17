// const fs = require('fs');
// const path = require('path');
const admin = require('firebase-admin');
const firebaseKeys = require('./credentials/q-wapp-firebase-adminsdk-key.json')

// Prod env
// let firebaseKey = process.env.FIREBASE_CREDENTIALS

// Dev env
// if (process.env.NODE_ENV === "production") {
// const data = fs.readFileSync(process.env.FIREBASE_CREDENTIALS, 'utf8')
// firebaseKey = JSON.parse(data)
// }

admin.initializeApp({
  credential: admin.credential.cert(firebaseKeys),
  databaseURL: 'https://q-wapp.firebaseio.com'
});

const messaging = admin.messaging();

module.exports = { messaging }
