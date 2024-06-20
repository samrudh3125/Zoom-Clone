"use client"
import clipboardCopy from 'clipboard-copy'
import React from 'react'
import { Button } from './ui/button'

const MeetingCard = ({meeting,type,handleClick}:{meeting:{title:string,link:string,date:string},type:'upcoming'|'previous',handleClick:any}) => {
  return (
    <div className='w-[533px] h-[258px] rounded-[14px] px-8 py-6 flex flex-col gap-y-9 bg-blue-2 text-white'>
      <div className='w-[485px] h-auto flex flex-col gap-y-[14px]'>
        <img className='w-[30px] h-[30px]' src='upcoming.svg'/>
        <div className='w-[442px] h-[66px] flex flex-col gap-y-[10px]'>
            <div className={`w-full h-auto font-bold text-2xl`}>
                {meeting.title}
            </div>
            <div className='w-auto h-[22px] flex justify-start gap-x-[3px]'>
                {meeting.date}
            </div>
        </div>
      </div>
      {type==='upcoming'&&
      <div className='relative w-[263px] h-10 flex gap-x-[7px] left-[222px] top-[25px]'>
      <Button size="sm" onClick={handleClick}>
          Start
      </Button>
      <Button variant="ghost" onClick={()=>{
          clipboardCopy(meeting.link);
      }}>
          <img className='w-[14px] h-[14px]' src='copy.svg'/>
          <div className={`w-[117px] h-[22px] text-gray-1 font-semibold`}>
              Copy Invitation
          </div>
    </Button>
    </div>}
    </div>
  )
}

export default MeetingCard
