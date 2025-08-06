import { Key, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { register } from "../../redux/slices/userAuthSlice";

function UserRegister() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
   });

   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));

      if (errors[id]) {
         setErrors((prev) => ({ ...prev, [id]: "" }));
      }
   };

   const validateForm = () => {
      const newErrors = {};

      // Validate name
      if (!formData.name.trim()) {
         newErrors.name = "Name is required";
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
         newErrors.email = "Please provide a valid email";
      }

      // Validate mobile number
      const mobileRegex = /^[0-9]{10}$/;
      if (!formData.mobile || !mobileRegex.test(formData.mobile)) {
         newErrors.mobile = "Please provide a valid 10-digit mobile number";
      }

      // Validate password
      if (formData.password.length < 6) {
         newErrors.password = "Password must be at least 6 characters long";
      }

      // Validate confirm password
      if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      setLoading(true);

      try {
         const registerResult = await dispatch(
            register({
               fullName: formData.name,
               email: formData.email,
               mobile: formData.mobile,
               password: formData.password,
            }),
         );

         if (register.fulfilled.match(registerResult)) {
            toast.success("Registration successful! Now you can login");
            navigate("/login");
         } else {
            const errorMessage =
               registerResult.payload?.message ||
               "Failed to create user account. Please try again.";
            setErrors({ general: errorMessage });
         }
      } catch (error) {
         console.error("Registration error:", error);
         setErrors({ general: "Registration failed. Please try again." });
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
         <div className="w-full max-w-md space-y-8">
            <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-8 shadow-lg drop-shadow-xl transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
               <div className="absolute -top-10 -right-10 z-[-1] h-40 w-40 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>
               <div className="absolute -top-10 -left-10 z-[-1] h-40 w-40 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>
               <div className="absolute -bottom-10 -left-10 z-[-1] h-28 w-28 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>
               <div className="absolute -right-10 -bottom-10 z-[-1] h-28 w-28 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>

               <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-700">Join Our Community</h2>
                  <h2 className="text-3xl font-bold text-amber-600">TravelBuddy</h2>
                  <p className="mt-2 mb-6 text-gray-600">Sign up to start your journey</p>
               </div>

               {errors.general && (
                  <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
                     <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
               )}

               <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div>
                     <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                        Full Name
                     </label>
                     <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                           <User className="h-5 w-5 text-amber-600" />
                        </div>
                        <input
                           id="name"
                           type="text"
                           value={formData.name}
                           onChange={handleChange}
                           className={`block w-full border px-3 py-2 pl-10 ${
                              errors.name ? "border-red-500" : "border-gray-300"
                           } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                           placeholder="Enter your full name"
                        />
                     </div>
                     {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div>
                     <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                     >
                        Email Address
                     </label>
                     <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                           <Mail className="h-5 w-5 text-amber-600" />
                        </div>
                        <input
                           id="email"
                           type="email"
                           value={formData.email}
                           onChange={handleChange}
                           className={`block w-full border px-3 py-2 pl-10 ${
                              errors.email ? "border-red-500" : "border-gray-300"
                           } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                           placeholder="Enter your email"
                        />
                     </div>
                     {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Mobile Field */}
                  <div>
                     <label
                        htmlFor="mobile"
                        className="mb-1 block text-sm font-medium text-gray-700"
                     >
                        Mobile Number
                     </label>
                     <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                           <Phone className="h-5 w-5 text-amber-600" />
                        </div>
                        <input
                           id="mobile"
                           type="tel"
                           value={formData.mobile}
                           onChange={handleChange}
                           className={`block w-full border px-3 py-2 pl-10 ${
                              errors.mobile ? "border-red-500" : "border-gray-300"
                           } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                           placeholder="Enter your mobile number"
                           maxLength="10"
                        />
                     </div>
                     {errors.mobile && <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>}
                  </div>

                  {/* Password Field */}
                  <div>
                     <label
                        htmlFor="password"
                        className="mb-1 block text-sm font-medium text-gray-700"
                     >
                        Password
                     </label>
                     <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                           <Key className="h-5 w-5 text-amber-600" />
                        </div>
                        <input
                           id="password"
                           type="password"
                           value={formData.password}
                           onChange={handleChange}
                           className={`block w-full border px-3 py-2 pl-10 ${
                              errors.password ? "border-red-500" : "border-gray-300"
                           } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                           placeholder="Create a password"
                        />
                     </div>
                     {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                     )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                     <label
                        htmlFor="confirmPassword"
                        className="mb-1 block text-sm font-medium text-gray-700"
                     >
                        Confirm Password
                     </label>
                     <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                           <Key className="h-5 w-5 text-amber-600" />
                        </div>
                        <input
                           id="confirmPassword"
                           type="password"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           className={`block w-full border px-3 py-2 pl-10 ${
                              errors.confirmPassword ? "border-red-500" : "border-gray-300"
                           } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                           placeholder="Confirm your password"
                        />
                     </div>
                     {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                     )}
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className={`w-full rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white shadow-sm ${
                        loading ? "bg-amber-400" : "bg-amber-600 hover:bg-amber-700"
                     } focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none`}
                  >
                     {loading ? "Creating Account..." : "Create Account"}
                  </button>
               </form>

               <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-amber-600 hover:text-blue-500">
                     Sign in here
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}

export default UserRegister;
