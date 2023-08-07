'use client'
import React from 'react'
import StoryCard from './StoryCard'
import AddStory from './AddStory'
import { db } from '@/firebase'
import { collection } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { orderBy, query } from 'firebase/firestore'
import {useState, useEffect} from 'react'


function Stories() {

const [stories, setStories ] = useState([])

   useEffect(()=>{
      const storyRef = collection(db, 'stories');
      const queries = query(storyRef, orderBy('timestamp','desc'));
      onSnapshot(queries , (snapshot)=> setStories(snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}))))

   }, [])
   console.log(stories)

  return (
    <div className='flex flex-row items-center space-x-3 overflow-x-auto overflow-hidden max-w-[588px] shrink-0'>
          <AddStory/>
     
            {stories.map((story)=>(
            <StoryCard 
                key={story.url}
                name={story.name}
                storyImage={story.url}
                profilePicture={story.image}/>
            ))}

     
           
            
      
    </div>
  )
}

export default Stories