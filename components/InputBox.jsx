
'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import 
{ 
   VideoCameraIcon ,
 CameraIcon} from '@heroicons/react/solid'
  import {useState, useEffect} from 'react'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { useRef } from 'react'
import { db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/firestore'
import 'firebase/storage'; // Import the Firebase Storage service
import 'firebase/firestore'; // Import the Firestore service



function InputBox() {
  
    const {data : session} = useSession()
    const [formData, setFormData]=useState('')

    const [imageToPost, setImageToPost] = useState(null)
    console.log(formData)
    const filePickerRef = useRef(null)

    function handleChange(e){
         setFormData(e.target.value)
    }

     //code for sending the post to the firestore
  const sendPost =  async (e)=> {
        e.preventDefault();
        if(!formData) return

        let imageUrl = null;

       if(imageToPost){
        const storage= getStorage();
        const storageRef = ref(storage,  `images/${imageToPost.name}`)
        await uploadBytes(storageRef,imageToPost)
        imageUrl= await getDownloadURL(storageRef)

       }


       await addDoc(collection(db, 'posts'),
       {
         message: formData,
         name: session.user.name,
         email: session.user.email,
         image:session.user.image,
         imageUrl: imageUrl, //store the image url
         timestamp:serverTimestamp()//store a time stamp
       }) 


      

        setFormData('');
        setImageToPost(null);//hide the image once it has been sent to firebase

    }

    const addImageToPost = (e) => {
        const file = e.target.files[0]
        if(file){
          setImageToPost(file)
        }

        // reader.onload=(readerEvent)=> {
        //   setImageToPost(readerEvent.target.result)
        // }
    }

    const removeImage = ()=> {
      setImageToPost(null)
    }

     function handleClick(){
      filePickerRef.current.click()
     }
    
  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500
    font-medium mt-6 '>{/**container begins */}

        {/* upper part */}
       <div className='flex space-x-4 p-4 items-center'>
            <Image
                className='rounded-full'
                src={session.user.image}
                width={40}
                height={40}
                layout="fixed"

            />

            <form onSubmit={sendPost} className='flex flex-1'>
                 <input 
                 onChange={handleChange}
                 value={formData}
                 className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
                 type="text" 
                 placeholder ={`What's on your mind, ${session.user.name}`}/>

                 <button className='hidden' type='submit'>Submit</button>
            </form>
            {imageToPost && (
              <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition
              duration-150 transform hover:scale-105 cursor-pointer'>
                 <img className='h-10 object-contain' src={URL.createObjectURL(imageToPost)} alt="" />
                 <p className='text-xs text-red-500 text-center'>Remove</p>
              </div>
            )}

        {/* upperpart ends */}
       </div>

       {/* lower part begin */}
       <div className='flex justify-evenly p-3 border-t'>
             {/* icon wrapper */}
            <div className='inputIcon'>
                <VideoCameraIcon className='h-7 text-red-500' />
                <p className='text-xs sm:text-sm xl:text-base'>Live video</p>
            </div>


            {/* icon wrapper */}
             <div className='inputIcon'  onClick={handleClick}>
                <CameraIcon className='h-7 text-green-400' />
                <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                <input 
                   ref={filePickerRef}
                   onChange={addImageToPost} 
                   type="file" hidden />
             </div>

            
             {/* icon wrapper */}
             <div className='inputIcon'>
                <EmojiHappyIcon className='h-7 text-yellow-300' />
                <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
            </div>

            


            
          
       </div>
       {/* lower part end */}
    {/* container ends */}
    </div>
    
  )
}

export default InputBox





