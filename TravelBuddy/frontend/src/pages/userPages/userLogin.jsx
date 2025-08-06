import { KeyRound, Mail } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Login } from "../../redux/slices/userAuthSlice";

function UserLogin() {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState({});
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
         setErrors((prev) => ({ ...prev, [name]: "" }));
      }
      // Clear general error
      if (errors.general) {
         setErrors((prev) => ({ ...prev, general: "" }));
      }
   };

   const validateForm = () => {
      const newErrors = {};

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
         newErrors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
         newErrors.email = "Please provide a valid email";
      }

      // Validate password
      if (!formData.password) {
         newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
         newErrors.password = "Password must be at least 6 characters long";
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
         const loginResult = await dispatch(
            Login({
               email: formData.email,
               password: formData.password,
            }),
         );

         if (Login.fulfilled.match(loginResult)) {
            toast.success("Login successful!");
            navigate("/current-location");
         } else {
            const errorMessage =
               loginResult.payload?.message || "Invalid email or password. Please try again.";
            setErrors({ general: errorMessage });
         }
      } catch (error) {
         console.error("Login error:", error);
         setErrors({ general: "Login failed. Please try again." });
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex min-h-screen items-center justify-center px-4">
         <div className="relative w-full max-w-md overflow-hidden rounded-lg bg-white p-8 shadow-lg drop-shadow-xl transition-shadow duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>
            <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>
            <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full border-2 border-amber-200 bg-amber-100 opacity-50"></div>

            <div className="relative z-10">
               <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold text-amber-600">Travel Buddy</h1>
                  <p className="mt-1 text-sm text-gray-500">Find Your Travel Buddy</p>
               </div>

               <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">Welcome Back</h2>

               {errors.general && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                     <p className="text-center">{errors.general}</p>
                  </div>
               )}

               <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                     <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                     >
                        Email Address
                     </label>
                     <div className="relative">
                        <Mail className="absolute top-3.5 left-3 text-amber-600" size={18} />
                        <input
                           id="email"
                           name="email"
                           type="email"
                           value={formData.email}
                           onChange={handleChange}
                           className={`w-full border py-3 pr-4 pl-10 ${
                              errors.email ? "border-red-500" : "border-gray-200"
                           } rounded-lg transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-amber-500 focus:outline-none`}
                           placeholder="Enter your email"
                        />
                     </div>
                     {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                     <label
                        htmlFor="password"
                        className="mb-1 block text-sm font-medium text-gray-700"
                     >
                        Password
                     </label>
                     <div className="relative">
                        <KeyRound className="absolute top-3.5 left-3 text-amber-600" size={18} />
                        <input
                           id="password"
                           name="password"
                           type="password"
                           value={formData.password}
                           onChange={handleChange}
                           className={`w-full border py-3 pr-4 pl-10 ${
                              errors.password ? "border-red-500" : "border-gray-200"
                           } rounded-lg transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-amber-500 focus:outline-none`}
                           placeholder="Enter your password"
                        />
                     </div>
                     {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                     )}
                  </div>

                  <div className="flex justify-end">
                     <Link
                        to="/user/forgot-password"
                        className="text-sm text-amber-600 transition-colors hover:text-amber-700"
                     >
                        Forgot your password?
                     </Link>
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className={`w-full rounded-lg py-3 font-medium text-white transition-all duration-200 ${
                        loading
                           ? "cursor-not-allowed bg-amber-400"
                           : "bg-amber-600 shadow-md hover:bg-amber-700 hover:shadow-lg"
                     }`}
                  >
                     {loading ? "Logging in..." : "Sign In"}
                  </button>
               </form>

               <p className="mt-8 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                     to="/register"
                     className="font-medium text-amber-600 transition-colors hover:text-amber-700"
                  >
                     Sign up
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}

export default UserLogin;
