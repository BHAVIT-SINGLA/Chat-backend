const authController=require('../controllers/userController.js')
const router=require("express").Router();
router.post('/register',authController.register);
router.post('/login',authController.login);
router.post('/setavatar/:id',authController.setAvatar)
router.get("/allusers/:id", authController.getAllUsers);
router.get("/logout/:id",authController.logout);
module.exports =router;