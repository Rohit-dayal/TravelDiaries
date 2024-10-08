import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Projects from './Pages/Projects'
import About from './Pages/About'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Header from './components/Header'
import FooterCom from './components/FooterCom'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost.jsx'
import UpdatePost from './Pages/UpdatePost.jsx'
import PostPage from './Pages/PostPage.jsx'
import ScrollToTop from './components/ScrollToTop'
import Search from './Pages/Search'



export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
      <Routes>
        <Route path ="/" element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/sign-in' element={<Signin/>}></Route>
        <Route path='/sign-up' element={<SignUp/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route element = {<PrivateRoute/>}>
          {/* To make the dashboard private put it inside the private route so that anyone can access it only when he is logged in */}
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route element = {<OnlyAdminPrivateRoute/>}>
          {/* It has the elements which only admin has the access */}
          <Route path='/create-post' element={<CreatePost/>}></Route>
          <Route path='/update-post/:postId' element={<UpdatePost/>}></Route>
        </Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/post/:postSlug' element={<PostPage/>}></Route>
      </Routes>
      <FooterCom/>
    </BrowserRouter>
  )
}
