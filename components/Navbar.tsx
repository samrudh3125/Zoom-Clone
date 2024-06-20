"use client"
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  return (
    <div className='align-middle'>
      <div className='absolute w-[1175px] h-[72px] left-[264px] bg-blue-2 flex justify-end items-end'>
      <div className='w-35 h-35 px-5 py-5'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </div>
    </div>
  )
}

export default Navbar
