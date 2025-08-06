import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Filter, Loader2, MapPin, Navigation, Search, Users } from "lucide-react";
import { useState } from "react";

const containerStyle = {
   width: "100%",
   height: "100%",
};

// Dummy travelers data
const travelers = [
   { id: 1, name: "Amit", location: { lat: 28.6139, lng: 77.209 }, city: "Delhi", avatar: "👨‍💼" },
   { id: 2, name: "Raj", location: { lat: 19.076, lng: 72.8777 }, city: "Mumbai", avatar: "👨‍🎨" },
   {
      id: 3,
      name: "Priya",
      location: { lat: 12.9716, lng: 77.5946 },
      city: "Bangalore",
      avatar: "👩‍💻",
   },
   { id: 4, name: "Sara", location: { lat: 22.5726, lng: 88.3639 }, city: "Kolkata", avatar: "👩‍🎓" },
   { id: 5, name: "John", location: { lat: 23.0225, lng: 72.5714 }, city: "Pune", avatar: "👨‍🚀" },
   {
      id: 6,
      name: "Emily",
      location: { lat: 13.0827, lng: 80.2707 },
      city: "Chennai",
      avatar: "👩‍🎤",
   },
   {
      id: 7,
      name: "Michael",
      location: { lat: 28.7041, lng: 77.1025 },
      city: "Gurugram",
      avatar: "👨‍🏫",
   },
];

function AllTravelersOnMap() {
   const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_API,
   });

   const [searchQuery, setSearchQuery] = useState("");
   const [selectedTraveler, setSelectedTraveler] = useState(null);
   const [showList, setShowList] = useState(false);

   const center = { lat: 21.146633, lng: 79.08886 };

   const filteredTravelers = travelers.filter(
      (traveler) =>
         traveler.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         traveler.city.toLowerCase().includes(searchQuery.toLowerCase()),
   );

   if (!isLoaded) {
      return (
         <div className="flex min-h-screen items-center justify-center">
            <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
               <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-amber-600" />
               <p className="text-lg font-medium text-gray-700">Loading map...</p>
               <p className="mt-1 text-sm text-gray-500">
                  Please wait while we prepare the travelers map
               </p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen overflow-x-hidden">
         {/* Mobile-First Header */}
         <div className="sticky top-0 z-20 bg-white shadow-lg">
            <div className="px-4 py-4 sm:px-6">
               {/* Title Section */}
               <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="rounded-xl bg-amber-100 p-2">
                        <Users className="h-6 w-6 text-amber-600" />
                     </div>
                     <div>
                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                           Your Nearby Travelers
                        </h1>
                        <p className="text-sm text-gray-600">
                           {filteredTravelers.length} travelers online
                        </p>
                     </div>
                  </div>

                  {/* Toggle List View Button */}
                  <button
                     onClick={() => setShowList(!showList)}
                     className="rounded-xl bg-amber-600 p-2 text-white transition-colors hover:bg-amber-700 sm:hidden"
                  >
                     <Filter className="h-5 w-5" />
                  </button>
               </div>

               {/* Search Bar */}
               <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search travelers or cities..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full rounded-xl border border-gray-200 py-3 pr-4 pl-10 text-base focus:border-transparent focus:ring-2 focus:ring-amber-500 sm:text-sm"
                  />
               </div>
            </div>
         </div>

         <div className="flex min-h-[calc(100vh-120px)] flex-col sm:flex-row">
            {/* Travelers List - Mobile First */}
            <div
               className={`${showList ? "block" : "hidden"} max-h-[300px] overflow-y-auto border-r border-gray-200 bg-white sm:block sm:max-h-155 sm:w-80`}
            >
               <div className="space-y-3 p-4 pb-6 sm:pb-4">
                  <div className="mb-4 flex items-center justify-between">
                     <h2 className="text-lg font-semibold text-gray-900">Active Travelers</h2>
                     {/* Mobile scroll indicator */}
                     <div className="flex items-center text-xs text-gray-500 sm:hidden">
                        {filteredTravelers.length > 4 && (
                           <>
                              <div className="mr-1 h-4 w-1 animate-pulse rounded-full bg-amber-300"></div>
                              Scroll ({filteredTravelers.length})
                           </>
                        )}
                     </div>
                  </div>

                  {filteredTravelers.map((traveler) => (
                     <div
                        key={traveler.id}
                        onClick={() => setSelectedTraveler(traveler)}
                        className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                           selectedTraveler?.id === traveler.id
                              ? "border-amber-500 bg-amber-50 shadow-md"
                              : "hover:bg-amber-25 border-gray-100 hover:border-amber-300"
                        }`}
                     >
                        <div className="flex items-center space-x-3">
                           <div className="text-2xl">{traveler.avatar}</div>
                           <div className="min-w-0 flex-1">
                              <p className="truncate font-medium text-gray-900">{traveler.name}</p>
                              <div className="mt-1 flex items-center space-x-1">
                                 <MapPin className="h-3 w-3 text-amber-500" />
                                 <p className="truncate text-sm text-gray-600">{traveler.city}</p>
                              </div>
                           </div>
                           <div className="flex-shrink-0">
                              <div className="h-3 w-3 rounded-full bg-green-500 shadow-sm"></div>
                           </div>
                        </div>
                     </div>
                  ))}

                  {filteredTravelers.length === 0 && (
                     <div className="py-8 text-center">
                        <Search className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                        <p className="text-gray-500">No travelers found</p>
                        <p className="mt-1 text-sm text-gray-400">Try adjusting your search</p>
                     </div>
                  )}
               </div>
            </div>

            {/* Map Container - Mobile First */}
            <div className="min-h-[500px] flex-1 p-3 sm:p-4">
               <div className="h-[480px] overflow-hidden rounded-2xl bg-white shadow-xl sm:h-[600px]">
                  {/* Map Header */}
                  <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-4 text-white">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <Navigation className="h-5 w-5" />
                           <span className="font-medium">Live Locations</span>
                        </div>
                        <div className="flex items-center space-x-2 text-amber-100">
                           <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                           <span className="text-sm">Real-time</span>
                        </div>
                     </div>
                  </div>

                  {/* Map */}
                  <div className="h-[430px] sm:h-[550px]">
                     <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={5}
                        options={{
                           zoomControl: true,
                           streetViewControl: false,
                           mapTypeControl: false,
                           fullscreenControl: true,
                        }}
                     >
                        {filteredTravelers.map((traveler) => (
                           <Marker
                              key={traveler.id}
                              position={traveler.location}
                              title={`${traveler.name} - ${traveler.city}`}
                              onClick={() => setSelectedTraveler(traveler)}
                           />
                        ))}
                     </GoogleMap>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AllTravelersOnMap;
