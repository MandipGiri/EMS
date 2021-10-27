import firebase from "firebase/app";
import "@firebase/messaging";

import { REACT_APP_VAPID_KEY } from "./Constants";

const firebaseConfig = {
  apiKey: "AIzaSyDwUwbLt3ud1qpEnjzA5znUls8w-BmVCPg",
  authDomain: "cf-ems.firebaseapp.com",
  projectId: "cf-ems",
  storageBucket: "cf-ems.appspot.com",
  messagingSenderId: "799444280742",
  appId: "1:799444280742:web:0c3d07e9b7f0b49dd91b67",
  measurementId: "G-EK773BSMKN",
};

firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();

export const getFCMToken = async () => {
  let currentToken = "";

  try {
    currentToken = await messaging.getToken({ vapidKey: REACT_APP_VAPID_KEY });
    console.log(`currentToken`, currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }

  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
