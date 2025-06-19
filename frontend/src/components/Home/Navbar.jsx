import React from 'react'
import { navData } from '../../Constants'

function Navbar() {
  return (
    <div className='relative bg-white shadow-md overflow-hidden'>
      <div className='flex overflow-x-auto scrollbar-hide py-4 px-4 md:px-8 lg:px-16 xl:px-[240px] gap-4 md:gap-6 lg:gap-8'>
        {
          navData.map(({url, text}) => (
            <div 
              className='flex flex-col items-center flex-shrink-0 hover:scale-105 transition-transform duration-200 cursor-pointer min-w-[80px]' 
              key={text}
            >
              <div className='relative w-[48px] h-[48px] md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px]'>
                <img 
                  src={url} 
                  alt={text} 
                  className='w-full h-full object-contain' 
                />
              </div>
              <h1 className='text-xs md:text-sm mt-2 text-center whitespace-nowrap'>{text}</h1>
            </div>
          ))
        }
      </div>
      
      {/* Overlay gradients for horizontal scroll indication */}
      <div className='absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white to-transparent pointer-events-none'></div>
      <div className='absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none'></div>
    </div>
  )
}

export default Navbar