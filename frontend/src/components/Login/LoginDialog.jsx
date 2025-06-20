import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import { authenticateSignup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

function LoginDialog({ open, setOpen }) {
    const [account, toggleAccount] = React.useState("login");
    const signup = {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
    };
    const [signupData, setSignupData] = React.useState(signup);
    const login = {
        email: "",
        password: "",
    };
    const [loginData, setLoginData] = React.useState(login);
    const onInputChange = (e) => {
        if (account === "login") {
            setLoginData({ ...loginData, [e.target.name]: e.target.value });
        } else {
            setSignupData({ ...signupData, [e.target.name]: e.target.value });
        }
    };
    const handleClose = () => {
        setOpen(false);
        toggleAccount("login");
    };

    const signupUser = async () => {
        let response = await authenticateSignup(signupData);
        if (!response) return;
        console.log(response);
        setAccount(response.data.data);
        handleClose();
    };

    const loginUser = async () => {
        let response = await authenticateLogin(loginData);

        if (!response || response.status !== 200) {
            alert("Please enter a valid email and password");
            return;
        }
        console.log(response);
        setAccount(response.data.data);
        handleClose();
    };
    const { setAccount } = React.useContext(DataContext);
    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}
            slotProps={{
                paper: { sx: { maxWidth: "unset", maxHeight: "unset" } },
            }}
        >
            <div className="w-[32.9vw] h-[60vh] bg-white flex">
                <div className="left py-[45px] px-[25px] h-full w-[40%] bg-[#2874f0] bg-[url('https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png')] bg-no-repeat bg-[center_85%]">
                    <h1 className="text-white font-semibold text-xl">
                        {account === "login"
                            ? "LOGIN"
                            : "Looks like you're new here"}
                    </h1>
                    <h3 className="text-white mt-5">
                        {account === "login"
                            ? "Get access to your Orders, Wishlist and Recommendations"
                            : "Sign up to get started"}
                    </h3>
                </div>
                <div className="right h-full w-[60%] p-8">
                    {account === "login" ? (
                        <>
                            <TextField
                                variant="standard"
                                label="Enter Email/Mobile Number"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onInputChange(e)}
                                name="email"
                            />
                            <TextField
                                variant="standard"
                                label="Enter Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onInputChange(e)}
                                name="password"
                            />
                            <p className="mt-20 text-blue-500">
                                By continuing, you agree to Flipkart's Terms of
                                Use and Privacy Policy.
                            </p>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 4,
                                    position: "relative",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "80%",
                                    borderRadius: "2px",
                                    height: "48px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    backgroundColor: "#fb641b",
                                }}
                                onClick={() => loginUser()}
                            >
                                Login
                            </Button>
                            <p className="mt-4 text-center">OR</p>
                            <Button
                                variant="text"
                                color="primary"
                                sx={{
                                    mt: 2,
                                    position: "relative",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "80%",
                                    borderRadius: "2px",
                                    height: "48px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    backgroundColor: "#fff",
                                    color: "#2874f0",
                                    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
                                }}
                            >
                                Request OTP
                            </Button>
                            <p className="mt-10 flex items-center">
                                New to Flipkart?{" "}
                                <Button
                                    onClick={() => toggleAccount("register")}
                                    variant="text"
                                    className="text-blue-500 translate-0.5"
                                >
                                    Create an account
                                </Button>
                            </p>
                        </>
                    ) : (
                        <>
                            <TextField
                                variant="standard"
                                label="Enter First Name"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onInputChange(e)}
                                name="firstName"
                            />
                            <TextField
                                variant="standard"
                                label="Enter Last Name"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onInputChange(e)}
                                name="lastName"
                            />
                            <TextField
                                variant="standard"
                                label="Enter Mobile Number"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onInputChange(e)}
                                name="mobile"
                            />
                            <TextField
                                variant="standard"
                                label="Enter Email"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onInputChange(e)}
                                name="email"
                            />
                            <TextField
                                variant="standard"
                                label="Enter Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                onChange={(e) => onInputChange(e)}
                                name="password"
                            />
                            <p className="mt-8 text-blue-500">
                                By continuing, you agree to Flipkart's Terms of
                                Use and Privacy Policy.
                            </p>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 4,
                                    position: "relative",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "80%",
                                    borderRadius: "2px",
                                    height: "48px",
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    backgroundColor: "#fb641b",
                                }}
                                onClick={() => signupUser()}
                            >
                                Sign Up
                            </Button>
                            <p className="flex items-center">
                                Existing User?{" "}
                                <Button
                                    onClick={() => toggleAccount("login")}
                                    variant="text"
                                    className="text-blue-500 translate-0.5"
                                >
                                    Login
                                </Button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </Dialog>
    );
}

export default LoginDialog;
