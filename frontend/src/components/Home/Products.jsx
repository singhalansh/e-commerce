import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom"; // <-- Add this import

const Products = ({
    title = "Featured Products",
    showTimer = false,
    endTime = null,
    viewAllLink = "#",
}) => {
    const { products } = useSelector((state) => state.products);
    const sliderRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState({});

    // Timer calculation
    useEffect(() => {
        if (showTimer && endTime) {
            const calculateTimeLeft = () => {
                const difference = new Date(endTime) - new Date();
                if (difference > 0) {
                    return {
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((difference / 1000 / 60) % 60),
                        seconds: Math.floor((difference / 1000) % 60),
                    };
                }
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            };

            setTimeLeft(calculateTimeLeft());
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [showTimer, endTime]);

    // Carousel settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // Increased from 4 to 5 to show more products
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const goToPrevious = () => {
        sliderRef.current.slickPrev();
    };

    const goToNext = () => {
        sliderRef.current.slickNext();
    };

    return (
        <div className="products-section py-8 bg-gray-50 w-full">
            <div className="w-full px-4 mx-auto">
                {/* Title, Timer and View All section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center mb-4 md:mb-0">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {title}
                        </h1>

                        {showTimer && (
                            <div className="ml-6 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                                <FaClock className="text-red-500 mr-2" />
                                <div className="flex space-x-2">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold">
                                            {timeLeft.days}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Days
                                        </span>
                                    </div>
                                    <span className="text-xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold">
                                            {timeLeft.hours}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Hrs
                                        </span>
                                    </div>
                                    <span className="text-xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold">
                                            {timeLeft.minutes}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Min
                                        </span>
                                    </div>
                                    <span className="text-xl font-bold">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold">
                                            {timeLeft.seconds}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Sec
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <a
                        href={viewAllLink}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        View All
                    </a>
                </div>

                {products && products.length > 0 ? (
                    <div className="carousel-container relative w-full max-w-[95vw] mx-auto">
                        <Slider ref={sliderRef} {...settings}>
                            {products.map((product) => (
                                <div key={product.id} className="px-1">
                                    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-[320px] w-full">
                                        <Link to={`/product/${product.id}`}>
                                            <div className="relative overflow-hidden flex items-center justify-center bg-white h-[180px]">
                                                <img
                                                    src={product.url}
                                                    alt={
                                                        product.title.shortTitle
                                                    }
                                                    className="max-h-[150px] max-w-[80%] object-contain"
                                                />
                                                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded">
                                                    {product.discount}
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="p-3 h-[140px] flex flex-col justify-between">
                                            <div>
                                                <Link
                                                    to={`/product/${product.id}`}
                                                >
                                                    <h2 className="text-base font-semibold text-gray-800 mb-1 truncate">
                                                        {
                                                            product.title
                                                                .shortTitle
                                                        }
                                                    </h2>
                                                </Link>
                                                <p className="text-xs text-gray-600 mb-2 h-8 overflow-hidden">
                                                    {product.description}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-green-600 font-bold text-lg">
                                                        ₹{product.price.cost}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">
                                                        {product.tagline}
                                                    </p>
                                                </div>
                                                <Link
                                                    to={`/product/${product.id}`}
                                                >
                                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded text-xs transition-colors">
                                                        View Details
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>

                        {/* Custom navigation buttons */}
                        <button
                            onClick={goToPrevious}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors focus:outline-none"
                            aria-label="Previous slide"
                        >
                            <FaChevronLeft className="text-gray-700" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition-colors focus:outline-none"
                            aria-label="Next slide"
                        >
                            <FaChevronRight className="text-gray-700" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 text-lg">
                            No products available at the moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
