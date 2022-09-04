const { register, createRegister} = require('../actions/manager/register.action');
const managerHomeAction = require('../actions/manager/home.action');
const managerListAction = require('../actions/manager/accountType/list.action');
const managerFormAction = require('../actions/manager/accountType/form.action');
const managerDetailAction = require('../actions/manager/accountType/detail.action');
const managerSaveAction = require('../actions/manager/accountType/save.action');
const managerDeleteAction = require('../actions/manager/accountType/delete.action');
const { profile, updateProfile} = require('../actions/manager/profile.action');
const newClientAction = require('../actions/manager/client/newClient.action');
const saveNewClientAction = require('../actions/manager/client/saveNewClient.action');
const clientListAction = require('../actions/manager/client/clientList.action');
const clientDetailAction = require('../actions/manager/client/clientDetail.action');
const clientDeleteAction =  require('../actions/manager/client/clientDelete.action');
const { managerPathValidation } = require('../security/validation');
const router = require('express').Router();

router.get('/register', register);
router.post('/register',  createRegister);

router.get('/home',managerPathValidation, managerHomeAction); 

router.get('/accountType/list',managerPathValidation,  managerListAction);
router.get('/accountType/:id',managerPathValidation,  managerDetailAction);

router.get('/accountType/:id/form', managerPathValidation, managerFormAction);
router.post('/accountType/:id/form',managerPathValidation ,  managerSaveAction);
router.get('/accountType/:id/delete',managerPathValidation,  managerDeleteAction);

router.get('/profile', managerPathValidation, profile);
router.post('/profile',managerPathValidation,  updateProfile);

router.get('/client/:id/newClient',managerPathValidation,  newClientAction);
router.post('/client/:id/newClient',managerPathValidation,  saveNewClientAction);

router.get('/client/clientList',managerPathValidation,  clientListAction);
router.get('/client/clientList/:id', managerPathValidation,  clientDetailAction);
router.post('/client/clientList/:id', managerPathValidation,  clientDetailAction);

router.get('/:id/delete',managerPathValidation,  clientDeleteAction);

module.exports = router;