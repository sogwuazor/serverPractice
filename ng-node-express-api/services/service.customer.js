var Validator = require('fastest-validator');
const CustomerModel = require('../models/model.customer');

let customers = {};
let counter = 0;

let customerValidator = new Validator();

/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let zipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;

const customerVSchema = {
  guid: {type: "string", min: 3},

  user_name: {type: "string", min: 1, max: 50, pattern: namePattern},
  first_name: {type: "string", min: 1, max: 50, pattern: namePattern},
  last_name: {type: "string", min: 1, max: 50, pattern: namePattern},
  email: {type: "email", max: 75},
  zipcode: {type: "string", max: 5, pattern: zipCodePattern},

  password: {type: "string", min: 2, max: 50, pattern: passwordPattern}
};

class CustomerService {
  /*create function*/
  static create(data) {
    let vres = customerValidator.validate(data, customerVSchema);

    if (!(vres === true)) {
      let errors = {},
        item;

      for (const index in vres) {
        item = vres[index];

        errors[item.field] = item.message;
      }

      throw {
        name: 'ValidationError',
        message: errors
      }
    }

    let customer = new CustomerModel(data.user_name, data.first_name, data.last_name, data.email, data.zipcode, data.password);

    customer.uid = 'c' + counter++;
    customer[customer.uid] = customer;


    return customer
  }

  /*retrieve by id*/
  /*delete by id*/

  /*update by id*/

  /*delete by id*/
  static retrieve(uid) {
    if (customers[uid] != null) {
      return customers[uid];
    } else {
      throw new Error('Unable to retrieve a customer by (uid:' + uid + ')');
    }
  }

  static update(uid, data) {
    if (customers[uid] != null) {
      const customer = customers[uid];

      Object.assign(customer, data);
    } else {
      throw new Error('Unable to retrieve a customer by (uid:' + cuid + ')');
    }
  }

  static delete(uid) {
    if (customers[uid] != null) {
      delete customers[uid];
    } else {
      throw new Error('Unable to retrieve a customer by (uid:' + cuid + ')');
    }
  }
}

module.exports = CustomerService;
