const express = require("express");
const {
  handleCreateUser,
  handleGetAllUser,
  handleValidate,
  handleUserLogin,
  handleDeleteUserById,
} = require("../Controllers/controller");
const router = express.Router();
router.post("/createUser", handleCreateUser);
router.get("/getUserDetail", handleGetAllUser);
router.post("/validateUser", handleValidate);
router.post("/login", handleUserLogin);
router.delete("/deleteUserById/:id", handleDeleteUserById);
module.exports = router;
