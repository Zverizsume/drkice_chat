const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.get('/users', usersController.index, usersController.api);
router.post('/users/register', usersController.register);
router.post('/users/login', usersController.apiAuth);
router.get('/users/logout', usersController.logout);
router.use(usersController.verifyJWT);
router.get('/users/me', usersController.showMe);
// router.get('/users/:id/edit');
// router.put('/users/:id/update');
// router.delete('/users/:id/delete');
router.use(usersController.apiError);

module.exports = router;