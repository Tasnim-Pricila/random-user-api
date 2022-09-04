const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')


router.route('/save')
        .post(userController.saveAUser)

router.route('/random')
        .get(userController.getRandomUser)

module.exports = router;