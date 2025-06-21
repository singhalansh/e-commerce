import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    IconButton,
    Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Search from "./Search";
import CustomButtons from "./CustomButtons";
import { useState } from "react";

function Header() {
    const logoURL =
        "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";

    const isMobile = useMediaQuery("(max-width:900px)");
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <AppBar>
            <Toolbar>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            onClick={() => setDrawerOpen(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="left"
                            open={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        >
                            <Box sx={{ width: 250, padding: 2 }}>
                                <CustomButtons isMobile={true} />
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <img src={logoURL} style={{ width: 75 }} alt="logo" />
                        <Box sx={{ flexGrow: 1, ml: 2 }}>
                            <Search />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                "& > *": {
                                    marginLeft: 2,
                                },
                            }}
                        >
                            <CustomButtons isMobile={false} />
                        </Box>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
