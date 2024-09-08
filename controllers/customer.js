const Customer = require('../models/customer');
const Joi = require('joi');

// Add a customer
exports.addCustomer = async (req, res) => {
  const existingCity = await Customer.findOne({ city: req.body.city });
  const existingCompany = await Customer.findOne({ company: req.body.company });

  if (!existingCity || !existingCompany) {
    return res.status(400).send('City and company must already exist.');
  }

  const newCustomer = new Customer(req.body);
  await newCustomer.save();

  res.status(201).send(newCustomer);
};

// List customers with search & pagination
exports.getCustomers = async (req, res) => {
  const { first_name, last_name, city, page = 1, limit = 10 } = req.query;
  const query = {};

  if (first_name) query.first_name = new RegExp(first_name, 'i');
  if (last_name) query.last_name = new RegExp(last_name, 'i');
  if (city) query.city = new RegExp(city, 'i');

  const customers = await Customer.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Customer.countDocuments(query);

  res.json({
    customers,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
};

// Get single customer by id
exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Customer not found');
  res.json(customer);
};

// List unique cities with customer count
exports.getCitiesWithCustomerCount = async (req, res) => {
  const customers = await Customer.aggregate([
    { $group: { _id: "$city", count: { $sum: 1 } } },
  ]);
  res.json(customers);
};
