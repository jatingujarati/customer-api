const express = require('express');
const router = express.Router();
const { validate } = require('express-validation')
const customerController = require('../controllers/customer');
const { addCustomerValidation } = require('../validation/customer');

router.post('/add', validate(addCustomerValidation), customerController.addCustomer);
router.get('/list', customerController.getCustomers);
router.get('/city-list', customerController.getCitiesWithCustomerCount);
router.get('/:id', customerController.getCustomerById);

module.exports = router;
