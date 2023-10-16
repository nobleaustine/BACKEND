let express = require('express');
const {register,login,getMe} = require('../controller/tureONianController')
const {protect} = require('../middleware/checkAuth')
const router = express.Router();

router.get("/", async (req, res, next) => {
    return res.status(200).json({
      title: "BACKEND TESTING",
      message: "The app is working properly ......",
    });
  });

router.route('/tureONian/register').post(register);

router.route('/tureONian/login').post(login);

router.get("/tureONian/me",getMe);

module.exports = router;


















   
