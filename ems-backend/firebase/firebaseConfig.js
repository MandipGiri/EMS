var admin = require("firebase-admin");

var serviceAccount = require("./serverkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotifications = (fcmToken, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken,
  };
  console.log(`message`, message);
  admin
    .messaging()
    .send(message)
    .then((res) => console.log(`Send Successfully`, res))
    .catch((err) => console.log(`Error sendin`, err));
};

module.exports = sendNotifications;
