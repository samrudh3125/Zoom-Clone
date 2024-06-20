"use client"
import React from 'react'
import Menu from './Menu'

const Sidebar = () => {
  return (
    <div className='w-[264px] h-[770px] bg-blue-2'>
        <div id="icon" className='relative w-auto h-10 top-[30px] left-[25px] flex gap-x-2'>
            <img src='Icon.svg' className='w-10 h-10'/>
            <div className={`w-21 h-[22px] font-extrabold text-lg/10 text-white `}>
                Zoom
            </div>
        </div>
        <div id='menu' className='relative w-60 h-[332px] top-[119px] left-3 flex flex-col gap-y-[13px]'>
            <Menu name='Home' image='Home.svg' link='/dashboard'/>
            <Menu name='Upcoming' image='upcoming.svg' link='/upcoming'/>
            <Menu name='Previous' image='previous.svg' link='/previous'/>
            <Menu name='Recordings' image='record.svg' link='/recording'/>
            <Menu name='Personal Room' image='plus.svg' link='/personal-room'/>
        </div>
    </div>
  )
}

export default Sidebar
