"use client"
import { cn } from '@/lib/utils';
import React from 'react'

interface HomeCardProps {
    className?: string;
    img: string;
    title: string;
    description: string;
    handleClick?: () => void;
}

const HomeCard = (props:HomeCardProps) => {
  return (
    <div className={cn('relative w-[260px] h-[260px] rounded-[14px] bg-[#FF742E]',props.className)} onClick={props.handleClick}>
      <div className='absolute w-14 h-14 top-6 left-5 rounded-[10px] p-[10px] glassmorphism'>
        <img src={props.img} className='w-9 h-9'/>
      </div>
      <div className='absolute w-[192px] h-[63px] top-[173px] left-5 flex flex-col gap-y-[5px]'>
        <h3 className={`font-bold text-[21px] text-white`}>{props.title}</h3>
        <div className={`font-base/[18px] text-white font-normal`}>{props.description}</div>
      </div>
    </div>
  )
}

export default HomeCard
