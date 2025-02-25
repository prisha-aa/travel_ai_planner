import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import { db } from '@/service/firebaseConfig';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import Footer from './Footer';

function Viewtrip() {
    const {tripId}=useParams();
    const [trip,setTrip]=useState([])

    useEffect(() => {
    if (tripId) {
      GetTripData(); // Call the function if tripId exists
    }
  }, [tripId]);


    // const GetTripData=async()=>{
    //     const docRef=doc(db,'AITrips',tripId);
    //     const docSnap=await getDoc(docRef);

    //     if(docSnap.exists()){
    //         console.log("Dodocument:",docSnap.data());
    //         setTrip(docSnap.data());

    //     }
    //     else{
    //         console.log("No Such Document")
    //         toast("No Trip Found") 
    //     }
    // }
    const GetTripData = async () => {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        const data = docSnap.data();
    
        // Parse the tripData field if it's a string
        if (typeof data.tripData === 'string') {
          data.tripData = JSON.parse(data.tripData);
        }
    
        console.log("Fetched Document:", data);
        setTrip(data);
      } else {
        console.log("No such document!");
        toast("No Trip Found");
      }
    };
    

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'> 
      {/* Information section */}
      <InfoSection trip={trip}/>

        {/* recommended hotels */}
        <Hotels trip={trip}/>

        {/* Daily Plan */}
        <PlacesToVisit trip={trip}/>
        {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Viewtrip
