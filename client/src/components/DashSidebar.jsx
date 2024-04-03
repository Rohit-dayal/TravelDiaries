import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    // For accessing the different tabs in dashboard like profile.
    const [tab, setTab] = useState(' ');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab'); // get the tab mentioned in url
        // console.log(tabFromUrl)
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }), [location.search] // And if any time location.search changes useEffect code will again run(render)
    const handleSignout = async () =>{
        try {
          const res = await fetch('/api/user/signout',{
            method: 'POST',
          });
          const data = await res.json();
          if(!res.ok){
            console.log(data.message);
          }
          else{
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message)
        }
      }


    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        {/* Only make the profile active when we are on that tab */}
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark'
                        as = "div" >{/* We can not make anchor tag inside an another anchor tag which Link here so that's way we saved it as button */}
                          Profile  
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout} >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
