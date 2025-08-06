import { ChevronRight, Compass, Heart, Play, Shield, Star, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CurrentLocationMap from "../components/CurrentLocationMap";

function HomePage() {
   const [isVisible, setIsVisible] = useState(false);
   const [activeFeature, setActiveFeature] = useState(0);
   const user = useSelector((state) => state.userAuth.user);

   useEffect(() => {
      setIsVisible(true);

      const interval = setInterval(() => {
         setActiveFeature((prev) => (prev + 1) % 3);
      }, 4000);

      return () => clearInterval(interval);
   }, []);

   const testimonials = [
      {
         name: "Sarah Chen",
         location: "Tokyo, Japan",
         text: "Found my travel squad for Southeast Asia through TravelBuddy. Best decision ever!",
         avatar: "👩‍💼",
      },
      {
         name: "Marcus Rodriguez",
         location: "Barcelona, Spain",
         text: "Met incredible people and discovered hidden gems I never would have found alone.",
         avatar: "👨‍🎨",
      },
      {
         name: "Emma Thompson",
         location: "Sydney, Australia",
         text: "From solo traveler to part of an amazing global community. Love this platform!",
         avatar: "👩‍🚀",
      },
   ];

   const features = [
      {
         icon: <Compass className="h-8 w-8" />,
         title: "Smart Matching",
         description:
            "AI-powered algorithm connects you with compatible travelers based on interests, travel style, and destination",
         color: "from-blue-500 to-cyan-500",
      },
      {
         icon: <Users className="h-8 w-8" />,
         title: "Group Adventures",
         description:
            "Join or create group trips, activities, and meetups with verified travelers worldwide",
         color: "from-purple-500 to-pink-500",
      },
      {
         icon: <Shield className="h-8 w-8" />,
         title: "Safe & Verified",
         description:
            "All members are ID-verified with safety ratings and reviews from the community",
         color: "from-green-500 to-emerald-500",
      },
   ];

   return (
      <div className="min-h-screen overflow-hidden bg-white">
         {/* Hero Section */}
         <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-16 pb-20">
            {/* Background Elements */}
            <div className="absolute inset-0">
               <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-orange-200 opacity-20"></div>
               <div
                  className="absolute top-40 right-20 h-32 w-32 animate-pulse rounded-full bg-blue-200 opacity-20"
                  style={{ animationDelay: "1s" }}
               ></div>
               <div
                  className="absolute bottom-20 left-1/4 h-16 w-16 animate-pulse rounded-full bg-purple-200 opacity-20"
                  style={{ animationDelay: "2s" }}
               ></div>
            </div>

            <div
               className={`relative z-10 mx-auto max-w-7xl px-4 transition-all duration-1000 sm:px-6 lg:px-8 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
               <div className="grid items-center gap-12 lg:grid-cols-2">
                  <div className="text-left">
                     <div className="mb-6 inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
                        <Zap className="mr-2 h-4 w-4" />
                        Join 50,000+ Active Travelers
                     </div>

                     <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 lg:text-7xl">
                        Your Next
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                           {" "}
                           Adventure
                        </span>
                        <br />
                        Starts Here
                     </h1>

                     <p className="mb-8 max-w-lg text-xl leading-relaxed text-gray-600">
                        Connect with like-minded travelers, join amazing adventures, and create
                        unforgettable memories around the globe.
                     </p>

                     <div className="flex flex-col gap-4 sm:flex-row">
                        <button className="group flex transform items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-pink-600 hover:shadow-lg">
                           Start Your Journey
                           <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </button>

                        <button className="group flex items-center justify-center rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-orange-500">
                           <Play className="mr-2 h-5 w-5" />
                           Watch Demo
                        </button>
                     </div>

                     <div className="mt-8 flex items-center text-sm text-gray-500">
                        <Star className="h-5 w-5 fill-current text-yellow-400" />
                        <Star className="h-5 w-5 fill-current text-yellow-400" />
                        <Star className="h-5 w-5 fill-current text-yellow-400" />
                        <Star className="h-5 w-5 fill-current text-yellow-400" />
                        <Star className="h-5 w-5 fill-current text-yellow-400" />
                        <span className="ml-2">4.9/5 from 12,000+ reviews</span>
                     </div>
                  </div>

                  <div className="relative">
                     <div className="relative rotate-2 transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-500 hover:rotate-0">
                        <div className="relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                           <img
                              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop"
                              alt="Travelers exploring"
                              className="h-full w-full rounded-2xl object-cover opacity-90"
                           />
                           <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/30 to-transparent"></div>
                           <div className="absolute bottom-4 left-4 text-white">
                              <p className="text-lg font-semibold">Live Adventures</p>
                              <p className="text-sm opacity-90">234 happening now</p>
                           </div>
                        </div>
                     </div>

                     {/* Floating elements */}
                     <div className="absolute -top-6 -right-6 animate-bounce rounded-2xl bg-white p-4 shadow-lg">
                        <div className="flex items-center">
                           <div className="mr-2 h-3 w-3 rounded-full bg-green-400"></div>
                           <span className="text-sm font-medium">2,847 online</span>
                        </div>
                     </div>

                     <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-lg">
                        <div className="flex items-center">
                           <Heart className="mr-2 h-5 w-5 text-red-500" />
                           <span className="text-sm font-medium">98% Happy Rate</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Interactive Map Section */}
         <section className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="mb-16 text-center">
                  <h2 className="mb-4 text-4xl font-bold text-gray-900">
                     Active Travelers
                     <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {" "}
                        Right Now
                     </span>
                  </h2>
                  <p className="text-xl text-gray-600">
                     See who's exploring around the world and join their adventures
                  </p>
               </div>

               <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
                  <div className="p-8">
                     <div className="h-100 overflow-hidden rounded-2xl">
                        <CurrentLocationMap
                           lat={user?.currentLocation?.lat}
                           lng={user?.currentLocation?.lng}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Enhanced Features Section */}
         <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="mb-16 text-center">
                  <h2 className="mb-4 text-4xl font-bold text-gray-900">Why Choose TravelBuddy?</h2>
                  <p className="mx-auto max-w-3xl text-xl text-gray-600">
                     Everything you need to connect with fellow travelers and create unforgettable
                     experiences
                  </p>
               </div>

               <div className="grid gap-8 md:grid-cols-3">
                  {features.map((feature, index) => (
                     <div
                        key={index}
                        className={`group relative transform cursor-pointer rounded-3xl p-8 transition-all duration-500 hover:scale-105 ${
                           activeFeature === index
                              ? "bg-gradient-to-br " + feature.color + " text-white shadow-2xl"
                              : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        onMouseEnter={() => setActiveFeature(index)}
                     >
                        <div
                           className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
                              activeFeature === index
                                 ? "bg-white/20 text-white"
                                 : "bg-gradient-to-br " + feature.color + " text-white"
                           }`}
                        >
                           {feature.icon}
                        </div>

                        <h3 className="mb-4 text-2xl font-bold">{feature.title}</h3>
                        <p
                           className={`text-lg leading-relaxed ${
                              activeFeature === index ? "text-white/90" : "text-gray-600"
                           }`}
                        >
                           {feature.description}
                        </p>

                        <div
                           className={`absolute top-4 right-4 h-2 w-2 rounded-full transition-all duration-300 ${
                              activeFeature === index ? "bg-white/50" : "bg-transparent"
                           }`}
                        ></div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Testimonials Section */}
         <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               <div className="mb-16 text-center">
                  <h2 className="mb-4 text-4xl font-bold text-gray-900">
                     Loved by Travelers Worldwide
                  </h2>
                  <p className="text-xl text-gray-600">Real stories from our amazing community</p>
               </div>

               <div className="grid gap-8 md:grid-cols-3">
                  {testimonials.map((testimonial, index) => (
                     <div
                        key={index}
                        className="rounded-3xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                     >
                        <div className="mb-6 flex items-center">
                           <div className="mr-4 text-3xl">{testimonial.avatar}</div>
                           <div>
                              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                              <p className="text-sm text-gray-600">{testimonial.location}</p>
                           </div>
                        </div>
                        <p className="mb-4 leading-relaxed text-gray-700">"{testimonial.text}"</p>
                        <div className="flex text-yellow-400">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Enhanced Call to Action */}
         <section className="relative overflow-hidden bg-gray-900 py-20 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
               <h2 className="mb-6 text-5xl font-bold">Ready to Start Your Adventure?</h2>
               <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
                  Join thousands of travelers exploring the world together. Your next great
                  adventure is just a click away.
               </p>

               <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <button className="group flex transform items-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-pink-600 hover:shadow-lg">
                     Join TravelBuddy Free
                     <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
               </div>

               <div className="flex items-center justify-center text-sm text-gray-400">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Free forever • No credit card required • Join in 30 seconds</span>
               </div>
            </div>
         </section>
      </div>
   );
}

export default HomePage;
