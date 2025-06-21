import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import LoginDialog from "../Login/LoginDialog";
import { DataContext } from "../../context/DataProvider";
import Profile from "./Profile";
import { Badge } from "@mui/material";
import { Link } from "react-router-dom";

function CustomButtons({ isMobile }) {
    const [open, setOpen] = React.useState(false);
    const { account, cart } = React.useContext(DataContext);

    // Responsive: vertical on mobile, horizontal on desktop
    return (
        <div
            className={
                isMobile
                    ? "flex flex-col gap-4 items-stretch w-full"
                    : "flex flex-row gap-4 items-center"
            }
        >
            {account ? (
                <Profile account={account} />
            ) : (
                <button
                    className={
                        "bg-white text-[#2874f0] font-bold py-2 px-4 rounded active:bg-gray-100 " +
                        (isMobile ? "w-full" : "w-auto ml-5")
                    }
                    onClick={() => setOpen(true)}
                >
                    Login
                </button>
            )}
            <h1 className={isMobile ? "w-full text-center" : "w-auto ml-5"}>
                Become a seller
            </h1>
            <div
                className={
                    isMobile
                        ? "flex items-center justify-center w-full"
                        : "flex items-center ml-5"
                }
            >
                <h1>More</h1>
                <RiArrowDropDownLine className="text-3xl" />
            </div>
            <div
                className={
                    isMobile
                        ? "flex items-center justify-center w-full"
                        : "flex items-center ml-5"
                }
            >
                <Link
                    to="/cart"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                    <Badge badgeContent={cart.length} color="secondary">
                        <FaShoppingCart />
                    </Badge>
                    <h1 className="ml-1">Cart</h1>
                </Link>
            </div>
            <LoginDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default CustomButtons;
