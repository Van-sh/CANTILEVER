import {
   Calendar,
   Clock,
   Loader2,
   Loader2Icon,
   MapPin,
   Search,
   Settings,
   Star,
   Users,
   Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MyCreatedActivites } from "../../redux/slices/userActivitySlice";

function CreatedActivites() {
   const currentUser = useSelector((state) => state.userAuth.user);
   const { createdActivity = [], loading } = useSelector((state) => state.userActivity);
   const [searchQuery, setSearchQuery] = useState("");

   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (!currentUser?.currentLocation) return;
      dispatch(MyCreatedActivites());
   }, [dispatch, currentUser]);

   console.log("Created Activities:", createdActivity);

   if (loading) return <Loader2Icon className="animate-spin" />;

   const filteredActivities = createdActivity.filter(
      (activity) =>
         activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         activity.location.formattedAddress.toLowerCase().includes(searchQuery.toLowerCase()),
   );

   const getActivityStatus = (activity) => {
      const now = new Date();
      const activityDate = new Date(activity.date);
      const spotsLeft = activity.participantLimit - (activity?.participants?.length || 0);

      if (activityDate < now) {
         return { type: "completed", text: "Completed", color: "bg-gray-500" };
      } else if (spotsLeft <= 0) {
         return { type: "full", text: "Full", color: "bg-green-500" };
      } else if (spotsLeft <= 3) {
         return { type: "filling", text: "Filling Fast", color: "bg-yellow-500" };
      } else {
         return { type: "open", text: "Open", color: "bg-blue-500" };
      }
   };

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
                     Activities Created By You
                  </h1>
                  <p className="mx-auto max-w-2xl text-xl text-amber-100">
                     Manage and track all the amazing activities you've created for your community.
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
                     placeholder="Search your activities by title, description, or location..."
                     className="w-full rounded-xl border border-gray-200 py-4 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                  />
               </div>

               <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                     <span className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        Your hosted locations
                     </span>
                     <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        Recently created
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
                  <p className="mt-4 font-medium text-gray-600">
                     Loading your created activities...
                  </p>
               </div>
            )}

            {!loading && filteredActivities.length === 0 && (
               <div className="py-16 text-center">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                     <Settings className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                     No activities created yet
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-gray-600">
                     {searchQuery
                        ? "We couldn't find any activities matching your search. Try adjusting your search terms."
                        : "You haven't created any activities yet. Start building your community by creating your first activity!"}
                  </p>
                  {searchQuery ? (
                     <button
                        onClick={() => setSearchQuery("")}
                        className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
                     >
                        Clear Search
                     </button>
                  ) : (
                     <button
                        onClick={() => navigate("/create-activity")}
                        className="rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
                     >
                        Create Your First Activity
                     </button>
                  )}
               </div>
            )}

            {/* Activities Grid */}
            {!loading && filteredActivities.length > 0 && (
               <>
                  <div className="mb-6 flex items-center justify-between">
                     <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                           {filteredActivities.length}{" "}
                           {filteredActivities.length === 1 ? "Activity" : "Activities"} Created
                        </h2>
                        <p className="mt-1 text-gray-600">Manage your hosted activities</p>
                     </div>
                     <button
                        onClick={() => navigate("/create-activity")}
                        className="flex items-center space-x-2 rounded-lg bg-amber-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
                     >
                        <Zap className="h-4 w-4" />
                        <span>Create New Activity</span>
                     </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3">
                     {filteredActivities.map((activity, index) => {
                        const status = getActivityStatus(activity);

                        return (
                           <div
                              key={activity._id}
                              className="group transform overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-amber-200 hover:shadow-2xl"
                              style={{ animationDelay: `${index * 100}ms` }}
                           >
                              {/* Card Header */}
                              <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
                                 <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white opacity-10"></div>
                                 <div className="relative z-10">
                                    <div className="mb-2 flex items-start justify-between">
                                       <h3 className="mr-3 line-clamp-2 flex-1 text-xl font-bold">
                                          {activity.title}
                                       </h3>
                                       <div
                                          className={`rounded-full px-2 py-1 text-xs font-semibold ${status.color} text-white`}
                                       >
                                          {status.text}
                                       </div>
                                    </div>
                                    <div className="flex items-center space-x-4 text-amber-100">
                                       <span className="flex items-center text-sm">
                                          <Users className="mr-1 h-4 w-4" />
                                          {activity?.participants?.length || 0}/
                                          {activity.participantLimit}
                                       </span>
                                       <span className="flex items-center text-sm">
                                          <Star className="mr-1 h-4 w-4 fill-current" />
                                          Host
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

                                 {/* Management Actions */}
                                 <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div className="flex items-center space-x-3">
                                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-semibold text-white">
                                          <img src={currentUser?.profilePicture} alt="" srcset="" />
                                       </div>
                                       <div>
                                          <p className="text-sm font-medium text-gray-900">You</p>
                                          <p className="text-xs text-gray-500">Organizer</p>
                                       </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                       <button
                                          className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 group-hover:shadow-lg hover:bg-amber-700 hover:shadow-md"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             navigate(`/manage-activity/${activity._id}`);
                                          }}
                                       >
                                          Manage
                                       </button>
                                    </div>
                                 </div>
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

export default CreatedActivites;
