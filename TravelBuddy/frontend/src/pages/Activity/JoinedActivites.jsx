import {
   Calendar,
   Clock,
   Loader2,
   Loader2Icon,
   MapPin,
   Search,
   Star,
   Users,
   Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getJoinedActivities } from "../../redux/slices/userActivitySlice";

function JoinedActivites() {
   const currentUser = useSelector((state) => state.userAuth.user);
   const { joinedActivities = [], loading } = useSelector((state) => state.userActivity);
   const [searchQuery, setSearchQuery] = useState("");

   const navigate = useNavigate();

   const dispatch = useDispatch();

   useEffect(() => {
      if (!currentUser?.currentLocation) return;
      dispatch(getJoinedActivities());
   }, [dispatch, currentUser]);
   console.log("Joined Activities:", joinedActivities);

   if (loading) return <Loader2Icon className="animate-spin" />;

   const filteredActivities = joinedActivities.filter(
      (activity) =>
         activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         activity.location.formattedAddress.toLowerCase().includes(searchQuery.toLowerCase()),
   );

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100">
         {/* Header Section */}
         <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
               <div className="text-center">
                  <div className="mb-4 flex justify-center">
                     <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                        <Zap className="h-8 w-8 text-white" />
                     </div>
                  </div>
                  <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
                     Your Joined Activites
                  </h1>
                  <p className="mx-auto max-w-2xl text-xl text-amber-100">
                     Welcome to your joined activities page! Here you can find all the activities
                     you have joined.
                  </p>
               </div>
            </div>

            <div className="absolute top-0 left-0 h-64 w-64 -translate-x-32 -translate-y-32 rounded-full bg-white opacity-5"></div>
            <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-48 translate-y-48 rounded-full bg-white opacity-5"></div>
         </div>

         <div className="relative z-10 mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Search Section */}
            <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
               <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                     <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Search activities by title, description, or location..."
                     className="w-full rounded-xl border border-gray-200 py-4 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                  />
               </div>

               <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                     <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        Near your location
                     </span>
                     <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Updated recently
                     </span>
                  </div>
               </div>
            </div>

            {/* Loading State */}
            {loading && (
               <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                     <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
                     <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-amber-200 opacity-75"></div>
                  </div>
                  <p className="mt-4 font-medium text-gray-600">Discovering joined</p>
               </div>
            )}

            {!loading && filteredActivities.length === 0 && (
               <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                     <MapPin className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">No activities joined</h3>
                  <p className="mx-auto mb-6 max-w-md text-gray-600">
                     We couldn't find any activities matching your search. Try adjusting your search
                     terms or check back later.
                  </p>
                  <button
                     onClick={() => setSearchQuery("")}
                     className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
                  >
                     Clear Search
                  </button>
               </div>
            )}

            {/* Activities Grid */}
            {!loading && filteredActivities.length > 0 && (
               <>
                  <div className="mb-6 flex items-center justify-between">
                     <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                           {filteredActivities.length}{" "}
                           {filteredActivities.length === 1 ? "Activity" : "Activities"} Joined
                        </h2>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3">
                     {filteredActivities.map((activity, index) => {
                        return (
                           <div
                              key={activity._id}
                              className="group transform overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-lg transition-all duration-300 hover:scale-105 hover:border-amber-200 hover:shadow-2xl"
                              style={{ animationDelay: `${index * 100}ms` }}
                              onClick={() => navigate(`/activity-info/${activity._id}`)}
                           >
                              {/* Card Header */}
                              <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
                                 <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white opacity-10"></div>
                                 <div className="relative z-10">
                                    <div className="mb-2 flex items-start justify-between">
                                       <h3 className="mr-3 line-clamp-2 flex-1 text-xl font-bold">
                                          {activity.title}
                                       </h3>
                                    </div>
                                    <div className="flex items-center space-x-4 text-amber-100">
                                       <span className="flex items-center text-sm">
                                          <Star className="mr-1 h-4 w-4 fill-current" />
                                          New
                                       </span>
                                       <span className="flex items-center text-sm">
                                          <Users className="mr-1 h-4 w-4" />
                                          {activity?.participants.length}/
                                          {activity.participantLimit}
                                       </span>
                                    </div>
                                 </div>
                              </div>

                              {/* Card Body */}
                              <div className="p-6">
                                 <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600">
                                    {activity.description}
                                 </p>

                                 <div className="mb-6 space-y-3">
                                    <div className="flex items-center text-gray-700">
                                       <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                                          <Calendar className="h-4 w-4 text-amber-600" />
                                       </div>
                                       <div>
                                          <p className="font-medium">{activity.date}</p>
                                          <p className="text-sm text-gray-500">{activity.time}</p>
                                       </div>
                                    </div>

                                    <div className="flex items-start text-gray-700">
                                       <div className="mt-0.5 mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                                          <MapPin className="h-4 w-4 text-orange-600" />
                                       </div>
                                       <div className="flex-1">
                                          <p className="text-sm leading-relaxed font-medium">
                                             {activity.location.formattedAddress}
                                          </p>
                                       </div>
                                    </div>
                                 </div>

                                 {/* Creator Info */}
                                 {activity.creator && (
                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                       <div className="flex items-center space-x-3">
                                          {activity.creator.profilePicture ? (
                                             <img
                                                src={activity.creator.profilePicture}
                                                alt={activity.creator.fullName}
                                                className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover"
                                             />
                                          ) : (
                                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-semibold text-white">
                                                {activity.creator.fullName.charAt(0)}
                                             </div>
                                          )}
                                          <div>
                                             <p className="text-sm font-medium text-gray-900">
                                                {activity.creator.fullName}
                                             </p>
                                             <p className="text-xs text-gray-500">Organizer</p>
                                          </div>
                                       </div>
                                       <button
                                          className="hober:shadow-md rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 group-hover:shadow-lg hover:border-white hover:bg-red-600"
                                          onClick={() => navigate(`/activity-info/${activity._id}`)}
                                       >
                                          Leave Activity
                                       </button>
                                    </div>
                                 )}
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default JoinedActivites;
