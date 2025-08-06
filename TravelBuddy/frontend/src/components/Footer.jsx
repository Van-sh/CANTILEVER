import {
   ArrowRight,
   Calendar,
   Compass,
   Facebook,
   Globe,
   Heart,
   HelpCircle,
   Instagram,
   Mail,
   MapPin,
   MessageCircle,
   Phone,
   Plane,
   Shield,
   Star,
   Twitter,
   Users,
   Youtube,
} from "lucide-react";
import { useState } from "react";

function Footer() {
   const [email, setEmail] = useState("");

   const handleNewsletterSubmit = () => {
      if (email.trim()) {
         console.log("Newsletter signup:", email);
         setEmail("");
         // Add newsletter signup logic here
      }
   };

   const handleNavigation = (path) => {
      console.log(`Navigating to: ${path}`);
      // Add navigation logic here
   };

   const quickLinks = [
      { name: "Discover", path: "/", icon: Compass },
      { name: "Map", path: "/map", icon: MapPin },
      { name: "Activities", path: "/activities", icon: Calendar },
      { name: "Connections", path: "/connections", icon: Users },
      { name: "Messages", path: "/messages", icon: MessageCircle },
   ];

   const supportLinks = [
      { name: "Help Center", path: "/help", icon: HelpCircle },
      { name: "Safety Tips", path: "/safety", icon: Shield },
      { name: "How it Works", path: "/how-it-works", icon: Star },
      { name: "Contact Us", path: "/contact", icon: Mail },
   ];

   const legalLinks = [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Community Guidelines", path: "/guidelines" },
   ];

   const socialLinks = [
      { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
      { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
      { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
      { name: "YouTube", icon: Youtube, url: "https://youtube.com" },
   ];

   const popularDestinations = [
      "Tokyo, Japan",
      "Paris, France",
      "Bali, Indonesia",
      "New York, USA",
      "London, UK",
      "Barcelona, Spain",
   ];

   return (
      <footer className="mt-auto border-t border-gray-200 bg-gray-50">
         {/* Main Footer Content */}
         <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
               {/* Brand Section */}
               <div className="lg:col-span-1">
                  <div className="mb-4 flex items-center space-x-2">
                     <div className="rounded-lg bg-amber-600 p-2">
                        <Globe className="text-white" size={24} />
                     </div>
                     <div>
                        <span className="text-xl font-bold text-amber-600">TravelBuddy</span>
                        <div className="-mt-1 text-xs text-gray-500">Find your travel buddy</div>
                     </div>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">
                     Connect with fellow travelers, discover amazing destinations, and create
                     unforgettable memories together. Your next adventure is just a connection away.
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                     {socialLinks.map((social) => (
                        <a
                           key={social.name}
                           href={social.url}
                           className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition-all duration-200 hover:border-amber-300 hover:text-amber-600 hover:shadow-md"
                           aria-label={social.name}
                        >
                           <social.icon size={18} />
                        </a>
                     ))}
                  </div>
               </div>

               {/* Quick Links */}
               <div>
                  <h3 className="mb-4 flex items-center font-semibold text-gray-900">
                     <Compass size={16} className="mr-2 text-amber-600" />
                     Explore
                  </h3>
                  <ul className="space-y-3">
                     {quickLinks.map((link) => (
                        <li key={link.name}>
                           <button
                              onClick={() => handleNavigation(link.path)}
                              className="group flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-amber-600"
                           >
                              <link.icon
                                 size={14}
                                 className="mr-2 opacity-60 group-hover:opacity-100"
                              />
                              {link.name}
                           </button>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Support */}
               <div>
                  <h3 className="mb-4 flex items-center font-semibold text-gray-900">
                     <HelpCircle size={16} className="mr-2 text-amber-600" />
                     Support
                  </h3>
                  <ul className="space-y-3">
                     {supportLinks.map((link) => (
                        <li key={link.name}>
                           <button
                              onClick={() => handleNavigation(link.path)}
                              className="group flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-amber-600"
                           >
                              <link.icon
                                 size={14}
                                 className="mr-2 opacity-60 group-hover:opacity-100"
                              />
                              {link.name}
                           </button>
                        </li>
                     ))}
                  </ul>

                  {/* Contact Info */}
                  <div className="mt-6 space-y-2">
                     <div className="flex items-center text-sm text-gray-600">
                        <Mail size={14} className="mr-2 text-amber-600" />
                        hello@travelbuddy.com
                     </div>
                     <div className="flex items-center text-sm text-gray-600">
                        <Phone size={14} className="mr-2 text-amber-600" />
                        +1 (555) 123-4567
                     </div>
                  </div>
               </div>

               {/* Newsletter & Popular Destinations */}
               <div>
                  <h3 className="mb-4 flex items-center font-semibold text-gray-900">
                     <Mail size={16} className="mr-2 text-amber-600" />
                     Stay Updated
                  </h3>

                  {/* Newsletter Signup */}
                  <div className="mb-6">
                     <p className="mb-3 text-sm text-gray-600">
                        Get travel tips and discover new destinations
                     </p>
                     <div className="flex">
                        <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Your email"
                           className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                        <button
                           onClick={handleNewsletterSubmit}
                           className="flex items-center rounded-r-lg bg-amber-600 px-4 py-2 text-white transition-all duration-200 hover:bg-amber-700"
                        >
                           <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>

                  {/* Popular Destinations */}
                  <div>
                     <h4 className="mb-3 flex items-center text-sm font-medium text-gray-900">
                        <Plane size={14} className="mr-2 text-amber-600" />
                        Popular Destinations
                     </h4>
                     <ul className="space-y-2">
                        {popularDestinations.map((destination) => (
                           <li key={destination}>
                              <button
                                 onClick={() =>
                                    handleNavigation(
                                       `/destination/${destination.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                                    )
                                 }
                                 className="block text-xs text-gray-600 transition-colors duration-200 hover:text-amber-600 hover:underline"
                              >
                                 {destination}
                              </button>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
               <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-y-0">
                  {/* Copyright */}
                  <div className="flex items-center text-sm text-gray-600">
                     <span>© 2025 TravelBuddy. Made with</span>
                     <Heart size={14} className="mx-1 fill-current text-red-500" />
                     <span>for travelers worldwide</span>
                  </div>

                  {/* Legal Links */}
                  <div className="flex flex-wrap justify-center space-x-6 lg:justify-end">
                     {legalLinks.map((link) => (
                        <button
                           key={link.name}
                           onClick={() => handleNavigation(link.path)}
                           className="text-sm text-gray-600 transition-colors duration-200 hover:text-amber-600"
                        >
                           {link.name}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
