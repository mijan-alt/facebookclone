
'use client'
import React from 'react'

import { db } from '@/firebase'
import Post from './Post';
import {useState, useEffect} from 'react'
import { collection, orderBy, onSnapshot, query } from 'firebase/firestore';

function Posts() {

  const [posts, setPosts]=useState([])
   
    useEffect(()=>{
       const postsRef = collection(db,'posts');//get a reference to the post collectioin

       const quer = query(postsRef, orderBy('timestamp', 'desc'));
       
        onSnapshot(quer, (snapshot)=>{
           setPosts(snapshot.docs.map(doc=>({id:doc.id, ...doc.data()})))
       });
       
      
    }, [])
 

 console.log(posts)

  
  return (
    <div>
      {
        posts && posts.map((post)=>(
          <Post
            name={post.name}
            message={post.message}
            email={post.email}
            userImage={post.image}
            postImage={post.imageUrl}
            timestamp={post.timestamp}
          />
        ))
      }

    </div>
  )
}

export default Posts