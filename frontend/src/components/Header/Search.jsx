import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Search() {
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { products } = useSelector((state) => state.products);

    // Only filter if input length > 2
    const filtered =
        query.trim().length > 2
            ? products.filter((p) =>
                  p.title.longTitle
                      .toLowerCase()
                      .includes(query.trim().toLowerCase())
              )
            : [];

    return (
        <div className="flex items-center bg-white rounded-[2px] ml-2 sm:ml-4 w-full max-w-[250px] sm:max-w-[400px] relative">
            <input
                type="text"
                placeholder="Search for products, brands and more"
                className="flex-grow h-[26px] sm:h-[40px] rounded-[2px] pl-[10px] pr-10 bg-white text-black box-border focus:outline-none text-sm"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                autoComplete="off"
            />
            <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
                tabIndex={-1}
            >
                <FaSearch className="text-blue-500 text-base sm:text-lg" />
            </button>
            {showResults && query.trim().length > 2 && filtered.length > 0 && (
                <ul className="absolute left-0 top-[110%] w-full bg-white border border-gray-200 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filtered.map((product) => (
                        <li key={product.id}>
                            <Link
                                to={`/product/${product.id}`}
                                className="block px-2 py-2 hover:bg-blue-50 text-sm text-gray-800"
                                onClick={() => setShowResults(false)}
                            >
                                {product.title.longTitle}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {showResults &&
                query.trim().length > 2 &&
                filtered.length === 0 && (
                    <div className="absolute left-0 top-[110%] w-full bg-white border border-gray-200 rounded shadow-lg z-50 px-2 py-2 text-sm text-gray-500">
                        No products found.
                    </div>
                )}
        </div>
    );
}

export default Search;
