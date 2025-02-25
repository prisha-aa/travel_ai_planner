import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";

import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);
    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  // const OnGenerateTrip = async () => {
  //   try {
  //     const user = localStorage.getItem('user');
  //     if (!user) {
  //       setOpenDialog(true);
  //       return;
  //     }

  //     if (
  //       formData?.noOfDays > 5 &&
  //       (!formData?.location || !formData?.budget || !formData?.traveler)
  //     ) {
  //       toast("Please fill all details");
  //       return;
  //     }

  //     setLoading(true);

  //     const FINAL_PROMPT = AI_PROMPT
  //       .replace("{location}", formData?.location?.label)
  //       .replace("{totalDays}", formData?.noOfDays)
  //       .replace("{traveler}", formData?.traveler)
  //       .replace("{budget}", formData?.budget)
  //       .replace("{totalDays}", formData?.noOfDays);

  //     console.log(FINAL_PROMPT);

  //     const result = await chatSession.sendMessage(FINAL_PROMPT);

  //     if (!result?.response?.text) {
  //       throw new Error("Failed to fetch trip data");
  //     }

  //     console.log("--", result?.response?.text());
  //     await SaveAiTrip(result?.response?.text());
  //   } catch (error) {
  //     console.error("Error generating trip:", error);
  //     toast.error("An error occurred while generating the trip");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  };

  // const SaveAiTrip = async (TripData) => {
  //   try {
  //     setLoading(true);
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     const docId = Date.now().toString();

  //     await setDoc(doc(db, "AITrips", docId), {
  //       userSelection: formData,
  //       tripData: JSON.parse(TripData),
  //       userEmail: user?.email,
  //       id: docId,
  //     });
  //   } catch (error) {
  //     console.error("Error saving trip data:", error);
  //     toast.error("Failed to save trip data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  // const GetUserProfile = (tokenInfo) => {
  //   if (!tokenInfo?.access_token) {
  //     console.error("Access token is missing or invalid");
  //     return;
  //   }

  //   axios
  //     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
  //       headers: {
  //         Authorization: `Bearer ${tokenInfo?.access_token}`,
  //         Accept: "application/json",
  //       },
  //     })
  //     .then((resp) => {
  //       console.log("User Profile Data:", resp.data);
  //       // Do something with the data, such as updating a state or rendering it
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
  //     });
  // };

  return (
    <div className="sm:px-20 md:px-42 lg:px-66 xl:px-72 px-5 mt-10px">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>

      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information and our trip planner will generate a
        customized itnerary based on your preferences{" "}
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          {/* <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v); handleInputChange('location',v)
              },
            }}
          /> */}

          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded   bg-white text-black"
            placeholder="Enter destination"
            value={place?.label || ""}
            onChange={(e) => {
              setPlace({ label: e.target.value });
              handleInputChange("location", { label: e.target.value });
            }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          How many days are you planning your trip?
        </h2>
        <Input
          placeholder={"Ex.3"}
          type="number"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium mt-7">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-2xl
                ${formData?.budget == item.title && "shadow=lg border-black"}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium mt-7">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-xl
                ${
                  formData?.traveler == item.people && "shadow=lg border-black"
                }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center "
              >
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
