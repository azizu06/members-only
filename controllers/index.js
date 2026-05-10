const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const { validateInputs } = require("./validators");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.homeGet = async (req, res) => {
  const messages = await db.getAllMsgs();
  res.render("index", { messages });
};

exports.loginGet = async (req, res) => res.render("login");
exports.loginPost = [
  validateInputs,
  async (req, res) => {
    const errors = validationResult(errors);
    if (!errors.isEmpty()) {
      return res.status(404).render("login", { errors: errors.array() });
    }
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    });
  },
];

exports.singUpGet = async (req, res) => res.render("signUp");
exports.singUpPost = async (req, res) => {};
exports.joinGet = async (req, res) => res.render("join");
exports.joinPost = async (req, res) => {};

exports.addMsgGet = async (req, res) => res.render("addMsg");
exports.addMsgPost = [
  validateInputs,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render("addMsg", { errors: errors.array() });
    }
    await db.addMsg(req);
    res.redirect("/");
  },
];

exports.deleteMsgPost = async (req, res) => {
  const { id } = req.params;
  await db.deleteMsg(id);
  res.redirect("/");
};
