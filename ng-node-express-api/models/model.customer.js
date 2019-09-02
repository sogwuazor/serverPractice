
class CustomerModel
{
  constructor(uid, user_name, first_name, last_name, email, zipcode, password)
  {
    this.uid = uid;
    this.user_name = user_name;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.zipcode = zipcode;
    this.password = password;
  }
}

module.exports = CustomerModel;
