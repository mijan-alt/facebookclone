import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function StoryCard({name,storyImage,profilePicture}) {
  const {data: session} = useSession()
  return (
    <div className='relative h-14 w-14 md:h-20 md:w-20
    lg:h-[252px] lg:min-w-[142px] cursor-pointer overflow-x p-3
    '> 
    
        <Image
           className='absolute opacity-0 lg:opacity-100
           rounded-full z-50 top-10'
           src={profilePicture}
           width={40}
           height={40}
           layout='fixed'
           objectFit='cover'
        />

        <Image
           className='object-cover filter brightness-75
           rounded-lg lg:rounded-3xl  hover:scale-[1.01] hover:brightness-[0.6] shadow-md w-full '
           src={storyImage}
           layout='fill'

        />

        <p className='absolute opacity-0 lg:opacity-100 button-4
        w-5/6 text-white text-sm font-bold truncate'>{name}</p>
    </div>
  )
}

export default StoryCard