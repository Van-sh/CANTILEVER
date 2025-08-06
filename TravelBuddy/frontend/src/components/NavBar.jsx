import {
   Activity,
   Bell,
   Calendar,
   ChevronDown,
   Compass,
   Globe,
   Link,
   LogOut,
   MapPin,
   Menu,
   Plus,
   Settings,
   Trash2,
   User,
   X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { logout } from "../redux/slices/userAuthSlice";
import ReverseGeocode from "./ReverseGeoCode";

function NavBar() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
   const profileMenuRef = useRef(null);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const currentUser = useSelector((state) => state.userAuth.user);
   console.log("Current User:", currentUser);

   const notificationCount = 3;

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setIsProfileMenuOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const handleLogin = (path) => {
      navigate(path);
   };
   const handleRegister = (path) => {
      navigate(path);
   };
   const handleNavigation = (path) => {
      navigate(path);
      setIsProfileMenuOpen(false);
   };

   const handleLogout = () => {
      dispatch(logout());
      toast.success("Logout successful");
      setIsProfileMenuOpen(false);
   };

   const handleDeleteAccount = () => {
      console.log("Delete account clicked");
      setIsProfileMenuOpen(false);
   };

   const navLinks = [
      { name: "Discover", path: "/", icon: Compass },
      { name: "Map", path: "/map", icon: MapPin },
      { name: "Activities", path: "/activity-near-me", icon: Calendar },
   ];

   const profileMenuItems = [
      { name: "Profile", path: "/profile", icon: User },
      { name: "Joined Activities", path: "/joined-activities", icon: Activity },
      { name: "My Activities", path: "/created-activities", icon: Calendar },
      { name: "Connections", path: "/connections", icon: Link },
      { name: "Notifications", path: "/notifications", icon: Bell, badge: notificationCount },
      { name: "Update Profile", path: "/update-profile", icon: Settings },
   ];

   return (
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-lg">
         <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
               <button
                  onClick={() => handleNavigation("/")}
                  className="flex items-center space-x-2 transition-opacity hover:opacity-80"
               >
                  <div className="rounded-lg bg-amber-600 p-2">
                     <Globe className="text-white" size={24} />
                  </div>
                  <div>
                     <span className="bg-amber-600 bg-clip-text text-xl font-bold text-transparent">
                        TravelBuddy
                     </span>
                     <div className="-mt-1 text-xs text-gray-500">Find your travel buddy</div>
                  </div>
               </button>

               {currentUser && (
                  <div className="hidden items-center space-x-1 rounded-full bg-gray-50 px-3 py-1 text-sm text-gray-600 lg:flex">
                     <MapPin size={24} className="text-amber-600" />
                     <ReverseGeocode
                        lat={currentUser.currentLocation.lat}
                        lng={currentUser.currentLocation.lng}
                     />
                  </div>
               )}

               <div className="hidden items-center space-x-6 md:flex">
                  {navLinks.map((link) => (
                     <button
                        key={link.name}
                        onClick={() => handleNavigation(link.path)}
                        className="group relative flex items-center space-x-1 text-gray-700 transition-colors duration-200 hover:text-blue-600"
                     >
                        <link.icon size={20} />
                        <span className="underline-offset-4 group-hover:underline">
                           {link.name}
                        </span>
                        {link.badge && link.badge > 0 && (
                           <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                              {link.badge}
                           </span>
                        )}
                     </button>
                  ))}

                  {currentUser ? (
                     <div className="flex items-center space-x-4">
                        <button
                           onClick={() => handleNavigation("/create-activity")}
                           className="flex items-center space-x-1 rounded-lg bg-amber-600 px-4 py-2 text-white shadow-md transition-all duration-200 hover:bg-amber-700 hover:shadow-lg"
                        >
                           <Plus size={18} />
                           <span className="hidden text-center lg:inline">Create Activity</span>
                        </button>

                        {/* Profile Dropdown Menu */}
                        <div className="relative" ref={profileMenuRef}>
                           <button
                              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                              className="flex items-center space-x-2 rounded-lg p-1 text-gray-700 transition-colors hover:bg-gray-50 hover:text-amber-600"
                           >
                              <img
                                 src={
                                    currentUser.profilePicture ||
                                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                 }
                                 alt={currentUser.name}
                                 className="h-8 w-8 rounded-full border-2 border-gray-200 transition-colors hover:border-amber-600"
                              />
                              <span className="hidden lg:inline">{currentUser.fullName}</span>
                              <ChevronDown
                                 className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`}
                              />
                           </button>

                           {/* Dropdown Menu */}
                           {isProfileMenuOpen && (
                              <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                                 {/* User Info Header */}
                                 <div className="border-b border-gray-100 px-4 py-3">
                                    <div className="flex items-center space-x-3">
                                       <img
                                          src={
                                             currentUser.profilePicture ||
                                             "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                                          }
                                          alt={currentUser.fullName}
                                          className="h-10 w-10 rounded-full border-2 border-gray-200"
                                       />
                                       <div>
                                          <p className="text-sm font-semibold text-gray-900">
                                             {currentUser.fullName}
                                          </p>
                                          <p className="text-xs text-gray-500">View profile</p>
                                       </div>
                                    </div>
                                 </div>

                                 {profileMenuItems.map((item, index) => (
                                    <button
                                       key={index}
                                       onClick={() => handleNavigation(item.path)}
                                       className="flex w-full items-center justify-between px-4 py-2 text-left text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                       <div className="flex items-center space-x-3">
                                          <item.icon size={16} />
                                          <span>{item.name}</span>
                                       </div>
                                       {item.badge && item.badge > 0 && (
                                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                             {item.badge}
                                          </span>
                                       )}
                                    </button>
                                 ))}

                                 <div className="my-1 border-t border-gray-100"></div>

                                 <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center space-x-3 px-4 py-2 text-left text-red-600 transition-colors hover:bg-red-50"
                                 >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                 </button>

                                 <button
                                    onClick={handleDeleteAccount}
                                    className="flex w-full items-center space-x-3 px-4 py-2 text-left text-red-600 transition-colors hover:bg-red-50"
                                 >
                                    <Trash2 size={16} />
                                    <span>Delete Account</span>
                                 </button>
                              </div>
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="flex items-center space-x-3">
                        <button
                           onClick={() => handleLogin("/login")}
                           className="font-medium text-gray-700 transition-colors hover:text-blue-600"
                        >
                           Login
                        </button>
                        <button
                           onClick={() => handleRegister("/register")}
                           className="rounded-lg bg-amber-600 px-4 py-2 font-medium text-white shadow-md transition-all duration-200 hover:bg-amber-700 hover:shadow-lg"
                        >
                           Join Now
                        </button>
                     </div>
                  )}
               </div>

               <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-700 hover:text-blue-600 md:hidden"
               >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
               <div className="mt-2 space-y-1 border-t border-gray-100 pt-4 pb-4 md:hidden">
                  {/* Current Location (Mobile) */}
                  {currentUser && (
                     <div className="mx-3 mb-3 flex items-center space-x-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-blue-500" />
                        <ReverseGeocode
                           lat={currentUser.currentLocation.lat}
                           lng={currentUser.currentLocation.lng}
                        />
                     </div>
                  )}

                  {navLinks.map((link) => (
                     <button
                        key={link.name}
                        onClick={() => {
                           handleNavigation(link.path);
                           setIsMenuOpen(false);
                        }}
                        className="relative mx-3 flex w-full items-center space-x-3 rounded-lg px-3 py-3 text-left text-gray-700 transition-colors hover:bg-gray-50"
                     >
                        <link.icon size={20} />
                        <span className="font-medium">{link.name}</span>
                        {link.badge && link.badge > 0 && (
                           <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                              {link.badge}
                           </span>
                        )}
                     </button>
                  ))}

                  <button
                     onClick={() => {
                        handleNavigation("/create-activity");
                        setIsMenuOpen(false);
                     }}
                     className="align-center mx-3 flex w-full space-x-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-700"
                  >
                     <Plus size={20} />
                     <span className="mt-[-1px] text-center font-medium">Create Activity</span>
                  </button>

                  {currentUser ? (
                     <div className="mx-3 space-y-1 border-t border-gray-100 pt-2">
                        {/* Mobile Profile Menu Items */}
                        {profileMenuItems.map((item, index) => (
                           <button
                              key={index}
                              onClick={() => {
                                 handleNavigation(item.path);
                                 setIsMenuOpen(false);
                              }}
                              className="flex w-full items-center space-x-3 rounded-lg px-3 py-3 text-left text-gray-700 hover:bg-gray-50"
                           >
                              <item.icon size={20} />
                              <span>{item.name}</span>
                           </button>
                        ))}

                        {/* Notifications (Mobile) */}
                        <button className="flex w-full items-center space-x-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-gray-50">
                           <Bell size={20} />
                           <span>Notifications</span>
                           {notificationCount > 0 && (
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-left text-xs text-white">
                                 {notificationCount}
                              </span>
                           )}
                        </button>

                        <button
                           onClick={() => {
                              handleLogout();
                              setIsMenuOpen(false);
                           }}
                           className="flex w-full items-center space-x-3 rounded-lg px-3 py-3 text-red-600 hover:bg-red-50"
                        >
                           <LogOut size={20} />
                           <span>Logout</span>
                        </button>

                        <button
                           onClick={() => {
                              handleDeleteAccount();
                              setIsMenuOpen(false);
                           }}
                           className="flex w-full items-center space-x-3 rounded-lg px-3 py-3 text-red-600 hover:bg-red-50"
                        >
                           <Trash2 size={20} />
                           <span>Delete Account</span>
                        </button>
                     </div>
                  ) : (
                     <div className="mx-3 mt-4 space-y-2 border-t border-gray-100 pt-4">
                        <button
                           onClick={() => {
                              handleLogin("/login");
                              setIsMenuOpen(false);
                           }}
                           className="block w-full rounded-lg px-3 py-3 text-left font-medium text-gray-700 hover:bg-gray-50"
                        >
                           Login
                        </button>
                        <button
                           onClick={() => {
                              handleRegister("/register");
                              setIsMenuOpen(false);
                           }}
                           className="block w-full rounded-lg bg-amber-600 px-3 py-30 text-center font-medium text-white transition-all duration-200 hover:bg-amber-700"
                        >
                           Join TravelConnect
                        </button>
                     </div>
                  )}
               </div>
            )}
         </div>
      </nav>
   );
}

export default NavBar;
