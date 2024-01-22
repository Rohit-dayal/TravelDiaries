import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon }from 'react-icons/fa'

export default function Header() {
    const path = useLocation().pathname;
  return (
    // class elements are from taliwindcss and flowbite react hover on any class to get their functionality
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
             text-white'>Rohit's</span>Blog
        </Link>
        <form>
            <TextInput
               type='text'
               placeholder='Search...'
               rightIcon={AiOutlineSearch} // This is for search icon
               className='hidden lg:inline'
            />
        </form>
        {/* pill is making the button rounded */}
        <Button className='w-12 h-10 lg:hidden' color='gray' pill> 
            <AiOutlineSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <FaMoon/>
            </Button>
            <Link to='/sign-in'>
            <Button outline gradientDuoTone="purpleToBlue">
                Sign In
            </Button>
            </Link>
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse className='self-center whitespace-nowrap text-sm sm:text-l font-semibold dark:text-white' >
            {/* We did the as = {'div'} bcoz two link tags are not allowed inside each other That's why me made the Navbar.Link as div*/}
                <Navbar.Link active = {path === '/'} as={'div'}>
                    <Link  to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active = {path === '/about'} as={'div'}>
                    <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active = {path === '/projects'} as={'div'}>
                    <Link to='/projects'>Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}
