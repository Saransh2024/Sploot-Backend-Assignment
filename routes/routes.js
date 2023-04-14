const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth=require("../middlewares/auth");
const {login,register,updateprofile} =require("../controllers/usercontroller");
const {getarticles,createarticle}=require("../controllers/articlecontroller")

router.post("/signup", register);

router.post("/login", login);

router.get("/articles",auth,getarticles);

router.post("/users/:userId/articles",auth,createarticle);

router.put("/users/:userId",auth,updateprofile)
module.exports = router;
