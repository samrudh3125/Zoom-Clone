"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(arg0: boolean)=>void}) => {
    const [isToggleOn,setIsToggleOn]=useState(false);
    const call=useCall()

    if(!call)throw new Error("Error fetching call")
    useEffect(()=>{
        if(isToggleOn){
            call?.camera.disable();
            call?.microphone.disable();
        } else{
            call?.camera.enable();
            call?.microphone.enable();
        }
    },[isToggleOn,call?.camera,call?.microphone])
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center text-white gap-3'>
      <h1 className='font-bold text-2xl'>Setup</h1>
      <VideoPreview/>
      <div className='flex h-16 items-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium'>
            <input type="checkbox"  checked={isToggleOn} onChange={(e)=>{setIsToggleOn(e.target.checked)}}/>
            Join without mic and camera
        </label>
        <DeviceSettings/>
      </div>
      <Button className='rounded-empty bg-green-500 px-4 py-2.5' onClick={()=>{call.join();setIsSetupComplete(true);}}>
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup
