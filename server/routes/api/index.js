const router = require('express').Router();
const plaidRouter = require('./plaid');
const userRouter = require('./user');

router.use('/plaid', plaidRouter);
router.use('/users/', userRouter);

module.exports = router;
