// import React from 'react'
// import PlaceCardItem from './PlaceCardItem'

// function PlacesToVisit({trip}) {
//   return (
//     <div>
//       <h2 className='font-bold text-lg'>Places to visit</h2>

//     <div>
//       {Object.entries(trip.tripData?.itinerary).map((item,index)=>(
//         <div className='mt-5'>
          
//             <h2 className='font-bold text-lg'>{item.day}</h2>
//             <div className='grid md:grid-cols-2 gap-5'>
//           {item.plan.map(place,index)=>(
//             <div className='my-3'>
//               <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
//              <PlaceCardItem place={place}/>
//           }
              
//             </div>

//           ))}
//           </div>
//         </div>
//       ))}
//     </div>

//     </div>
//   )
// }

// export default PlacesToVisit

import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to visit</h2>
      <div>
        {Object.entries(trip?.tripData?.itinerary || {}).map(([key, value], index) => (
          <div key={index} className="mt-5">
            <h2 className="font-bold text-lg">{key}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {value.activities.map((place, idx) => (
                <div key={idx} className="my-3">
                  {/* <h2 className="font-medium text-sm text-orange-600">
                    {place.time || 'Time not specified'}
                  </h2> */}
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;

