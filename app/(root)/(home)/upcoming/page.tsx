"use client"
import Loader from '@/components/Loader'
import MeetingCard from '@/components/MeetingCard'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

const Page = () => {
  const {upcomingCalls,loading}=useGetCalls();
  const router=useRouter();

  if(loading) return <Loader/>
  return (
      <div className='w-full h-full'>
        <h2 className='absolute w-auto h-[42px] top-[119px] left-75 font-bold text-white text-2xl'>
          Upcoming Meetings
        </h2>
        <div className='absolute h-auto w-auto top-[191px] left-[300px] grid grid-cols-2 gap-x-10 gap-y-5'>
      {upcomingCalls&&upcomingCalls.length>0?(
        upcomingCalls.map((call:Call)=>(
          <MeetingCard key={call.id} type='upcoming' meeting={{title:call.state.custom.description||'No Description',date:call.state.startsAt?.toLocaleString()||"",link:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(call.id)}`}} handleClick={()=>{
            router.push(`/meeting/${call.id}`);
          }}/>
        ))
      ):(<h1 className="text-2xl font-bold text-white">No Calls</h1>)}
    </div>
      </div>
  )
}

export default Page
