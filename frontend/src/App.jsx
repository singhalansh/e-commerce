import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import DataProvider from "./context/DataProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailView from "./components/Product/ProductDetailView";

function App() {
    return (
        <Provider store={store}>
            <DataProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetailView />}
                        />
                        {/* Add more routes as needed */}
                    </Routes>
                </Router>
            </DataProvider>
        </Provider>
    );
}

export default App;
