import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { lazy } from "react";
import AllTravelersOnMap from "./components/AllTravelersOnMap";
import Layout from "./Components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { loadUser } from "./redux/slices/userAuthSlice";

const ActivityNearMe = lazy(() => import("./pages/Activity/ActivityNearMe"));
const ChatPage = lazy(() => import("./pages/Activity/ChatPageofActivity"));
const CreateActivity = lazy(() => import("./pages/Activity/CreateActivity"));
const InvididualActivity = lazy(() => import("./pages/Activity/InvididualActivity"));
const JoinedActivites = lazy(() => import("./pages/Activity/JoinedActivites"));
const ManageActivity = lazy(() => import("./pages/Activity/ManageActivity"));
const CreatedActivites = lazy(() => import("./pages/Activity/MyCreatedActivites"));
const ChatGroup = lazy(() => import("./pages/Chat/ChatGroup"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CurrentLocation = lazy(() => import("./pages/userPages/CurrentLocation"));
const MyConnections = lazy(() => import("./pages/userPages/MyConnections"));
const UpdateProfile = lazy(() => import("./pages/userPages/UpdateProfile"));
const UserLogin = lazy(() => import("./pages/userPages/userLogin"));
const UserProfile = lazy(() => import("./pages/userPages/UserProfile"));
const UserRegister = lazy(() => import("./pages/userPages/userRegister"));

export default function App() {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/map" element={<AllTravelersOnMap />} />
            <Route path="/create-activity" element={<CreateActivity />} />
            <Route path="/activity-near-me" element={<ActivityNearMe />} />
            <Route path="/activity/:id" element={<InvididualActivity />} />
            <Route path="/joined-activities" element={<JoinedActivites />} />
            <Route path="/created-activities" element={<CreatedActivites />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/connections" element={<MyConnections />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/activity-info/:id" element={<ChatPage />} />
            <Route path="/chat/:id" element={<ChatGroup />} />
            <Route path="/manage-activity/:id" element={<ManageActivity />} />

            <Route
               index
               element={
                  <PrivateRoute>
                     <HomePage />
                     <CurrentLocation />
                  </PrivateRoute>
               }
            />
         </Route>
         <Route path="/current-location" element={<CurrentLocation />} />

         <Route path="/login" element={<UserLogin />} />
         <Route path="/register" element={<UserRegister />} />
      </Routes>
   );
}
