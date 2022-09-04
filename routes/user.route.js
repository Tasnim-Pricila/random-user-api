const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')


router.route('/save')
        .post(userController.saveAUser)

router.route('/random')
        .get(userController.getRandomUser)

router.route('/all')
        .get(userController.getAllUsers)

router.route('/delete/:id')
        .delete(userController.deleteUser)

router.route('/update/:id')
        .patch(userController.updateUser)

router.route('/bulk-update')
        .patch(userController.bulkUpdate)

module.exports = router;