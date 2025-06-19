import React from "react";
import { Heart, Share2 } from "lucide-react";

function ProductImages({
    productImages,
    selectedImage,
    setSelectedImage,
    isWishlisted,
    setIsWishlisted,
}) {
    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-8 flex items-center justify-center relative group">
                <img
                    src={productImages[selectedImage]}
                    alt=""
                    className="max-h-60 sm:max-h-96 w-auto object-contain transition-transform group-hover:scale-105"
                />
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all"
                >
                    <Heart
                        className={`w-5 h-5 ${
                            isWishlisted
                                ? "fill-red-500 text-red-500"
                                : "text-gray-600"
                        }`}
                    />
                </button>
            </div>
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
                {productImages.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded border-2 p-1 transition-all ${
                            selectedImage === index
                                ? "border-blue-500"
                                : "border-gray-200 hover:border-gray-300"
                        }`}
                    >
                        <img
                            src={img}
                            alt=""
                            className="w-full h-full object-contain"
                        />
                    </button>
                ))}
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
                <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded transition-colors">
                    🛒 ADD TO CART
                </button>
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded transition-colors">
                    ⚡ BUY NOW
                </button>
            </div>
            <button className="w-full flex items-center justify-center space-x-2 py-2 text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base">
                <Share2 className="w-4 h-4" />
                <span>Share this product</span>
            </button>
        </div>
    );
}

export default ProductImages;
