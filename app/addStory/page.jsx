'use client'

import React from 'react'
import { PhotographIcon } from '@heroicons/react/solid'
import { useRef } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db } from '@/firebase'
import {useState} from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { serverTimestamp } from 'firebase/firestore'

function page() {
     const {data: session} = useSession()
    const [storyImage, setStoryImage]= useState(null)
    const storyRef = useRef(null)
    const router = useRouter()

    function handleClick(){
        storyRef.current.click()
    }

  function addImage(e){
     const file = e.target.files[0];
     if(file){
        setStoryImage(file)
     }
  }
 
  const addStory = async()=> {
    let imageUrl= null;

      if(storyImage){
        const storage = getStorage();
        const storageRef = ref(storage, `images/${storyImage.name}`);
        await uploadBytes(storageRef, storyImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db,'stories'), {
        url :imageUrl,
        name: session.user.name,
        email: session.user.email,
        image:session.user.image,
        timestamp: serverTimestamp()
      })

      setStoryImage(null)

      router.push('/')

  }
  return (
    <div className='flex flex-col items-center justify-center bg-[#F0F2F5] h-[100vh] hover:cursor-pointer gap-[15px] '>

           
            <div className='flex flex-col items-center justify-center bg-gradient-to-br from-[#6242ED] to-[#73A1E7] h-[326px] w-[220px] rounded-md'
            onClick={handleClick}>
                {storyImage ? 
                  <>
                     <img src={URL.createObjectURL(storyImage)} alt="user image"  className='object-contain h-full'  />
                     
                  </>
                 : 
                (<>
                <div className='flex items-center justify-center h-[48px] w-[48px] bg-white rounded-full shadow-md'>
                    <PhotographIcon className='text-black h-[20px]'/>
                </div>
                 <input 
                 type="file"
                 onChange={addImage}
                 ref={storyRef} 
                 hidden/>
                 <p className='text-white font-semibold'>Create a photo story</p>
                </>)}
                 
            </div>
        
         
          <div onClick={addStory} className='mt-[10px]'>
              <div  className='bg-[#1A6ED8] text-white text-center pr-[10px] pl-[10px]'>Share Story</div>
          </div>
    </div>
  )
}

export default page