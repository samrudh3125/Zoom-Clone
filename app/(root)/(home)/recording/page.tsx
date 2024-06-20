"use client"
import Loader from '@/components/Loader'
import MeetingCard from '@/components/MeetingCard'
import RecordingCard from '@/components/RecordingCard'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

const page = () => {
  const {callRecordings,loading}=useGetCalls();
  const router=useRouter();

  if(loading) return <Loader/>
  return (
      <div className='w-full h-full'>
        <h2 className='absolute w-[279px] h-[42px] top-[119px] left-75 font-bold text-white text-3xl'>
          Recordings
        </h2>
        <div className='absolute h-auto w-auto top-[191px] left-[300px] grid grid-cols-2 gap-x-10 gap-y-5'>
      {callRecordings&&callRecordings.length>0?(
        callRecordings.map((call:Call|CallRecording)=>(
          <RecordingCard title={(call as CallRecording).filename?.substring(0,20)||"Loren Ipsum"} startAt={(call as CallRecording).start_time} endsAt={(call as CallRecording).end_time} link={(call as CallRecording).url}/>
        ))
      ):(<h1 className="text-2xl font-bold text-white">No Recordings</h1>)}
    </div>
      </div>
  )
}

export default page
