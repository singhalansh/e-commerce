import User from "../models/user.model.js";

export const usersignup = async (req, res) => {
    try {
        const { firstName, lastName, mobile, email, password } = req.body;
        if (
            [firstName, lastName, mobile, email, password].some(
                (field) => field.trim() === ""
            )
        ) {
            throw new Error(400, "All fields are required");
        }
        const existedUser = await User.findOne({ email: email });
        if (existedUser) {
            console.log("user already exists ", existedUser);
            throw new Error(409, "User already exists");
        }
        console.log("signup ki api me aa gaya meow", req.body);
        const newUser = await User.create({
            firstName,
            lastName,
            mobile,
            email,
            password,
        });
        console.log("new user created ", newUser);
        const user = await User.findById(newUser._id).select(
            "-password -refreshToken"
        );
        return res
            .status(201)
            .json({ data: user, message: "User created", user });
    } catch (error) {
        console.log(" signup me hi error aa rha bhai ", error);
        res.status(error.status || 500).json({
            message: error.message || "Internal server error",
        });
    }
};

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(500, "Failed to generate access and refresh token");
    }
};

export const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if ([email, password].some((field) => field.trim() === "")) {
            throw new Error(400, "All fields are required");
        }
        console.log("login ki api me aa gaya ", req.body);
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("user not found ", user);
            throw new Error(404, "User not found");
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            throw new Error(401, "Invalid email or password");
        }
        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);
        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        if (!loggedInUser) {
            throw new Error(404, "User not found");
        }
        console.log("user logged in successfully ", loggedInUser);
        
        const accessTokenOptions = {
            secure: true,
            httpOnly: false,
        };
        const refreshTokenOptions = {
            secure: true,
            httpOnly: true,
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, accessTokenOptions)
            .cookie("refreshToken", refreshToken, refreshTokenOptions)
            .json({
                data: user,
                message: "Login successful",
                user,
                accessToken,
                refreshToken,
            });
    } catch (error) {
        console.log(" login me hi error aa rha bhai ", error);
        res.status(error.status || 500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const userlogout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined,
                },
            },
            {
                new: true,
            }
        );

        const accessTokenOptions = {
            secure: true,
            httpOnly: false,
        };
        const refreshTokenOptions = {
            secure: true,
            httpOnly: true,
        };

        return res
            .status(200)
            .clearCookie("accessToken", accessTokenOptions)
            .clearCookie("refreshToken", refreshTokenOptions)
            .json({ message: "Logout successful" });
    } catch (error) {
        console.log(" logout me hi error aa rha bhai ", error);
        res.status(error.status || 500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new Error(400, "User ID is required");
        }
        console.log("get user details api me aa gaya ", req.params);
        const user = await User.findById(userId).select(
            "-password -refreshToken"
        );
        if (!user) {
            throw new Error(404, "User not found");
        }
        return res
            .status(200)
            .json({ data: user, message: "User details fetched" });
    } catch (error) {
        console.log(" get user details me hi error aa rha bhai ", error);
        res.status(error.status || 500).json({
            message: error.message || "Internal server error",
        });
    }
};

export const getMyProfile = (req, res) => {
    // The user object is attached by the verifyJwt middleware
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res
        .status(200)
        .json({ data: user, message: "User profile fetched successfully" });
};
