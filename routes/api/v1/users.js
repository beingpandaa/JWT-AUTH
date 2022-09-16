const express = require('express');
const router = express.Router();
const passport=require('passport');
const userapi=require('../../../controllers/api/v1/users_api');
router.post('/create',userapi.create);
router.post('/create-session',userapi.createSession);
router.get('/info/:id',passport.authenticate('jwt',{ session: false }),userapi.userinfo);
router.post('/update/:id',passport.authenticate('jwt',{ session: false }),userapi.update);
module.exports = router;