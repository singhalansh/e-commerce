import React, { useState, useEffect } from "react";
import { getCart } from "../service/api.js";

export const DataContext = React.createContext({
    account: null,
    setAccount: () => {},
    cart: [],
    setCart: () => {},
});

function DataProvider({ children }) {
    const [account, setAccount] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            if (account) {
                const response = await getCart();
                if (response && response.status === 200) {
                    setCart(response.data.data);
                }
            } else {
                setCart([]);
            }
        };
        fetchCart();
    }, [account]);

    return (
        <DataContext.Provider value={{ account, setAccount, cart, setCart }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;
