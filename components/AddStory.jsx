'use client'

import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/navigation'
function AddStory({}) {
  const router = useRouter();
  const {data: session} = useSession()

   


  function handleStoryClick(){
      router.push('/addStory')
    
  }
  return (
    <div className='relative h-14 w-14 md:h-20 md:w-20
    lg:h-[252px] lg:min-w-[142px] cursor-pointer overflow-x p-3
    '> 
    
       
        <Image
           className='object-cover filter brightness-75
           rounded-lg lg:rounded-3xl  hover:scale-[1.01] hover:brightness-[0.6]'
           src={session.user.image}
           layout='fill'

        />
         

         <div className='absolute bottom-0 top-2/3 left-0 right-0 w-full bg-white z-10 flex justify-center shadow-md bg-clip-border
          ' >
             <div className='bg-white w-13 h-13 rounded-full flex absolute top-[-29px]'>
               <PlusCircleIcon className='text-blue-500 h-12  top-[-29px]' onClick={handleStoryClick}/>
  
               
              </div>
             
         </div>
       
    </div>
  )
}

export default AddStory