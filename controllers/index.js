require("dotenv").config();
const db = require("../db/queries");
const { validationResult } = require("express-validator");
const { validateInputs } = require("./validators");
const bcrypt = require("bcryptjs");
const passport = require("../config/passport");

exports.homeGet = async (req, res) => {
  const messages = await db.getAllMsgs();
  res.render("index", { messages });
};

exports.loginGet = async (req, res) => res.render("login");
exports.loginPost = [
  validateInputs,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login", { errors: errors.array() });
    }
    return passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })(req, res, next);
  },
];

exports.singUpGet = async (req, res) => res.render("signUp");
exports.singUpPost = [
  validateInputs,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signUp", { errors: errors.array() });
    }
    try {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password);
      db.addUser(req, hashedPassword);
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  },
];

exports.joinGet = async (req, res) => res.render("join");
exports.adminPost = [
  validateInputs,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("join", { errors: errors.array() });
    }
    const { secret } = req.body;
    if (secret === process.env.ADMIN_PASS) {
      await db.makeAdmin(req.user.id);
      res.redirect("/");
    } else {
      return res
        .status(401)
        .render("join", { errors: [{ msg: "Incorrect password" }] });
    }
  },
];
exports.memberPost = [
  validateInputs,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("join", { errors: errors.array() });
    }
    const { secret } = req.body;
    if (secret === process.env.MEMBER_PASS) {
      await db.makeMember(req.user.id);
      res.redirect("/");
    } else {
      return res
        .status(401)
        .render("join", { errors: [{ msg: "Incorrect password" }] });
    }
  },
];

exports.logOutPost = async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

exports.addMsgGet = async (req, res) => res.render("addMsg");
exports.addMsgPost = [
  validateInputs,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addMsg", { errors: errors.array() });
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
