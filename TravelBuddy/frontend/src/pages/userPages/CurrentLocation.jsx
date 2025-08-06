import { AlertCircle, CheckCircle2, Loader2, MapPin, Share2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { currentLocation } from "../../redux/slices/userAuthSlice";

function CurrentLocation() {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState(false);

   const getLocation = () => {
      setLoading(true);
      setError("");
      setSuccess(false);

      if (!navigator.geolocation) {
         setError("Geolocation is not supported by this browser.");
         setLoading(false);
         return;
      }

      navigator.geolocation.getCurrentPosition(
         (position) => {
            dispatch(
               currentLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
            );
            setSuccess(true);
            setLoading(false);

            setTimeout(() => {
               navigate("/");
            }, 1000);
         },
         (error) => {
            let errorMessage = "Unable to retrieve location. ";
            switch (error.code) {
               case error.PERMISSION_DENIED:
                  errorMessage += "Location access denied by user.";
                  break;
               case error.POSITION_UNAVAILABLE:
                  errorMessage += "Location information unavailable.";
                  break;
               case error.TIMEOUT:
                  errorMessage += "Location request timed out.";
                  break;
               default:
                  errorMessage += "An unknown error occurred.";
                  break;
            }
            setError(errorMessage);
            setLoading(false);
            console.error("Error getting location:", error);
         },
         {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
         },
      );
   };

   return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-4">
         <div className="w-full max-w-md transform rounded-2xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105">
            {/* Header */}
            <div className="mb-6">
               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                  <MapPin className="h-8 w-8 text-amber-600" />
               </div>
               <h2 className="mb-2 text-2xl font-bold text-gray-800">Share Your Location</h2>
               <p className="text-sm text-gray-600">
                  Allow us to access your location to capture your current location for your trip
                  planning
               </p>
            </div>

            {/* Error Message */}
            {error && (
               <div className="mb-4 flex items-center rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
               </div>
            )}

            {/* Success Message */}
            {success && (
               <div className="mb-4 flex items-center rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                  <CheckCircle2 className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span>Location captured successfully! Redirecting...</span>
               </div>
            )}

            {/* Action Button */}
            <button
               className={`flex w-full items-center justify-center space-x-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 ${
                  loading
                     ? "cursor-not-allowed bg-gray-400"
                     : success
                       ? "bg-green-500 hover:bg-green-600"
                       : "transform bg-amber-600 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg"
               }`}
               onClick={getLocation}
               disabled={loading || success}
            >
               {loading ? (
                  <>
                     <Loader2 className="h-5 w-5 animate-spin" />
                     <span>Getting Location...</span>
                  </>
               ) : success ? (
                  <>
                     <CheckCircle2 className="h-5 w-5" />
                     <span>Success!</span>
                  </>
               ) : (
                  <>
                     <Share2 className="h-5 w-5" />
                     <span>Share Current Location</span>
                  </>
               )}
            </button>

            {/* Privacy Note */}
            <p className="mt-4 text-xs text-gray-500">
               Your location data is secure and only used to improve your experience
            </p>
         </div>
      </div>
   );
}

export default CurrentLocation;
