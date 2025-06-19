import React from "react";
import { Star, Award, Truck, RotateCcw, Shield } from "lucide-react";

function ProductInfo({
    product,
    originalPrice,
    discountPercent,
    quantity,
    setQuantity,
}) {
    return (
        <div className="space-y-6">
            {/* Title and Rating */}
            <div>
                <h1 className="text-2xl font-medium text-gray-800 mb-2">
                    {product.title?.longTitle}
                </h1>
                <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
                        <span>4.3</span>
                        <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-gray-600 text-sm">
                        2,847 ratings & 367 reviews
                    </span>
                </div>
                {product.tagline && (
                    <p className="text-green-700 font-medium text-sm">
                        {product.tagline}
                    </p>
                )}
            </div>
            {/* Price Section */}
            <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                    <span className="text-3xl font-medium text-gray-900">
                        ₹{product.price?.cost?.toLocaleString()}
                    </span>
                    {originalPrice > product.price?.cost && (
                        <>
                            <span className="text-lg text-gray-500 line-through">
                                ₹{originalPrice?.toLocaleString()}
                            </span>
                            <span className="text-green-600 font-medium">
                                {discountPercent}% off
                            </span>
                        </>
                    )}
                </div>
                <p className="text-sm text-gray-600">inclusive of all taxes</p>
            </div>
            {/* Offers */}
            <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                    Available offers
                </h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                        <Award className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>
                            <strong>Bank Offer:</strong> 10% off on HDFC Bank
                            Credit Card, up to ₹1,000
                        </span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Award className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>
                            <strong>Special Price:</strong> Get extra 5% off
                            (price inclusive of cashback/coupon)
                        </span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <Award className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>
                            <strong>No Cost EMI:</strong> Avail No Cost EMI on
                            select cards for orders above ₹3,000
                        </span>
                    </div>
                </div>
            </div>
            {/* Delivery Info */}
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Delivery</h3>
                <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                        <p className="font-medium">Free delivery by Tomorrow</p>
                        <p className="text-sm text-gray-600">
                            Order within 2 hrs 30 mins
                        </p>
                    </div>
                </div>
            </div>
            {/* Services */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                <div className="flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">7 days Return Policy</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-sm">Warranty Policy</span>
                </div>
            </div>
            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                        -
                    </button>
                    <span className="px-4 py-1 border-x">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>
            {/* Product Description */}
            {product.description && (
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">
                        Product Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {product.description}
                    </p>
                </div>
            )}
            {/* Product ID */}
            <div className="text-xs text-gray-400 pt-4 border-t">
                Product ID: {product.id}
            </div>
        </div>
    );
}

export default ProductInfo;
