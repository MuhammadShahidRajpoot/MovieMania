const { Router } = require('express');
const { loginUser, registerUser, updateUser, users} = require('../controllers/user/user.controller');
const ensureToken = require('../utils/ensure_token');
const router = Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/',[ensureToken], updateUser);
router.get('/', [ensureToken], users);
module.exports = router;
