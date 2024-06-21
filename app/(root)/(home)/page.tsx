"use client"
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const router=useRouter();
    router.push('/dashboard');
  return (
    <Loader/>
  )
}

export default Page
