var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

const customerModel = require('../models/customers.model');

/* GET all customers. */
router.get('/list', function(req, res, next) {

  customerModel.find(function(err, customerListResponse){

    if(err){
      res.send({status: 500, message: 'Unable to find customer'})
    }else{
      const recordCount = customerListResponse.length;
      res.send({status: 200, recordCount: recordCount, result: customerListResponse})
    }
  });
});

/* GET details customers. */
router.get('/view', function(req, res, next) {

  const userId = req.query.userId;

  customerModel.findById(userId, function(err, customerResponse){

    if(err){
      res.send({status: 500, message: 'Unable to find customer'})
    }else{
      res.send({status: 200,  results: customerResponse})
    }
  });
});

/* Create new customers. */
router.post('/add', function(req, res, next) {

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailAddress = req.body.emailAddress;
  let phoneNumber = req.body.phoneNumber;
  let dob = req.body.dob;
  let department = req.body.department;

  let customerObj = new customerModel({
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    phoneNumber: phoneNumber,
    dob: dob,
    department: department
  });

  customerObj.save(function(err, customerObj){

    if(err){
      res.send({status: 500, message: 'Unable to add customer'})
    }else{
      res.send({status: 200, message: 'User added successfully', customerDetails: customerObj})
    }
  });
});

/* Update existing customers. */
router.put('/update', function(req, res, next) {

  const userId = req.body.userId;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailAddress = req.body.emailAddress;
  let phoneNumber = req.body.phoneNumber;
  let dob = req.body.dob;
  let department = req.body.department;

  let customerObj = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    phoneNumber: phoneNumber,
    dob: dob,
    department: department
  };

  customerModel.findByIdAndUpdate(userId, customerObj,  function(err, customerResponse){

    if(err){
      res.send({status: 500, message: 'Unable to Update the customer'})
    }else{
      res.send({status: 200, message: 'User Updated sucessfully', results: customerObj})
    }
  });
});

/* Delete existing customers. */
router.delete('/delete', function(req, res, next) {

  const userId = req.query.userId;

  customerModel.findByIdAndDelete(userId, function(err, customerResponse){

    if(err){
      res.send({status: 500, message: 'Unable to delete the customer'})
    }else{
      res.send({status: 200, message: 'User deleted successfully'})
    }
  });
});

/* Delete multiple customers. */
router.delete('/delete-multiple', function(req, res, next) {

  const userId = req.query.userId;

  customerModel.deleteMany({'firstName': 'Mark'}, function(err, customerResponse){

    if(err){
      res.send({status: 500, message: 'Unable to delete the customer'})
    }else{
      res.send({status: 200, message: 'User deleted successfully'})
    }
  });
});

/* Search existing customers. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;