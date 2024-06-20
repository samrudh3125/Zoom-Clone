"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import clipboardCopy from 'clipboard-copy'

const RecordingCard = ({title,startAt,endsAt,link}:{title:string,startAt:string,endsAt:string,link:string}) => {
    const router=useRouter();
  return (
    <div className='w-[533px] h-[250px] rounded-[14px] px-8 py-6 flex flex-col gap-y-9 text-white bg-blue-2'>
      <div className='w-[485px] h-[110px] flex flex-col gap-y-[14px]'>
        <img className='w-[30px] h-[30px]' src='record.svg'/>
        <div className='w-full h-[66px] flex flex-col gap-[10px]'>
            <h3 className='font-bold text-2xl h-[34px] w-auto line-clamp-1'>
                {title}
            </h3>
            <div className='w-[338px] h-[22px] flex gap-5'>
                <div className='w-auto h-full flex gap-[7px]'>
                    <div className='w-auto h-full'>Start Time:</div>
                    <div className='w-auto h-full font-semibold'>{startAt}</div>
                </div>
                <div className='w-auto h-full flex gap-[7px]'>
                    <div className='w-auto h-full'>End Time:</div>
                    <div className='w-auto h-full font-semibold'>{endsAt}</div>
                </div>
            </div>
        </div>
        <div className=' h-10 flex w-[485px] justify-between'>
            <Button size="md"title='Play' onClick={()=>{router.push(link)}}>Play</Button>
            <Button size="md" title='Share' variant={"ghost"} onClick={()=>{clipboardCopy(link)}}>Share</Button>
        </div>
      </div>
    </div>
  )
}

export default RecordingCard
