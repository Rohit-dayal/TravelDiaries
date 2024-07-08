import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';

export default function Dashboard() {
  const location = useLocation();
  // For accessing the different tabs in dashboard like profile.
  const [tab, setTab] = useState(' ');
  useEffect(() => {
    const urlParams =new URLSearchParams(location.search); 
    const tabFromUrl = urlParams.get('tab'); // get the tab mentioned in url
    // console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }),[location.search] // And if any time location.search changes useEffect code will again run(render)
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar component */}
        <DashSidebar/>
      </div>
      {/* profile component */}
      {tab === 'profile' && <DashProfile/>} 
      {/* posts component */}
      {tab === 'posts' && <DashPosts/>}
      {/* Users component */}
      {tab === 'users' && <DashUsers/>}
    </div>
  )
}
