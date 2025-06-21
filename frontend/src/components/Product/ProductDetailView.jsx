import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../../store/slice";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductSpecifications from "./ProductSpecifications";

function ProductDetailView() {
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log("sfds", id);
    useEffect(() => {
        if (id) dispatch(getProductById(id));
    }, [dispatch, id]);

    const { product, loading } = useSelector((state) => state.products);
    console.log("product", product);

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Use the primary image URL for all images to ensure consistency.
    const productImages = product
        ? [product.url, product.url, product.url, product.url]
        : [];

    if (loading) {
        return (
            <div className="mt-[55px] min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="mt-[55px] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Product not found
                    </h1>
                    <p className="text-gray-600">
                        There might have been an error fetching the product.
                    </p>
                </div>
            </div>
        );
    }

    const originalPrice = product?.price?.mrp || product?.price?.cost * 1.3;
    const discountPercent = Math.round(
        ((originalPrice - product?.price?.cost) / originalPrice) * 100
    );

    return (
        <div className="mt-[55px] bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                    <ProductImages
                        productImages={productImages}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        isWishlisted={isWishlisted}
                        setIsWishlisted={setIsWishlisted}
                        product={product}
                        quantity={quantity}
                    />
                    <ProductInfo
                        product={product}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        originalPrice={originalPrice}
                        discountPercent={discountPercent}
                    />
                </div>
                <ProductSpecifications product={product} />
            </div>
        </div>
    );
}

export default ProductDetailView;
