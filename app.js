const path = require("node:path");
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-local");
const session = require("express-session");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(session({ secret: "aziz", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
