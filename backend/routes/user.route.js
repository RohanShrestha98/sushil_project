const { Router } = require('express');
const router = Router();


const userController = require('../controllers/user.controller');


router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get("/bookings/:contact", userController.getBookingsByContact)
router.get("/get-users", userController.getUsers);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;