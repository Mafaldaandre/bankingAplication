const homeAction = require('../actions/user/home.action');
const userListAction = require('../actions/user/accountType/list.action');
const { getAllAccounts, removed } = require('../actions/user/account/accountList.action');
const {loadForm,createAccount } = require('../actions/user/accountType/form.action');
const { profile, updateProfile} = require('../actions/user/profile.action');
const userAccountDetailsAction = require('../actions/user/account/details.action');
const { transactionsNacional, createNewTransactionNational, transactionsInternational, createNewTransactionInternational, transactionsReforce , transactionsLiquidation} = require('../actions/user/account/transactions.action');
const { userPathValidation } = require('../security/validation');
const router = require('express').Router();


router.get('/home',userPathValidation,  homeAction );

router.get('/accountType/list',  userListAction);

router.get('/account/List', userPathValidation, getAllAccounts);

router.get('/accountType/:id',  loadForm);
router.post('/accountType/:id', createAccount);

router.get('/profile',userPathValidation, profile);
router.post('/profile',userPathValidation, updateProfile);

router.get('/account/:id',userPathValidation, userAccountDetailsAction);
router.get('/account/:id/delete', removed);

router.get('/account/transfers/nationals',userPathValidation,  transactionsNacional);
router.post('/account/transfers/nationals', createNewTransactionNational);

router.get('/account/transfers/international', userPathValidation, transactionsInternational);
router.post('/account/transfers/international', userPathValidation,  createNewTransactionInternational); 

router.get('/account/liquidation/:id',userPathValidation,  transactionsLiquidation);
router.post('/account/liquidation/:id',userPathValidation,  transactionsLiquidation);

router.get('/account/reforce/:id',userPathValidation, transactionsReforce);
router.post('/account/reforce/:id', userPathValidation, transactionsReforce);

module.exports = router;