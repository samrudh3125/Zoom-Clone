"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Menu = ({name,image,link}:{name:string,image:string,link:string}) => {
    const pathname=usePathname();
    const isActive=pathname===link||pathname.startsWith(link);
  return (
    <Link href={link} className={cn('w-60 h-14 rounded-2',{"bg-blue-3":isActive})}>
        <div className='relative w-[92px] h-6 top-4 left-4 flex gap-x-4'>
            <img src={image} className='w-6 h-6'/>
            <div className={`w-[52px] h-6 font-semibold text-base/[18px] text-white`}>
                {name}            
            </div>
        </div>
    </Link>
  )
}

export default Menu
