import { Calendar, Heart, Mail, MapPin, Phone, Plane, User, Users } from "lucide-react";
import { useSelector } from "react-redux";

import CurrentLocationMap from "../../components/CurrentLocationMap";

function UserProfile() {
   const user = useSelector((state) => state.userAuth.user);

   const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   if (!user) {
      return (
         <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="text-center">
               <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
               <p className="text-lg text-gray-600">Loading user profile...</p>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
         <div className="mx-auto max-w-4xl">
            {/* Header Card */}
            <div className="relative mb-6 overflow-hidden rounded-3xl bg-orange-100 p-6 shadow-xl sm:p-8">
               <div className="absolute top-0 right-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-gradient-to-bl from-blue-100 to-transparent opacity-50"></div>

               {/* Profile Header */}
               <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <div className="relative">
                     <img
                        src={user.profilePicture}
                        alt={`${user.fullName}'s profile`}
                        className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                     />
                     <div
                        className={`absolute right-2 bottom-2 h-6 w-6 rounded-full border-2 border-white ${
                           user.isOnline ? "bg-green-500" : "bg-gray-400"
                        }`}
                     ></div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                     <h1 className="mb-2 text-3xl font-bold text-gray-800 sm:text-4xl">
                        {user.fullName}
                     </h1>

                     <div className="mb-4 flex items-center justify-center gap-2 sm:justify-start">
                        <div
                           className={`h-2 w-2 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                        ></div>
                        <span className="text-sm text-gray-600">
                           {user.isOnline ? "Online now" : "Offline"}
                        </span>
                     </div>

                     {user.bio && (
                        <p className="rounded-lg bg-amber-100 p-3 text-justify text-sm leading-relaxed font-semibold tracking-wide text-gray-600 shadow-2xl">
                           {user.bio}
                        </p>
                     )}
                  </div>
               </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
               {/* Contact Information */}
               <div className="rounded-3xl bg-blue-100 p-6 shadow-xl sm:p-8">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
                     <User className="text-blue-600" size={24} />
                     Contact Information
                  </h2>

                  <div className="space-y-4">
                     <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4">
                        <Mail size={24} className="flex-shrink-0 text-blue-600" />
                        <div className="flex-1">
                           <p className="text-sm font-medium text-gray-500">Email</p>
                           <p className="font-medium text-gray-700">{user.email}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 rounded-xl bg-green-50 p-4">
                        <Phone size={24} className="flex-shrink-0 text-green-600" />
                        <div className="flex-1">
                           <p className="text-sm font-medium text-gray-500">Phone</p>
                           <p className="font-medium text-gray-700">{user.mobile}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 rounded-xl bg-purple-50 p-4">
                        <Calendar size={24} className="flex-shrink-0 text-purple-600" />
                        <div className="flex-1">
                           <p className="text-sm font-medium text-gray-500">Joined</p>
                           <p className="font-medium text-gray-700">{formatDate(user.createdAt)}</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Interests & Destinations */}
               <div className="space-y-6">
                  {/* Interests */}
                  <div className="rounded-3xl bg-pink-100 p-6 shadow-xl sm:p-8">
                     <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
                        <Heart className="text-red-500" size={24} />
                        Interests
                     </h2>

                     <div className="flex flex-wrap gap-2">
                        {user.interests?.length > 0 ? (
                           user.interests.map((interest, index) => (
                              <span
                                 key={index}
                                 className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                              >
                                 {interest}
                              </span>
                           ))
                        ) : (
                           <p className="text-gray-500 italic">No interests added yet</p>
                        )}
                     </div>
                  </div>

                  {/* Future Destinations */}
                  <div className="rounded-3xl bg-red-50 p-6 shadow-xl sm:p-8">
                     <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
                        <Plane className="text-blue-500" size={24} />
                        Future Destinations
                     </h2>

                     <div className="flex flex-col gap-2 overflow-y-auto">
                        {user.futureDestinations?.length > 0 ? (
                           user.futureDestinations.map((destination, index) => (
                              <div
                                 key={index}
                                 className="space-y-2 rounded-lg bg-cyan-50 p-4 text-sm text-gray-700 shadow"
                              >
                                 <p className="flex items-center gap-2">
                                    <MapPin size={24} className="text-blue-600" />
                                    Manali
                                 </p>

                                 <p className="flex items-center gap-2">
                                    <Calendar size={24} className="text-purple-600" />

                                    {new Date(destination.startDate).toLocaleDateString() -
                                       new Date(destination.endDate).toLocaleDateString()}
                                 </p>
                              </div>
                           ))
                        ) : (
                           <p className="text-gray-500 italic">No destinations planned yet</p>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Location & Activity Stats */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
               {/* Current Location */}
               <div className="rounded-3xl bg-yellow-50 p-6 shadow-xl sm:p-8">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
                     <MapPin className="text-green-500" size={24} />
                     Current Location
                  </h2>
                  <div className="h-50 overflow-hidden rounded-2xl">
                     <CurrentLocationMap
                        lat={user.currentLocation?.lat}
                        lng={user.currentLocation?.lng}
                     />
                  </div>
               </div>

               {/* Activity Stats */}
               <div className="rounded-3xl bg-gray-200 p-6 shadow-xl sm:p-8">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
                     <Users className="text-purple-500" size={24} />
                     Activity Stats
                  </h2>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3">
                        <span className="text-gray-600">Activities Joined</span>
                        <span className="font-bold text-purple-600">
                           {user.JoinActivity?.length || 0}
                        </span>
                     </div>
                     <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
                        <span className="text-gray-600">Interests</span>
                        <span className="font-bold text-orange-600">
                           {user.interests?.length || 0}
                        </span>
                     </div>
                     <div className="flex items-center justify-between rounded-lg bg-teal-50 p-3">
                        <span className="text-gray-600">Future Destinations</span>
                        <span className="font-bold text-teal-600">
                           {user.futureDestinations?.length || 0}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default UserProfile;
