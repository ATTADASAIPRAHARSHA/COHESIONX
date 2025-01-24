import React from 'react'
import { useAuth } from '../contexts/authContext';
import PleaseLogin from './PleaseLogin'

const Conatct = () => {
const {CurrentUser , IsLoggedIn , updateIsLoggedIn} = useAuth()

  return (
    <>
    {
        IsLoggedIn ? <div>
      Under Construction 
    </div> : <PleaseLogin/>}
    </>
  )
}

export default Conatct
