import React from "react";

function ProductSpecifications({ product }) {
    return (
        <div className="border-t bg-white p-6">
            <div className="max-w-4xl">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Brand</span>
                            <span className="font-medium">Premium Brand</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Model</span>
                            <span className="font-medium">
                                {product.title?.shortTitle}
                            </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Color</span>
                            <span className="font-medium">
                                As shown in image
                            </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                            <span className="text-gray-600">Warranty</span>
                            <span className="font-medium">1 Year</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSpecifications;
