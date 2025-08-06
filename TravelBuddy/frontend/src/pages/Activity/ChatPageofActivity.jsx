import { Calendar, Clock, Loader2, MapPin, MessageCircle, Phone, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CurrentLocationMap from "../../components/CurrentLocationMap";
import { getSingleActivity, leaveActivity } from "../../redux/slices/userActivitySlice";

function ChatPage() {
   const { id } = useParams();

   const [loading, setLoading] = useState(false);

   const { singleActivity } = useSelector((state) => state.userActivity);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (!id) return;
      setLoading(true);
      dispatch(getSingleActivity(id)).finally(() => {
         setLoading(false);
      });
   }, [id, dispatch]);
   console.log("singleActivity", singleActivity);

   if (loading) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100">
            <div className="flex flex-col items-center">
               <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
               <p className="mt-4 font-medium text-gray-600">Loading activity...</p>
            </div>
         </div>
      );
   }

   if (!singleActivity) {
      return (
         <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100">
            <div className="text-center">
               <h2 className="mb-2 text-2xl font-bold text-gray-900">Activity not found</h2>
               <p className="mb-4 text-gray-600">The activity you're looking for doesn't exist.</p>
               <button
                  onClick={() => navigate(-1)}
                  className="rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
               >
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   const currentParticipants = singleActivity.participants ? singleActivity.participants.length : 0;

   const getActivityStatus = () => {
      const spotsLeft = singleActivity.participantLimit - currentParticipants;
      if (spotsLeft <= 0) return { type: "full", text: "Activity Full", spotsLeft: 0 };
      if (spotsLeft <= 3) return { type: "limited", text: `${spotsLeft} spots left`, spotsLeft };
      return { type: "available", text: `${spotsLeft} spots available`, spotsLeft };
   };

   const status = getActivityStatus();

   const handleLeaveActivity = () => {
      dispatch(leaveActivity(singleActivity._id));
      navigate("/joined-activities");
   };
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100">
         <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
               {/* Main Content */}
               <div className="lg:col-span-2">
                  {/* Hero Section */}

                  <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                     <div className="relative h-auto bg-gradient-to-r from-amber-500 to-orange-600">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 flex h-full flex-col justify-end p-8">
                           <div className="flex items-start justify-between">
                              <div className="flex-1">
                                 <div className="mb-3 flex items-center space-x-3">
                                    <div
                                       className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                          status.type === "full"
                                             ? "bg-red-500 text-white"
                                             : status.type === "limited"
                                               ? "bg-yellow-400 text-yellow-900"
                                               : "bg-green-400 text-green-900"
                                       }`}
                                    >
                                       {status.text}
                                    </div>
                                 </div>
                                 <h1 className="mb-2 text-3xl font-bold text-white">
                                    {singleActivity.title}
                                 </h1>
                                 <p className="text-lg text-amber-100">
                                    {singleActivity.description.slice(0, 100) + "..."}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Details Section */}
                  <div className="rounded-2xl bg-white p-8 shadow-lg">
                     <h2 className="mb-6 text-2xl font-bold text-gray-900">Activity Details</h2>

                     <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex items-center space-x-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                              <Calendar className="h-6 w-6 text-amber-600" />
                           </div>
                           <div>
                              <p className="font-semibold text-gray-900">{singleActivity.date}</p>
                              <p className="text-gray-600">{singleActivity.time}</p>
                           </div>
                        </div>

                        <div className="flex items-center space-x-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                              <MapPin className="h-6 w-6 text-orange-600" />
                           </div>
                           <div>
                              <p className="font-semibold text-gray-900">Location</p>
                              <p className="text-gray-600">
                                 {singleActivity.location?.formattedAddress}
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center space-x-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                              <Users className="h-6 w-6 text-green-600" />
                           </div>
                           <div>
                              <p className="font-semibold text-gray-900">Participants</p>
                              <p className="text-gray-600">
                                 {currentParticipants}/{singleActivity.participantLimit} joined
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center space-x-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                              <Clock className="h-6 w-6 text-blue-600" />
                           </div>
                           <div>
                              <p className="font-semibold text-gray-900">Created</p>
                              <p className="text-gray-600">
                                 {new Date(singleActivity.createdAt)
                                    .toLocaleDateString()
                                    .split("/")
                                    .reverse()
                                    .join("-")}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="border-t border-gray-200 pt-6">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                           About This Activity
                        </h3>
                        <p className="leading-relaxed text-gray-600">
                           {singleActivity.description}
                        </p>
                     </div>
                  </div>
                  {/* Join Chat Group*/}
                  <div className="mt-4 rounded-2xl bg-white p-6 shadow-lg">
                     <button
                        onClick={() => navigate(`/chat/${singleActivity._id}`)}
                        className="w-full rounded-full bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                     >
                        Join Chat Group
                     </button>
                  </div>
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Join Card */}
                  <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
                     <button
                        onClick={() => handleLeaveActivity()}
                        className="w-full rounded-full bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                     >
                        Leave Activity
                     </button>
                  </div>

                  {/* Organizer Card */}
                  <div className="rounded-2xl bg-white p-6 shadow-lg">
                     <h3 className="mb-4 text-lg font-semibold text-gray-900">Hosted by</h3>
                     <div className="mb-4 flex items-center space-x-4">
                        {singleActivity.creator?.profilePicture ? (
                           <img
                              src={singleActivity.creator.profilePicture}
                              alt={singleActivity.creator.fullName}
                              className="h-16 w-16 rounded-full object-cover"
                           />
                        ) : (
                           <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-bold text-white">
                              {singleActivity.creator?.fullName?.charAt(0) || "U"}
                           </div>
                        )}
                        <div className="flex-1">
                           <h4 className="font-semibold text-gray-900">
                              {singleActivity.creator?.fullName || "Unknown"}
                           </h4>
                           <p className="text-sm text-gray-600">Activity Host</p>
                        </div>
                     </div>
                     <div className="flex space-x-2">
                        <button className="flex-1 rounded-lg bg-amber-100 py-2 font-medium text-amber-700 transition-colors hover:bg-amber-200">
                           <MessageCircle className="mr-2 inline h-4 w-4" />
                           Message
                        </button>
                        <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200">
                           <Phone className="h-4 w-4" />
                        </button>
                     </div>
                  </div>
                  <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
                     <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
                        <MapPin className="text-green-500" size={24} />
                        Activity Location
                     </h2>
                     <div className="h-100 overflow-hidden rounded-2xl">
                        <CurrentLocationMap
                           lat={singleActivity.location?.coordinates[1]}
                           lng={singleActivity.location?.coordinates[0]}
                        />
                     </div>
                  </div>

                  <div className="flex space-x-2">
                     <button className="flex-1 rounded-lg bg-amber-100 py-2 font-medium text-amber-700 transition-colors hover:bg-amber-200">
                        <MessageCircle className="mr-2 inline h-4 w-4" />
                        Message
                     </button>
                     <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200">
                        <Phone className="h-4 w-4" />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ChatPage;
