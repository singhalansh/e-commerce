import User from "../models/user.model.js";

export const usersignup = async (req, res) => {
    try {
        console.log(
            "abhi to chal raha hai , vishwas na ho to dekhle ",
            req.body
        );
        const { firstName, lastName, mobile, email, password } = req.body;
        await User.create({
            firstName,
            lastName,
            mobile,
            email,
            password,
        })
            .then((user) => {
                console.log("user created successfully", user);
                res.status(201).json({ message: "User created successfully" });
            })
            .catch((error) => {
                console.log("error in creating user ", error);
                if (error.code === 11000) {
                    res.status(409).json({ message: "User already exists" });
                } else {
                    res.status(500).json({ message: "Internal server error" });
                }
            });
    } catch (error) {
        console.log("error in sign up ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const userlogin = async (req, res) => {
    try {
        console.log("login ki api me aa gaya ", req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email: email , password: password });

        if (!user) {
            console.log("user not found ", user);
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({data:user, message: "Login successful", user });
        
    }
    catch (error) {
        console.log("error in login ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};