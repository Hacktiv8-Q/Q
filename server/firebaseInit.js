const admin = require('firebase-admin');

let firebaseCredential = process.env.FIREBASE_CREDENTIALS

if (process.env.NODE_ENV === "production") {
  firebaseCredential = {
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "type": process.env.FIREBASE_TYPE,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT,
  }
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential),
  databaseURL: 'https://q-wapp.firebaseio.com'
});

const messaging = admin.messaging();

module.exports = { messaging }
