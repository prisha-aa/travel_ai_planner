import { Button } from '@/components/ui/button'
import React from 'react'
import { IoMdShareAlt } from "react-icons/io";
import { GetPlaceDetails } from '@/service/GlobalApi';
import { useEffect,useState } from 'react';



const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY


function InfoSection({trip}){
  const[photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

const GetPlacePhoto=async()=>{
  const data={
    textQuery:'trip?.userSelection?.location?.label'
  }
  const result=await GetPlaceDetails().then(resp=>{
    console.log(resp.data.places[0].photos[3].name);

    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
    setPhotoUrl(PhotoUrl);
  })
}


  return (
    <div>
      <img src={'/plaeholder.jpeg'} className='h-[300px] w-full object cover rounded-xl'/>
      <div className='flex items-center justify-between'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex gap-5'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md md:text-md'>📅{trip.userSelection?.noOfDays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md md:text-md'>💰{trip.userSelection?.budget} Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-md md:text-md'>🧑‍🤝‍🧑No. of Traveler:{trip.userSelection?.traveler} </h2>
        </div>
      </div>
      <Button >
      <IoMdShareAlt />
      </Button>
      </div>
    </div>
  )

}
export default InfoSection
