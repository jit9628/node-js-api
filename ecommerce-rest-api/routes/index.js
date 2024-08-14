const express = require('express')
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = express.Router()
router.use(cookieParser());
// router.use(cookieParser());
router.use(express.json());
const { verifyToken } = require('../middleware/authToken');
const userController = require('../controllers/userController');
const riderController = require('../controllers/riderController');
const { config } = require('dotenv');
const storage = multer.diskStorage({
  limits: { fileSize: 200 * 1024 * 1024 },
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
router.post('/users/signin', userController.signIn);
router.get('/users/logout',verifyToken,userController.logOut);
router.post('/users', upload.single('profile_image'), userController.createUser);

router.get('/users',verifyToken, userController.getAllUsers);
router.get('/users/:id',verifyToken, userController.getUserById);
router.put('/users/:id',verifyToken, upload.single('profile_image'), userController.updateUserById);
router.delete('/users/:id',verifyToken, userController.deleteUserById);


//riders end points
router.post('/riders', upload.single('profile_image'), riderController.createRider);
module.exports = router