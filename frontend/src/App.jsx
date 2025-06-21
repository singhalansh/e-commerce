import React, { useContext, useEffect } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { Box } from "@mui/material";
import DataProvider, { DataContext } from "./context/DataProvider";
import { fetchUserProfile } from "./service/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailView from "./components/Product/ProductDetailView";
import { Provider } from "react-redux";
import store from "./store/store";
import Cookies from "js-cookie";
import Cart from "./components/Cart/Cart";

function AppContent() {
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        const autoLoginUser = async () => {
            const token = Cookies.get("accessToken");
            if (token) {
                const response = await fetchUserProfile();
                if (response && response.status === 200) {
                    setAccount(response.data.data);
                }
            }
        };
        autoLoginUser();
    }, [setAccount]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetailView />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <Provider store={store}>
            <DataProvider>
                <AppContent />
            </DataProvider>
        </Provider>
    );
}

export default App;
