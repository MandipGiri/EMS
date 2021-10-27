// // Scripts for firebase and firebase messaging
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
//   apiKey: "AIzaSyDwUwbLt3ud1qpEnjzA5znUls8w-BmVCPg",
//   authDomain: "cf-ems.firebaseapp.com",
//   projectId: "cf-ems",
//   storageBucket: "cf-ems.appspot.com",
//   messagingSenderId: "799444280742",
//   appId: "1:799444280742:web:0c3d07e9b7f0b49dd91b67",
//   measurementId: "G-EK773BSMKN",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     // icon: "/logo192.png",
//   };

//   // eslint-disable-next-line no-restricted-globals
//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   );
// });
