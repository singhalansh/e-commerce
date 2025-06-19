import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/slice";
import MidSection from "./MidSection";
import Products from "./Products";

function Home() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    console.log("product dekhle bhai tu ", products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Calculate end time for the deal (24 hours from now)
    const dealEndTime = new Date();
    dealEndTime.setDate(dealEndTime.getDate() + 1); // Set to tomorrow

    return (
        <div className="mt-[55px]">
            <Navbar />
            <div className="p-5 flex flex-col gap-5 bg-[#f2f2f2] w-full">
                <Banner />

                {/* Deal of the Day section with timer */}
                <Products
                    title="Deal of the Day"
                    showTimer={true}
                    endTime={dealEndTime.toISOString()}
                    viewAllLink="/products/deals"
                />

                {/* Featured Products section */}
                <Products
                    title="Featured Products"
                    viewAllLink="/products/featured"
                />
                <MidSection />
                {/* New Arrivals section */}
                <Products title="New Arrivals" viewAllLink="/products/new" />
            </div>
        </div>
    );
}

export default Home;
