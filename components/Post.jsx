import React from 'react'
import Image from 'next/image'
import { ChatAltIcon, ShareIcon,ThumbUpIcon } from '@heroicons/react/outline'

function Post({name, message, email, userImage, postImage, timestamp}) {
  return (
    <div className='flex flex-col'> 
         
         {/* user information container */}
         <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-sm '>
              {/* user information and user message div */}
              <div className='flex items-center space-x-2'>
                  <img 
                  src={userImage} 
                  alt="userImage"
                  width={40}
                  height={40}
                  className='rounded-full' />
              

              {/* name and time stamp should be fles */}
                  <div>
                     <p className='font-medium'>{name}</p>
                     <p className='text-xs text-gray-400'>
                         {new Date(timestamp?.toDate()).toLocaleString()}
                     </p>
                   </div>
              </div>

              <p className='pt-4'>{message}</p>
           {/* user information ends */}
         </div>

         {/* posted Image div */}
          {
            postImage && (
              <div className='relative h-56 md:h-96 bg-white hover:brightness-[0.6] '> 
                   <Image
                      src={postImage} 
                      objectFit='cover'
                      layout='fill'

                    />
              </div>
            )
          }
            {/* footer of post */}
             <div className='flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400
             border-t'>
                 <div className='inputIcon rounded-none rounded-bl-2xl'>
                     <ThumbUpIcon className='h-4'/>
                     <p className='text-xs sm:text-base'>Like</p>
                 </div>

                 <div className='inputIcon rounded-none'>
                     <ChatAltIcon className='h-4'/>
                     <p className='text-xs sm:text-base'>Comment</p>
                 </div>
                 <div className='inputIcon rounded-none rounded-br-2xl'>
                     <ShareIcon className='h-4'/>
                     <p className='text-xs sm:text-base'>Share</p>
                 </div>
                 
             </div>
             {/* footer ends */}
     {/* post container end */}
    </div>
  )
}

export default Post