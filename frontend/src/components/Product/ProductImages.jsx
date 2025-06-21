import React, { useState, useContext, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@mui/material";
import { FlashOn, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { addToCart } from "../../service/api";
import { generateRazorpayOrder } from "../../service/api";
import { verifyPayment } from "../../service/api";

function ProductImages({
    productImages,
    selectedImage,
    setSelectedImage,
    isWishlisted,
    setIsWishlisted,
    product,
    quantity,
}) {
    const navigate = useNavigate();
    const { account, cart, setCart } = useContext(DataContext);
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (isRedirecting) {
            navigate("/cart");
            setIsRedirecting(false);
        }
    }, [cart, isRedirecting, navigate]);

    const handleAddToCart = async () => {
        if (!account) {
            alert("Please login to add items to your cart.");
            return;
        }
        try {
            const response = await addToCart(product._id, quantity);
            if (response && response.status === 200) {
                setCart(response.data.data);
                setIsRedirecting(true);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add item to cart. Please try again.");
        }
    };

    const handleBuyNow = async () => {
        if (!account) {
            alert("Please login to buy items.");
            return;
        }
        try {
            const response = await generateRazorpayOrder(product.price.cost);
            if (response && response.status === 200) {
                // Handle successful order creation
                console.log(
                    "Razorpay order created successfully:",
                    response.data
                );
                // Razorpay script validation
                if (typeof window.Razorpay !== "function") {
                    alert(
                        "Razorpay payment gateway is not loaded. Please check your internet connection or try again later."
                    );
                    return;
                }
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use VITE_ prefix for Vite
                    amount: response.data.order.amount, // Amount in paise
                    currency: response.data.order.currency,
                    name: "Your Store Name",
                    description: "Purchase Description",
                    order_id: response.data.order.id, // Order ID from Razorpay
                    handler: async function (razorpayResponse) {
                        console.log("Payment successful:", razorpayResponse);
                        // Send payment details to backend for verification
                        try {
                            const verifyRes = await verifyPayment({
                                razorpay_payment_id:
                                    razorpayResponse.razorpay_payment_id,
                                razorpay_order_id:
                                    razorpayResponse.razorpay_order_id,
                                razorpay_signature:
                                    razorpayResponse.razorpay_signature,
                            });

                            if (verifyRes && verifyRes.status === 200) {
                                alert("Payment verified and successful!");
                                // Optionally redirect or update UI
                            } else {
                                alert(
                                    "Payment verification failed. Please contact support."
                                );
                            }
                        } catch (err) {
                            alert("Error verifying payment. Please try again.");
                        }
                    },
                    prefill: {
                        name: account.name,
                        email: account.email,
                        contact: account.phone,
                    },
                };
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            console.error("Error during buy now:", error);
            alert("Failed to proceed with purchase. Please try again.");
        }
    };
    return (
        <div className="flex flex-col items-center">
            {/* Main Image */}
            <div className="relative w-full h-[400px] border rounded-lg overflow-hidden mb-4">
                <img
                    src={productImages[selectedImage]}
                    alt="Selected product"
                    className="w-full h-full object-contain"
                />
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                        isWishlisted
                            ? "bg-red-100 text-red-500"
                            : "bg-gray-100 text-gray-500 hover:bg-red-50"
                    }`}
                >
                    <Heart
                        className={`w-6 h-6 ${
                            isWishlisted ? "fill-current" : ""
                        }`}
                    />
                </button>
            </div>
            {/* Thumbnail Images */}
            {productImages && productImages.length > 1 && (
                <div className="flex space-x-2 mb-4 overflow-x-auto">
                    {productImages.slice(0, 6).map((img, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-16 h-16 border rounded-md cursor-pointer overflow-hidden ${
                                selectedImage === index
                                    ? "border-blue-500"
                                    : "border-gray-200"
                            }`}
                            onClick={() => setSelectedImage(index)}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4 w-full">
                <Button
                    variant="contained"
                    onClick={handleAddToCart}
                    sx={{
                        flex: 1,
                        background: "#ff9f00",
                        color: "#fff",
                        fontWeight: 600,
                        py: 1.5,
                        width: "100%",
                        "&:hover": {
                            background: "#e68900",
                        },
                    }}
                    startIcon={<ShoppingCart />}
                >
                    Add to Cart
                </Button>
                <Button
                    variant="contained"
                    onClick={handleBuyNow}
                    sx={{
                        flex: 1,
                        background: "#fb641b",
                        color: "#fff",
                        fontWeight: 600,
                        py: 1.5,
                        minWidth: "180px",
                        "&:hover": {
                            background: "#e55a19",
                        },
                    }}
                    startIcon={<FlashOn />}
                >
                    Buy Now
                </Button>
            </div>
        </div>
    );
}

export default ProductImages;
