const _ = require("lodash");
//node playground/lodash_tutorial.js
//_.isEmpty()
//check xem object/array là mảng rổng?
//[],{} =>true
//[1,2,3] => false
console.log(_.isEmpty([1, 2, 3]));
console.log(_.isEmpty([]));
///_.get()
//nesred object (object lồng object)
console.log("=====================================================");

const user1 = {
  credenticals: {
    email: "nguyenvana@gmail.com",
    password: "yyyyxxxx"
  },
  profile: {
    name: "Nguyen Van A",
    age: 23,
    address: {
      number: 10,
      street: "Nguyen Hue",
      provine: "TPHCM"
    }
  }
};
const user2 = {
  credenticals: {
    email: "nguyenvanb@gmail.com",
    password: "yyyyxxxx"
  },
  profile: {
    name: "Nguyen Van B",
    age: 23
    // address:{
    //     number:10,
    //     street:"Nguyen Hue",
    //     provine:"TPHCM"
    // }
  }
};
console.log("không use lodash");
console.log(user1.profile.address.provine);
if (user2.profile && user2.profile.address) {
  console.log(user2.profile.address.provine);
}
console.log("use lodash");
console.log(_.get(user1, "profile.address.provine")); // _.get("đối tượng chắc chắn tồn tại","đối tượng không chắc chắn tồn tại","err")
console.log(_.get(user2, "profile.address.provine", "nguoi dung chua nhap d/c"));
console.log("=============================================");
//_.set (taọ thêm trường dữ liệu)
_.set(user2,"profile.address.provine","Ha Noi") //_.set("đối tượng chắc chắn tồn tại","đối tượng thêm vào")
console.log(JSON.stringify(user2,undefined,2));
