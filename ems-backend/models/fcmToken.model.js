const moongoose = require("mongoose");

const Schema = moongoose.Schema;

const fcmTokenSchema = new Schema(
  {
    fcmToken: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FCMToken = moongoose.model("fcmToken", fcmTokenSchema);

module.exports = FCMToken;
