// routes/auth.js
const express = require("express");
const sdk = require("node-appwrite");
const APPWRITE_USER = require("../models/appWriteUsers");

const client = new sdk.Client().setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT_ID);
//   .setKey(process.env.APPWRITE_API_KEY);

const users = new sdk.Users(client);

exports.appWriteUsers = async (req, res) => {
  try {
    const { appwriteUserId } = req.body;

    const appUser = await users.get(appwriteUserId);

    let user = await APPWRITE_USER.findOne({ appwriteId: appUser.$id });

    if (!user) {
      user = await APPWRITE_USER.create({
        appwriteId: appUser.$id,
        name: appUser.name,
        email: appUser.email,
        provider: appUser.provider || "email",
      });
    }else{
        
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error syncing user" });
  }
};
