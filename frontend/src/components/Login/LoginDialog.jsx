import React from "react";
import {
    Button,
    Dialog,
    TextField,
    Box,
    styled,
    Typography,
} from "@mui/material";
import { authenticateSignup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)(({ theme }) => ({
    display: "flex",
    height: "60vh",
    width: "32.9vw",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        width: "90vw",
        height: "auto",
    },
}));

const LeftWrapper = styled(Box)(({ theme }) => ({
    padding: "45px 25px",
    height: "100%",
    width: "40%",
    backgroundColor: "#2874f0",
    backgroundImage: `url(${"https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 85%",
    color: "#fff",
    "& > h1": {
        fontWeight: 600,
        fontSize: "1.5rem",
    },
    "& > h3": {
        marginTop: "1.25rem",
    },
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
    height: "100%",
    width: "60%",
    padding: "2rem",
    [theme.breakpoints.down("md")]: {
        width: "100%",
    },
}));

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
            <Component>
                <LeftWrapper>
                    <h1>
                        {account === "login"
                            ? "LOGIN"
                            : "Looks like you're new here"}
                    </h1>
                    <h3>
                        {account === "login"
                            ? "Get access to your Orders, Wishlist and Recommendations"
                            : "Sign up to get started"}
                    </h3>
                </LeftWrapper>
                <RightWrapper>
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
                            <Typography
                                sx={{
                                    marginTop: "2.5rem",
                                    color: "primary.main",
                                    fontSize: "14px",
                                }}
                            >
                                By continuing, you agree to Flipkart's Terms of
                                Use and Privacy Policy.
                            </Typography>
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
                            <Typography
                                sx={{ marginTop: "1rem", textAlign: "center" }}
                            >
                                OR
                            </Typography>
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
                            <Typography
                                sx={{
                                    marginTop: "2.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                }}
                            >
                                New to Flipkart?{" "}
                                <Button
                                    onClick={() => toggleAccount("register")}
                                    variant="text"
                                    sx={{
                                        color: "primary.main",
                                        transform: "translateY(0.125rem)",
                                    }}
                                >
                                    Create an account
                                </Button>
                            </Typography>
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
                            <Typography
                                sx={{
                                    marginTop: "2rem",
                                    color: "primary.main",
                                    fontSize: "14px",
                                }}
                            >
                                By continuing, you agree to Flipkart's Terms of
                                Use and Privacy Policy.
                            </Typography>
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
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "14px",
                                }}
                            >
                                Existing User?{" "}
                                <Button
                                    onClick={() => toggleAccount("login")}
                                    variant="text"
                                    sx={{
                                        color: "primary.main",
                                        transform: "translateY(0.125rem)",
                                    }}
                                >
                                    Login
                                </Button>
                            </Typography>
                        </>
                    )}
                </RightWrapper>
            </Component>
        </Dialog>
    );
}

export default LoginDialog;
