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
    const { product, loading } = useSelector((state) => state.products);

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (id) dispatch(getProductById(id));
    }, [dispatch, id]);

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
                    <div className="text-6xl mb-4">📦</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Product not found
                    </h1>
                    <p className="text-gray-600">
                        The product you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    // Use product.detailUrl or product.url for images
    const productImages = [
        product.detailUrl || product.url,
        product.url,
        product.url,
        product.url,
    ];

    const originalPrice = product.price?.mrp || product.price?.cost * 1.3;
    const discountPercent = Math.round(
        ((originalPrice - product.price?.cost) / originalPrice) * 100
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
                    />
                    <ProductInfo
                        product={product}
                        originalPrice={originalPrice}
                        discountPercent={discountPercent}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </div>
                <ProductSpecifications product={product} />
            </div>
        </div>
    );
}

export default ProductDetailView;