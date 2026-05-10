const { Router } = require("express");
const router = Router();
const controller = require("../controllers");

router.get("/", controller.homeGet);

router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);

router.get("/sign-up", controller.singUpGet);
router.post("/sign-up", controller.singUpPost);

router.post("/logout", controller.logOutPost);

router.get("/join", controller.joinGet);
router.post("/member", controller.memberPost);
router.post("/admin", controller.adminPost);

router.get("/add-msg", controller.addMsgGet);
router.post("/add-msg", controller.addMsgPost);

router.post("/msg/:id/delete", controller.deleteMsgPost);

module.exports = router;
