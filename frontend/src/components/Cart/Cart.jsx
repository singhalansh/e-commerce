import React, { useContext, useState, useMemo } from "react";
import { DataContext } from "../../context/DataProvider";
import {
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Divider,
    Alert,
    Skeleton,
    Snackbar,
    TextField,
    Grid,
    Chip,
    Paper,
} from "@mui/material";
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as CartIcon,
    LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import {
    removeFromCart,
    updateCartItemQuantity,
    generateCartRazorpayOrder,
} from "../../service/api";

const Cart = () => {
    const { cart, setCart } = useContext(DataContext);
    const [loading, setLoading] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [promoCode, setPromoCode] = useState("");
    const [promoDiscount, setPromoDiscount] = useState(0);

    // Calculate totals
    const totals = useMemo(() => {
        const subtotal = cart.reduce((sum, item) => {
            const price =
                item.productId.price?.cost || item.productId.price || 0;
            return sum + price * item.quantity;
        }, 0);

        const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
        const discount = (subtotal * promoDiscount) / 100;
        const total = subtotal + shipping - discount;

        return { subtotal, shipping, discount, total };
    }, [cart, promoDiscount]);

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    };

    const handleRemoveFromCart = async (productId) => {
        setLoading((prev) => ({ ...prev, [productId]: true }));
        try {
            const response = await removeFromCart(productId);
            if (response && response.status === 200) {
                setCart(response.data.data);
                showSnackbar("Item removed from cart");
            }
        } catch (error) {
            showSnackbar("Failed to remove item", "error");
        } finally {
            setLoading((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }

        setLoading((prev) => ({ ...prev, [productId]: true }));
        try {
            const response = await updateCartItemQuantity(
                productId,
                newQuantity
            );
            if (response && response.status === 200) {
                setCart(response.data.data);
                showSnackbar("Quantity updated");
            }
        } catch (error) {
            showSnackbar("Failed to update quantity", "error");
        } finally {
            setLoading((prev) => ({ ...prev, [productId]: false }));
        }
    };

    const handleApplyPromo = () => {
        // Mock promo code validation
        const validCodes = {
            SAVE10: 10,
            WELCOME15: 15,
            NEWUSER: 20,
        };

        if (validCodes[promoCode.toUpperCase()]) {
            setPromoDiscount(validCodes[promoCode.toUpperCase()]);
            showSnackbar(
                `Promo code applied! ${
                    validCodes[promoCode.toUpperCase()]
                }% discount`
            );
        } else {
            showSnackbar("Invalid promo code", "error");
        }
    };

    // Razorpay cart payment handler
    const handleCartPayment = async () => {
        try {
            const response = await generateCartRazorpayOrder();
            if (response && response.status === 200) {
                if (typeof window.Razorpay !== "function") {
                    alert("Razorpay payment gateway is not loaded.");
                    return;
                }
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: response.data.order.amount,
                    currency: response.data.order.currency,
                    name: "Your Store Name",
                    description: "Cart Payment",
                    order_id: response.data.order.id,
                    handler: async function (razorpayResponse) {
                        try {
                            const verifyRes = await fetch(
                                "http://localhost:3000/api/verify-payment",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    credentials: "include",
                                    body: JSON.stringify({
                                        razorpay_payment_id:
                                            razorpayResponse.razorpay_payment_id,
                                        razorpay_order_id:
                                            razorpayResponse.razorpay_order_id,
                                        razorpay_signature:
                                            razorpayResponse.razorpay_signature,
                                        fromCart: true,
                                    }),
                                }
                            );
                            const verifyData = await verifyRes.json();
                            if (verifyRes.ok && verifyData.success) {
                                showSnackbar(
                                    "Cart payment verified and successful!"
                                );
                                setCart([]); // Clear the cart after successful payment
                                // Optionally redirect
                            } else {
                                showSnackbar(
                                    "Cart payment verification failed.",
                                    "error"
                                );
                            }
                        } catch (err) {
                            showSnackbar(
                                "Error verifying cart payment.",
                                "error"
                            );
                        }
                    },
                    prefill: {
                        // Optionally add user info if available
                    },
                };
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }
        } catch (error) {
            showSnackbar("Failed to initiate cart payment.", "error");
        }
    };

    const CartItem = ({ item }) => {
        const product = item.productId;
        const price = product.price?.cost || product.price || 0;
        const originalPrice = product.price?.mrp || price;
        const discount =
            originalPrice > price
                ? Math.round(((originalPrice - price) / originalPrice) * 100)
                : 0;

        return (
            <Card sx={{ mb: 2, position: "relative" }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        {/* Product Image */}
                        <Grid item xs={12} sm={3}>
                            <CardMedia
                                component="img"
                                height="120"
                                image={
                                    product.url || "/api/placeholder/120/120"
                                }
                                alt={product.title?.shortTitle || product.title}
                                sx={{ objectFit: "contain", borderRadius: 1 }}
                            />
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={12} sm={5}>
                            <Typography variant="h6" gutterBottom>
                                {product.title?.longTitle || product.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                {product.title?.shortTitle}
                            </Typography>

                            {/* Price Display */}
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={1}
                                mb={1}
                            >
                                <Typography variant="h6" color="primary">
                                    ₹{price.toLocaleString()}
                                </Typography>
                                {discount > 0 && (
                                    <>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                textDecoration: "line-through",
                                            }}
                                            color="text.secondary"
                                        >
                                            ₹{originalPrice.toLocaleString()}
                                        </Typography>
                                        <Chip
                                            label={`${discount}% OFF`}
                                            color="success"
                                            size="small"
                                        />
                                    </>
                                )}
                            </Box>

                            {/* Stock Status */}
                            <Typography
                                variant="body2"
                                color={
                                    product.stock > 10
                                        ? "success.main"
                                        : "warning.main"
                                }
                            >
                                {product.stock > 10
                                    ? "In Stock"
                                    : `Only ${product.stock} left`}
                            </Typography>
                        </Grid>

                        {/* Quantity Controls */}
                        <Grid item xs={12} sm={2}>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        handleUpdateQuantity(
                                            product._id,
                                            item.quantity - 1
                                        )
                                    }
                                    disabled={loading[product._id]}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <TextField
                                    size="small"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const value =
                                            parseInt(e.target.value) || 1;
                                        if (value !== item.quantity) {
                                            handleUpdateQuantity(
                                                product._id,
                                                value
                                            );
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            textAlign: "center",
                                            width: "50px",
                                        },
                                        min: 1,
                                        max: product.stock || 99,
                                    }}
                                    type="number"
                                />
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        handleUpdateQuantity(
                                            product._id,
                                            item.quantity + 1
                                        )
                                    }
                                    disabled={
                                        loading[product._id] ||
                                        item.quantity >= (product.stock || 99)
                                    }
                                >
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </Grid>

                        {/* Total Price & Remove */}
                        <Grid item xs={12} sm={2}>
                            <Box textAlign="center">
                                <Typography variant="h6" gutterBottom>
                                    ₹{(price * item.quantity).toLocaleString()}
                                </Typography>
                                <IconButton
                                    color="error"
                                    onClick={() =>
                                        handleRemoveFromCart(product._id)
                                    }
                                    disabled={loading[product._id]}
                                >
                                    {loading[product._id] ? (
                                        <Skeleton width={24} height={24} />
                                    ) : (
                                        <DeleteIcon />
                                    )}
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    };

    const EmptyCart = () => (
        <Paper sx={{ p: 4, textAlign: "center" }}>
            <CartIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
                Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
                Looks like you haven't added anything to your cart yet
            </Typography>
            <Button variant="contained" size="large">
                Continue Shopping
            </Button>
        </Paper>
    );

    if (cart.length === 0) {
        return (
            <Box p={3}>
                <EmptyCart />
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography
                variant="h4"
                gutterBottom
                display="flex"
                alignItems="center"
                gap={1}
            >
                <CartIcon /> Shopping Cart ({cart.length} items)
            </Typography>

            <Grid container spacing={3}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                    {cart.map((item) => (
                        <CartItem key={item.productId._id} item={item} />
                    ))}
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
                        <Typography variant="h5" gutterBottom>
                            Order Summary
                        </Typography>

                        {/* Promo Code */}
                        <Box mb={2}>
                            <Box display="flex" gap={1} mb={1}>
                                <TextField
                                    size="small"
                                    placeholder="Enter promo code"
                                    value={promoCode}
                                    onChange={(e) =>
                                        setPromoCode(e.target.value)
                                    }
                                    fullWidth
                                />
                                <Button
                                    variant="outlined"
                                    onClick={handleApplyPromo}
                                >
                                    Apply
                                </Button>
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        {/* Price Breakdown */}
                        <Box mb={2}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                mb={1}
                            >
                                <Typography>
                                    Subtotal ({cart.length} items)
                                </Typography>
                                <Typography>
                                    ₹{totals.subtotal.toLocaleString()}
                                </Typography>
                            </Box>

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1}
                            >
                                <Box display="flex" alignItems="center" gap={1}>
                                    <ShippingIcon fontSize="small" />
                                    <Typography>Shipping</Typography>
                                </Box>
                                <Typography
                                    color={
                                        totals.shipping === 0
                                            ? "success.main"
                                            : "text.primary"
                                    }
                                >
                                    {totals.shipping === 0
                                        ? "FREE"
                                        : `₹${totals.shipping}`}
                                </Typography>
                            </Box>

                            {promoDiscount > 0 && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    mb={1}
                                >
                                    <Typography color="success.main">
                                        Discount ({promoDiscount}%)
                                    </Typography>
                                    <Typography color="success.main">
                                        -₹{totals.discount.toLocaleString()}
                                    </Typography>
                                </Box>
                            )}

                            {totals.shipping > 0 && (
                                <Alert severity="info" sx={{ mt: 1, mb: 1 }}>
                                    Add ₹
                                    {(500 - totals.subtotal).toLocaleString()}{" "}
                                    more for FREE shipping!
                                </Alert>
                            )}
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            mb={3}
                        >
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="h6" color="primary">
                                ₹{totals.total.toLocaleString()}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mb: 1 }}
                            onClick={handleCartPayment}
                        >
                            Pay for Cart
                        </Button>

                        <Button variant="outlined" size="large" fullWidth>
                            Continue Shopping
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    severity={snackbar.severity}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Cart;
