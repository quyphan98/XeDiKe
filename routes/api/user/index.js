const express = require("express");
const router = express.Router();
const userController = require("./controller");
const { authenticate, authorize } = require("../../../middlewares/auth");
// const { uploadImages } = require("../../../middlewares/uploadImages");

//GET      {host}/api/users(PUBLIC)
//GET      {host}/api/users/:id
//POST     {host}/api/users (PUBLIC)
//PUT  {host}/api/users/:id
//DELETE   {host}/api/users/:id

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put(
  "/:id",
  authenticate,
  authorize(["driver", "passenger"]),
  userController.updateUserById
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUserById
);
router.post("/login", userController.login);
// router.post(
//   "/upload-avatar/:id",
//   authenticate,
//   authorize(["driver"], ["passenger"]),
//   // upload.single("avatar"),
//   uploadImages("avatar"),
//   userController.uploadAvatar
// );

module.exports = router;
