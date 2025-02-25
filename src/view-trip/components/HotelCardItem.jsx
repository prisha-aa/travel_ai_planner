import React from "react";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect,useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { PHOTO_REF_URL } from "@/service/GlobalApi";


function HotelCardItem({ hotel }) {


  const[photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    hotel&&GetPlacePhoto();
  },[hotel])

const GetPlacePhoto=async()=>{
  const data={
    textQuery:'hotel?.hotelName'
  }
  const result=await GetPlaceDetails(data).then(resp=>{
    console.log(resp.data.places[0].photos[3].name);
    const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
    setPhotoUrl(PhotoUrl);
  })
}



  
  return (
    <div>
      <Link
        to={
          "https://www.google.com/maps/search/?api=1&query=" +
          hotel.hotelName +
          "," +
          hotel?.hotelAddress
        }
        target="_blank"
      >
        <div className="hover:scale-110 transition-all cursor-pointer">
          <img src={photoUrl?photoURl:"/help.jpeg"} className="rounded-xl" />
          <div className="my-2">
            <h2 className="font-medium">{hotel.hotelName}</h2>
            <h2 className="flex text-xs text-gray-500">
              <IoLocationSharp className="h-3.5 w-4" />
              {hotel.hotelAddress}
            </h2>
            <h2 className="text-sm">{hotel?.price}</h2>
            <h2 className="text-sm">{hotel?.rating}⭐</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
