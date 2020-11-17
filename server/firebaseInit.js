// const fs = require('fs');
// const path = require('path');
const admin = require('firebase-admin');

// Prod env
// let firebaseKey = process.env.FIREBASE_CREDENTIALS

// Dev env
// if (path.extname(process.env.FIREBASE_CREDENTIALS) === '.json') {
//   firebaseKey = fs.readFileSync(process.env.FIREBASE_CREDENTIALS, 'utf8')
// }

admin.initializeApp({
  credential: admin.credential.cert({
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  }),
  databaseURL: 'https://q-wapp.firebaseio.com'
});

const messaging = admin.messaging();

module.exports = { messaging }
