import { setRequestMeta } from 'next/dist/server/request-meta';
import React,{useState, useEffect} from 'react'
import { sessionState, modalSignUpState, authUserState  } from "../atoms/modalAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Cookies from 'js-cookie'

function MiniProfile() {
  const [session, setSession] = useRecoilState(sessionState)
  const [authUser, setAuthUser] = useRecoilState(authUserState);

  const signOutHandler = ()=>{
    process.env.SESSION = false;
    setSession(process.env.SESSION)
    Cookies.remove("connectedId")
  }

  return (
    <div className='flex items-center justify-between mt-14 ml-10 mr-4'>
      <button onClick={()=>{signOutHandler()}} className='text-blue-400 text-sm font-semibold'>خروج</button>
      <div className='flex-1 mx-4' dir='rtl'>
        <h2 className='font-bold text-sm'>{authUser.name}</h2>
        <h3 className='text-xs text-gray-400'>به سایت ... خوش آمدید.</h3>
      </div>
      <img className='w-16 h-16 rounded-full border p-[12px]' src={authUser.avatar}/>
    </div>
  )
}

export default MiniProfile