const _ = require("lodash");
const validator = require("validator");
const { User } = require("../models/User");

//email # rỗng  + valid(đúng định dạng email) + unique
//password > 8 +confirm password === password
//DOB # rỗng + valid (Date)

const validatePostInput = async data => {
  let errors = {};
  // neu data.email = undefined => data.email =""
  // neu data.email = "" => data.email =""
  data.email = _.get(data, "email", "");
  data.password = _.get(data, "password", "");
  data.password2 = _.get(data, "password2", "");
  data.DOB = _.get(data, "DOB", "");
  data.userType =_.get(data,"userType","")
  data.phone =_.get(data,"phone","")

  //email
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  } else {
    const user = await User.findOne({ email: data.email });
    if (user) errors.email = "Email exist";
  }

  //password
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = "Password has at least 8 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  } else if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Confirm password must match";
  }

  //date
  if (validator.isEmpty(data.DOB)) {
    errors.DOB = "DOB is required";
  }
  //userTye
  if(validator.isEmpty(data.userType)){
      errors.userType ="User type is required";
  }else if(!validator.equals(data.userType,"driver") && !validator.equals(data.userType,"adim") && !validator.equals(data.userType,"passenger")){
      errors.userType = "User type invalid"
  }

  //phone
  if(validator.isEmpty(data.phone)){
      errors.phone = "phone is required"
  }else if(!validator.isLength(data.phone,{min:10,max:10})){
      errors.phone = "Phone must have 10 characters"
  }
 

  return {
    isValid: _.isEmpty(errors), //true (pass het tat ca validate),false(k pass it nhat 1 fiels)
    errors //{email: email da ton tai,password:it nhat 8 ky tu}
  };
};

module.exports = {
  validatePostInput
};
