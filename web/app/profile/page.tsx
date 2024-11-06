"use client"

import { useSession } from "next-auth/react"

const Profile = ()=>{

     const { data : session} = useSession()


    return (
        <div>
            <h1>Nome : {session?.user.username}</h1>
        </div>
    )


}


export default Profile