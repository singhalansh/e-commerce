import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    console.log("Get product by ID route hit with ID:", id);
    try {
        console.log("id", id);
        const product = await Product.findOne({ id: id });
        if (!product) {
            return res
                .status(404)
                .json({ message: "Product nahi mila be, kuch aur dekh" });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        res.status(500).json({
            message:
                "abe error aagya product nikalne me ye dekh " + error.message,
        });
    }
};
