const appWriteUsers = require("../models/appWriteUsers");

const APPWRITE_Routers = require("express").Router();
APPWRITE_Routers.route("/sync").post(appWriteUsers);
