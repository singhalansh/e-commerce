import React, { useState } from "react";
import {
    AppBar,
    Box,
    styled,
    Toolbar,
    IconButton,
    Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Search from "./Search";
import CustomButtons from "./CustomButtons";

function Header() {
    const StyledHeader = styled(AppBar)`
        background: #2874f0;
        height: 55px;
        display: flex;
        justify-content: center;
    `;
    const logoURL =
        "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";

    const isMobile = useMediaQuery("(max-width:900px)");
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <StyledHeader>
                <Toolbar
                    style={{
                        minHeight: 55,
                        paddingLeft: isMobile ? 8 : "12%",
                        paddingRight: isMobile ? 8 : "12%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setDrawerOpen(true)}
                                sx={{ mr: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                        <img src={logoURL} style={{ width: 75 }} alt="logo" />
                        <Box
                            sx={{
                                display: { xs: "none", sm: "flex" },
                                flexDirection: "column",
                                ml: 1,
                            }}
                        >
                            <Box className="flex leading-[1] italic text-[10px]">
                                <h1>Explore&nbsp;</h1>
                                <h1 className="text-[#FFE500]">Plus</h1>
                                <img
                                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
                                    style={{ width: 10, marginLeft: 6 }}
                                    alt=""
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Search />
                    {!isMobile && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                ml: 3,
                            }}
                        >
                            <CustomButtons isMobile={false} />
                        </Box>
                    )}
                </Toolbar>
            </StyledHeader>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: 220 } }}
            >
                <Box sx={{ width: 220, p: 2 }}>
                    <CustomButtons isMobile={true} />
                </Box>
            </Drawer>
        </>
    );
}

export default Header;
