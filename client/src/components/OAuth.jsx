import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup,getAuth} from  'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

// This Provide the functionality of SigIn and SignUp with the Google 
export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app)
  const handleGoogleClick = async () =>{
    const provider = new GoogleAuthProvider();
    // we set custom parameters so that when next we come we don't need to select the account again.
    provider.setCustomParameters({prompt: 'select_account'})
    try {
      const resultsFromGoogle = await signInWithPopup(auth,provider)
      // console.log(resultsFromGoogle)
      const res = await fetch("/api/auth/google",{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      })
      const data = await res.json()
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Button type='button' outline gradientDuoTone='pinkToOrange' onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}
