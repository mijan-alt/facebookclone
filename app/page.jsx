'use client'
import Head from "next/head"
import Header from "@/components/Header"
import { useSession } from "next-auth/react";
import Login from "@/components/Login"
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";

export default function Home() {

  const {data : session} = useSession();
  console.log(session)

  if(!session) return <Login />

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">

      <Head>
         <title>Facebook</title>
      </Head>

  

      {/* heaader */}
      <Header/>
        

        {/* main */}
      <main className="flex">
           {/* sidebar */}
           <Sidebar />
           {/* feed */}
           <Feed/>
           {/* widget */}
           <Widgets/>
      </main>
      {/* main ends */}

    </div>
  )
   
}

