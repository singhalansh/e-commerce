import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to="/"
                            className="text-xl font-bold text-blue-600"
                        >
                            E-Commerce
                        </Link>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link
                            to="/"
                            className="hover:text-blue-600 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="hover:text-blue-600 font-medium"
                        >
                            Products
                        </Link>
                        <Link
                            to="/cart"
                            className="hover:text-blue-600 font-medium"
                        >
                            Cart
                        </Link>
                        <Link
                            to="/profile"
                            className="hover:text-blue-600 font-medium"
                        >
                            Profile
                        </Link>
                    </div>
                    {/* Mobile Hamburger */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {menuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
                            onClick={() => setMenuOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            to="/cart"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
                            onClick={() => setMenuOpen(false)}
                        >
                            Cart
                        </Link>
                        <Link
                            to="/profile"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-50"
                            onClick={() => setMenuOpen(false)}
                        >
                            Profile
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
