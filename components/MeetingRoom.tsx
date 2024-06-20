"use client"
import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallState, CallStatsButton, PaginatedGridLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import { Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import EndCall from './EndCall';
import Loader from './Loader';
import { Toast } from './ui/toast';


const MeetingRoom = () => {
  const searchParams=useSearchParams();
  const router=useRouter();
  const [showParticipants,setShowParticipants]=useState(false);
  const isPersonalRoom=!!searchParams.get('personal');
  const {useCallCallingState}=useCallStateHooks();
  const callingState=useCallCallingState();
  if(callingState==CallingState.LEFT){
    return router.push('/dashboard');
  }
  else if(callingState!=CallingState.JOINED)return <Loader/>
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className='relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items-center'>
                <PaginatedGridLayout/>
            </div>
            <div className={cn('h-[calc(100vh-86px)] hidden ml-2', {
            'show-block': showParticipants,
          })}>
            <CallParticipantsList onClose={()=>{setShowParticipants(false)}}/>
          </div>
        </div>
        <div className='fixed bottom-0 flex gap-3 justify-center items-center w-full'>
            <div className='flex w-auto gap-5 flex-wrap'>
                <CallControls/>
            </div>
            <div className="flex w-auto gap-5">
                <CallStatsButton/>
                <button onClick={()=>setShowParticipants((prev)=>!prev)}>
                    <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                        <Users size={20} className='text-white'/>
                    </div>
                </button>
                {isPersonalRoom&&<EndCall/>}
            </div>
        </div>
    </section>
  )
}

export default MeetingRoom
