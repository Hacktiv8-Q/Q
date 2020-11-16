const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Prod env
let firebaseKey = process.env.FIREBASE_CREDENTIALS

// Dev env
if (path.extname(process.env.FIREBASE_CREDENTIALS) === '.json') {
  firebaseKey = fs.readFileSync(process.env.FIREBASE_CREDENTIALS, 'utf8')
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(firebaseKey)),
  databaseURL: 'https://q-wapp.firebaseio.com'
});

const messaging = admin.messaging();

module.exports = { messaging }
