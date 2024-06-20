"use client"
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCall = () => {
    const call=useCall();
    const {useLocalParticipant}=useCallStateHooks();
    const localParticipant=useLocalParticipant();
    const isMeetingOwner=localParticipant&&call?.state.createdBy&&localParticipant.userId==call.state.createdBy.id;
    const router=useRouter();
    if(!isMeetingOwner)return null;
  return (
    <Button onClick={async()=>{
        await call.endCall();
        router.push("/dashboard");
    }} className='bg-red-500' >End Call For Everyone</Button>
  )
}

export default EndCall
