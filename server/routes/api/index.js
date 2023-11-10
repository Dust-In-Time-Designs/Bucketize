const router = require('express').Router();
const plaidRouter = require('./plaid');
const userRouter = require('./user');
const authRouter = require('./auth');
const budgetRouter = require('./budget');

router.use('/plaid', plaidRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/budgets', budgetRouter);

module.exports = router;
