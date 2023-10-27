const router = require('express').Router();
const plaidRouter = require('./plaid');
const userRouter = require('./user');
const authRouter = require('./auth');

router.use('/plaid', plaidRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;
