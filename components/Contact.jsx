import React from 'react'
import Image from 'next/image'

function Contact({src, name}) {
  return (
    <div className='flex items-center space-x-3 mb-2
    relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl'>
        {src && (
            <>
          <div className='w-50 h-50'>
           <Image
              className='w-full h-full object-cover rounded-full'
              src={src}
              width={50}
              height={50}
              layout='fixed'
           />
           </div>
           <p>{name}</p>
           <div className='absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full animate-bounce'></div>
          </>
             
        )}
       
    </div>
  )
}

export default Contact