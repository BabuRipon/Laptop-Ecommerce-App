const  admin = require("firebase-admin");

const serviceAccount = require("../config/fbServiceAccountkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports=admin;