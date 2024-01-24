import { Footer } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

import React from 'react'
import { Link } from 'react-router-dom';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-blue-500'>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className='pb-2'>
            <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
             text-white'>Rohit's</span>Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 pl-1">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target='_blank' // So that it can open in new window
                  rel='noopener noreferrer'
                >Rohit's Blog
                </Footer.Link>
                <Footer.Link
                  href="https://www.google.com"
                  target='_blank' // So that it can open in new window
                  rel='noopener noreferrer' // In case if browser tries to block our href
                >Google</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link 
                  href="https://github.com/Rohit-dayal"
                  target='_blank' // So that it can open in new window
                  rel='noopener noreferrer'
                >Github</Footer.Link>
                <Footer.Link 
                  href="https://www.linkedin.com/in/rohit-dayal-a32a4b266/"
                  target='_blank' // So that it can open in new window
                  rel='noopener noreferrer'
                >LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Rohit's Blog™" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="https://github.com/Rohit-dayal" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

