
'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { getProviders } from 'next-auth/react'
import {useState, useEffect} from 'react'
import { Provider } from 'react'

function Login() {
  
const [providers, setProviders]= useState(null);
console.log(providers)
useEffect(()=>{
    const setUpProviders= async ()=>{
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
},[])
  return (
    <div className="grid place-items-center">
        <Image
           src="https://links.papareact.com/t4i"
           height={400}
           width={400}
           objectFit="contain"
        />

        {providers && Object.values(providers).map((provider)=>(
             <h1 key={provider.name} onClick={()=>signIn(provider.id)} className='p-5 bg-blue-500 rounded-full text-white
             text-center cursor-pointer'>Login with google</h1>
             
        ))}
        
      
       
    </div>
  )
}

export default Login