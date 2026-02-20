import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/user.models.js";
import { ApiError } from "../../utils/apiError.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  //===> Check if user already exists <===

  const existedUser = await User.findOne({
    $or: [{ email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists!");
  }

  //===> Create User <===

  const user = new User({
    email,
    password,
    name,
  });

  const authorizationToken = user.generateAccessToken();

  user.authorizationToken = authorizationToken;

  await user.save();

  //===> Send Response <===

  const responseData = {
    _id: user._id,
    authorizationToken,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, responseData, "User registered successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //===> Check if user exists or not <===

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is incorrect.");
  }

  const authorizationToken = user.generateAccessToken();

  user.authorizationToken = authorizationToken;

  await user.save();

  //===> Send Response <===

  const responseData = {
    _id: user._id,
    authorizationToken,
    email: user.email,
    name: user.name,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, responseData, "User login successfully."));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  user.authorizationToken = "";

  await user.save();

  return res.status(200).json(new ApiResponse(200, null, "Logout Successful."));
});

const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User fetched successfully."));
});

export { registerUser, loginUser, logoutUser, getUser };
