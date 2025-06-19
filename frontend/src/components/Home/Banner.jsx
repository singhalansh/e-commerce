import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { bannerData } from '../../Constants';
import 'react-responsive-carousel/lib/styles/carousel.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function Banner() {
    const responsive = {
        0: {
            items: 1,
        },
        320: {
            items: 1,
        },
        560: {
            items: 1,
        },
        960: {
            items: 1,
        },
    };
    
    const arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
    };

    return (
        <div className="banner-container w-full overflow-hidden">
            <Carousel 
                responsive={responsive} 
                infiniteLoop
                autoPlay 
                showThumbs={false} 
                showStatus={false} 
                showIndicators={true}
                interval={5000}
                transitionTime={500}
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button 
                            type="button" 
                            onClick={onClickHandler} 
                            title={label} 
                            style={{ ...arrowStyles, left: 15 }}
                            className="hidden md:flex"
                        >
                            <IoIosArrowBack />
                        </button>
                    )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                        <button 
                            type="button" 
                            onClick={onClickHandler} 
                            title={label} 
                            style={{ ...arrowStyles, right: 15 }}
                            className="hidden md:flex"
                        >
                            <IoIosArrowForward />
                        </button>
                    )
                }
            >
                {bannerData.map((item) => (
                    <div key={item.id} className="relative w-full">
                        <img 
                            src={item.url} 
                            alt={item.text} 
                            className="w-full object-cover h-[150px] sm:h-[200px] md:h-[250px] lg:h-[280px]"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default Banner;
