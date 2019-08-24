// const multer = require("multer");
// const path = require('path');


// const uploadImages =(type) =>{
//     const storage = multer.diskStorage({
//         destination: function(req, file, cb) {
//           const uploadPath = path.join(__dirname + '/../../../uploads/avatars')
//           cb(null, `./uploads/${type}s`);
//         },
//         filename: function(req, file, cb) {
//           console.log(file);
//           cb(null, Date.now() + "-" + file.originalname);
//         }
//       });
//       const upload = multer({storage:storage})
// }
// module.exports = {
//   uploadImages
// }