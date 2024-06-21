"use client"
import HomeCard from '@/components/HomeCard'
import Loader from '@/components/Loader'
import MeetingCard from '@/components/MeetingCard'
import MeetingModel from '@/components/MeetingModel'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useGetCalls } from '@/hooks/useGetCalls'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import clipboardCopy from 'clipboard-copy'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ReactDatePicker from "react-datepicker"

const Page = () => {
    const {upcomingCalls,loading}=useGetCalls();
    const router=useRouter();
    const [meetingState,setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>();
    const {user}=useUser();
    const client=useStreamVideoClient();
    const [values,setValues]=useState({
      dateTime:new Date(),
      description:'',
      link:''
    });
    const [callDetails,setCallDetails]=useState<Call>();
    const {toast}=useToast();
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

    const createMeeting=async()=>{
      if(!user||!client) return;
      try {
        if(!values.dateTime){
          toast({
            title:"Please select a date and time"
          })
          return ;
        }
        const id=crypto.randomUUID();
        const call=client.call('default',id);

        if(!call)throw new Error("Failed to create call");

        const startsAt=values.dateTime.toISOString()||new Date(Date.now()).toISOString();
        const description=values.description||"InstantMeeting";

        await call.getOrCreate({
          data:{
            starts_at:startsAt,
            custom:{
              description
            }
          }
        })

        setCallDetails(call);

        if(!values.description){
          router.push(`/meeting/${call.id}`);
        }

        toast({
          title:"Meeting Created Successfully"
        })
      } catch (error) {
        console.log(error);
        toast({
          title:"Failed to create meeting"
        })
      }
    }
    if(loading)return <Loader/>
  return (
    <div className='w-full h-full relative text-white'>
      <div className='absolute w-[1080px] h-[260px] left-75 justify-between  flex flex-col gap-5 md:flex'>
        <HomeCard key={"New Meeting"} title='New Meeting' description='Setup a new meeting' img='plus.svg' handleClick={()=>{setMeetingState("isInstantMeeting")}}/>
        <HomeCard key={"Join Meeting"} title='Join Meeting' description='via invitation link' img='join.svg' className='bg-blue-3' handleClick={()=>{setMeetingState('isJoiningMeeting')}}/>
        <HomeCard key={"Schedule Meeting"} title='Schedule Meeting' description='Plan your meeting' img='schedule.svg' className='bg-[#830EF9]' handleClick={()=>{setMeetingState("isScheduleMeeting")}}/>
        <HomeCard key={"New Recordings"} title='New Recordings' description='Meeting recordings' img='record.svg' className='bg-[#F9A90E]' handleClick={()=>{router.push('/recording')}}/>
      </div>
      <h2 className='w-[500px] h-[42px] absolute top-[300px] left-75 font-bold text-4xl/[27px]'>
        Today’s Upcoming Meetings
      </h2>
      <div className='absolute top-[350px] left-75 flex flex-col gap-y-5 md:flex gap-x-2 py-6'>
        {upcomingCalls&&upcomingCalls[0]&&<MeetingCard key={upcomingCalls[0].id} type='upcoming' meeting={{title:upcomingCalls[0].state.custom.description||'No Description',date:upcomingCalls[0].state.startsAt?.toLocaleString()||"",link:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(upcomingCalls[0].id)}`}} handleClick={()=>{
            router.push(`/meeting/${upcomingCalls[0].id}`);
          }}/>}
        {upcomingCalls&&upcomingCalls[1]&&<MeetingCard key={upcomingCalls[0].id} type='upcoming' meeting={{title:upcomingCalls[1].state.custom.description||'No Description',date:upcomingCalls[1].state.startsAt?.toLocaleString()||"",link:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(upcomingCalls[1].id)}`}} handleClick={()=>{
            router.push(`/meeting/${upcomingCalls[1].id}`);
          }}/>}
      </div>
      {!callDetails?(
        <MeetingModel isOpen={meetingState === 'isScheduleMeeting'} onClose={() => { setMeetingState(undefined);}} title = "Create Meeting" className = "text-center" onClick = { createMeeting } >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base font-normal leading-[22.4px] text-sky-1'>
              Add a Description
            </label>
            <Input onChange={(e)=>setValues({...values,description:e.target.value})} className='h-[70px]'/>
          </div>
          <div className='flex flex-col gap-2.5'>
            <label className='text-base font-normal leading-[22.4px] text-sky-1'>
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-blue-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ):(<MeetingModel isOpen={meetingState === 'isScheduleMeeting'} onClose={() => { setMeetingState(undefined);}} title = "Meeting Created" className = "text-center bg-blue-2" buttonText = "Copy Meeting Link" image='checked.svg' buttonIcon='copy.svg' onClick = { ()=>{clipboardCopy(meetingLink);toast({title:"Link Copied Successfully"})} } />)}
      <MeetingModel isOpen={meetingState === 'isInstantMeeting'} onClose={() => { setMeetingState(undefined);}} title = "Start an Instant Meeting" className = "text-center" buttonText = "Create Meeting" onClick = {createMeeting} />
      <MeetingModel
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        onClick={() => {
          if(!values.link){
            toast({title:"Enter meeting Url"})
          }
          router.push(values.link)}}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModel>
    </div>
  )
}

export default Page
