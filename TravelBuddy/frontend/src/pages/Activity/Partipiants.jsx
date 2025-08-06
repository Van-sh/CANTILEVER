import { Mail, MessageCircle, Phone, Search, User, Users } from "lucide-react";
import { useState } from "react";

function ParticipantsTable({ participants = [], activityLimit = 10 }) {
   const [searchQuery, setSearchQuery] = useState("");

   const filteredParticipants = participants.filter(
      (participant) =>
         participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
         participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
         participant.mobile.includes(searchQuery),
   );

   const handleSendMessage = (participant) => {
      // Implement message functionality
      console.log("Send message to:", participant.fullName);
   };

   const handleCall = (participant) => {
      // Implement call functionality
      window.open(`tel:${participant.phoneNumber}`);
   };

   return (
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
         <div className="border-b border-gray-200 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
               <div>
                  <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                     <Users className="text-amber-600" size={28} />
                     Participants ({filteredParticipants.length})
                  </h2>
                  <p className="mt-1 text-gray-600">Manage and view all activity participants</p>
               </div>
            </div>

            {/* Search Bar */}
            <div className="mt-4">
               <div className="relative">
                  <Search
                     className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                     size={20}
                  />
                  <input
                     type="text"
                     placeholder="Search participants by name, email, or phone..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
                  />
               </div>
            </div>
         </div>

         {/* Participants Table */}
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-gray-50">
                  <tr>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Participant
                     </th>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Email
                     </th>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Phone
                     </th>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Joined
                     </th>
                     <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Actions
                     </th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  {filteredParticipants.length > 0 ? (
                     filteredParticipants.map((participant) => (
                        <tr key={participant._id} className="transition-colors hover:bg-gray-50">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 {participant.profilePicture ? (
                                    <img
                                       src={participant.profilePicture}
                                       alt={participant.fullName}
                                       className="h-10 w-10 rounded-full border-2 border-gray-200 object-cover"
                                    />
                                 ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 font-semibold text-white">
                                       {participant.fullName.charAt(0)}
                                    </div>
                                 )}
                                 <div>
                                    <p className="font-medium text-gray-900">
                                       {participant.fullName}
                                    </p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                 <Mail size={16} className="text-gray-400" />
                                 <span className="text-sm">{participant.email}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2 text-gray-600">
                                 <Phone size={16} className="text-gray-400" />
                                 <span className="text-sm">{participant.mobile}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className="text-sm text-gray-600">
                                 {new Date(participant.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                 })}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                 <button
                                    onClick={() => handleSendMessage(participant)}
                                    className="rounded-lg p-2 text-amber-600 transition-colors hover:bg-amber-50"
                                    title="Send Message"
                                 >
                                    <MessageCircle size={16} />
                                 </button>
                                 <button
                                    onClick={() => handleCall(participant)}
                                    className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
                                    title="Call"
                                 >
                                    <Phone size={16} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5" className="px-6 py-12 text-center">
                           <div className="flex flex-col items-center gap-4">
                              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                 <User className="h-8 w-8 text-gray-400" />
                              </div>
                              <div>
                                 <h3 className="mb-2 text-lg font-medium text-gray-900">
                                    {searchQuery
                                       ? "No matching participants"
                                       : "No participants yet"}
                                 </h3>
                                 <p className="text-gray-600">
                                    {searchQuery
                                       ? "Try adjusting your search terms to find participants."
                                       : "Participants will appear here once they join your activity."}
                                 </p>
                              </div>
                           </div>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Table Footer */}
         {filteredParticipants.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
               <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>
                     Showing {filteredParticipants.length} of {participants.length} participants
                  </span>
                  <div className="flex items-center gap-2">
                     <span>Activity capacity:</span>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-gray-200">
                           <div
                              className="h-2 rounded-full bg-amber-500 transition-all"
                              style={{ width: `${(participants.length / activityLimit) * 100}%` }}
                           ></div>
                        </div>
                        <span className="font-medium">
                           {participants.length}/{activityLimit}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default ParticipantsTable;
