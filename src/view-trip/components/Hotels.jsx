import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({trip}) {
    console.log("Trip Data:", trip?.tripData);
    console.log("Trip Data:", trip?.tripData?.tripDetails);
    console.log("Trip Data:", trip?.tripData?.hotelOptions);
    
    
    
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {trip?.tripData?.hotelOptions?.map((hotel,index)=>(
                <HotelCardItem hotel={hotel}/>
            ))}
        </div>
      
    </div>
  )
}

export default Hotels


// import React from 'react';

// function Hotels({ trip }) {
// //     const hotelOptions = trip?.tripData?.hotelOptions || []; // hotelOptions is directly under trip, not tripDetails
//     console.log("Full Trip Object:", trip);
//     console.log("Trip Data:", trip?.tripData); 
//     console.log("hotel options:",trip?.hotelOptions)// Log the full trip object
// //     console.log("Hotel Options:", hotelOptions);
// //     console.log(trip.tripData.hotelOptions) // Log the hotelOptions array

//     // console.log("Trip Data:", trip?.tripData);
//     // console.log("hi");
//     // console.log("hi") ;
//     // console.log("hi") ; // Log the entire tripData
//     // console.log("Hotel Options:", trip?.tripData?.hotelOptions); 
//     // console.log("hi") ;// Log the hotelOptions array

//     return (
//         <div>
//             <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
//             <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//                 {trip?.tripData?.hotelOptions?.length > 0 ? (
//                     trip.tripData.hotelOptions.map((item, index) => (
//                         <div key={index} className='border rounded-lg overflow-hidden shadow-md'>
//                             <img 
//                                 src={item.hotelImageUrl || "/placeholder.jpeg"} 
//                                 alt={item.hotelName || "Hotel"} 
//                                 className='w-full h-48 object-cover'
//                             />
//                             <div className='p-4'>
//                                 <h3 className='font-semibold text-lg'>{item.hotelName}</h3>
//                                 <p className='text-gray-600'>{item.hotelAddress}</p>
//                                 <p className='text-gray-800 font-medium'>{item.price}</p>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className='text-gray-500'>No hotels available.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Hotels;
