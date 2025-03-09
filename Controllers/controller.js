const { default: mongoose } = require("mongoose");
const userModel = require("../Models/userModel");

const validateUser = (user) => {
  const { firstName, lastName, email, password, jobTitle } = user;
  const error = [];
  if (!firstName?.trim()) error.push("First name is required");
  if (!lastName?.trim()) error.push("Last name is required");
  if (!email?.trim()) error.push("Email is required");
  if (!password?.trim()) error.push("Password is required");
  if (!jobTitle?.trim()) error.push("Job Title is required");
  return error;
};

async function handleCreateUser(req, res) {
  const reqBody = req.body;
  const validationError = validateUser(reqBody);

  if (validationError?.length > 0) {
    return res.status(404).json({ message: validationError?.join(", ") });
  }

  try {
    const createUser = await userModel.create({
      firstName: reqBody.firstName,
      lastName: reqBody.lastName,
      email: reqBody.email,
      password: reqBody.password,
      jobTitle: reqBody.jobTitle,
    });
    return res
      .status(201)
      .json({ message: "User Created Successfully", data: createUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function handleGetAllUser(req, res) {
  try {
    const getAllUserDetails = await userModel.find({});
    return res.status(201).json({
      message: "User Detail fetched successfully",
      data: getAllUserDetails,
    });
  } catch (error) {
    console.error("Error while getting user detail :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function handleValidate(req, res) {
  const email = req.body.email;
  if (!email) {
    return res.status(404).json({ message: "Email is required" });
  }
  try {
    const isUserExist = await userModel.findOne({ email: email });
    console.log("isUserExist", isUserExist);
    if (isUserExist) {
      return res.status(200).json({ message: "User verified" });
    } else {
      return res.status(200).json({ message: "User does not Exist" });
    }
  } catch (error) {
    console.error("Error while getting validate user :", error);
    return req.send(500).json({ message: "Internal Server Error" });
  }
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const errMessage = [];
  console.log("email", email);
  if (!email?.trim()) errMessage.push("Email is required");
  if (!password?.trim()) errMessage.push("Password is required");
  if (errMessage.length > 0) {
    return res.status(400).json({ message: errMessage.join(", ") });
  }

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
async function handleDeleteUserById(req, res) {
  const userId = req.params.id;
  console.log("userID", userId);
  console.log("userId===", userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "enter valid user id" });
  }
  if (!userId) {
    return res.status(400).json({ message: "user id is required" });
  }
  try {
    const deleteUser = await userModel.findByIdAndDelete(userId);
    console.log("deleteUser--", deleteUser);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", deleteUser });
  } catch (error) {
    console.error("Error while deleting user :", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
module.exports = {
  handleCreateUser,
  handleGetAllUser,
  handleValidate,
  handleUserLogin,
  handleDeleteUserById,
};
