import React from 'react'
import User from '../components/adminHomePage/User'
import { useSearchParams } from 'react-router-dom'

function UsersList() {
    const [searchParams] = useSearchParams();

    const role = searchParams.get('role');

    let roleToShow = "Admins";
    if(role === "user"){
        roleToShow = "Users";
    } else if(role === "moderator"){
        roleToShow = "Moderators"
    }
    
    return (
        <div className='flex flex-col xl:flex-row gap-5'>
            <div className='w-full'>
                <h3 className='text-2xl sm:text-3xl ms-2 mb-1'>{roleToShow}</h3>
                <div className='flex w-full rounded-2xl border border-zinc-400 overflow-auto h-fit'>
                    <ul className="w-full">
                        <User />
                        <User />
                        <User />
                        <User />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UsersList