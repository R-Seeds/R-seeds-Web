"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { Eye, EyeOff, GraduationCap, DollarSign, Users } from "lucide-react"

interface SignupProps {
  onBackToLogin: () => void
}

const Signup = ({ onBackToLogin }: SignupProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [graduationYear, setGraduationYear] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("user")
  
  

  
  
  useEffect(() => {
    
    if (pathname && pathname !== "/") return
    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      const type = (localStorage.getItem("userType") || "user").toLowerCase()
      if (isLoggedIn) {
        if (type === "graduate") router.replace("/graduate")
        else if (type === "sponsor") router.replace("/sponsor")
        else router.replace("/user")
      }
    } catch {}
  }, [router, pathname, onBackToLogin])

  
  if (pathname && pathname !== "/") {
    return null
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const usersRaw = localStorage.getItem("users")
      const users = usersRaw ? JSON.parse(usersRaw) : {}
      users[email] = { password, userType, fullName, graduationYear }
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem("userType", userType)
    } catch {}
    onBackToLogin()
  }

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google")
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 2xl:-mx-48">
      {/* Left Side  */}
      <div 
        className="w-full md:w-[60%] relative h-screen overflow-hidden"
        style={{
          backgroundImage: "url('/login.png')",
          backgroundSize: "70% 100%",
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex h-full">
        
          <div className="flex-1 flex items-center justify-end pr-96">
            <div className="flex flex-col items-end">
              <button 
                onClick={onBackToLogin}
                className="text-white hover:text-white/80 font-bold text-base transition-colors mb-3 mr-20"
              >
                Sign In
              </button>
              <button className="bg-white text-teal-600 hover:bg-white/90 font-bold px-8 py-3 rounded-xl shadow-lg text-base transition-all duration-200 w-48 mr-2">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex w-[40%] items-center justify-center bg-white p-12">
        <div className="w-full max-w-md">
          <div className="bg-[#00C896] rounded-2xl p-10 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-white text-2xl font-bold mb-2">Join R-seeds</h1>
              <p className="text-white text-sm">Empower Innovation from RCA Graduates</p>
            </div>

            {/* User Type Selection */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-white/20 rounded-lg p-1">
                <button 
                  onClick={() => setUserType("graduate")}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                    userType === "graduate" 
                      ? "bg-white text-black" 
                      : "text-white"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Graduate
                </button>
                <button 
                  onClick={() => setUserType("sponsor")}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                    userType === "sponsor" 
                      ? "bg-white text-black" 
                      : "text-white"
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  Sponsor
                </button>
                <button 
                  onClick={() => setUserType("user")}
                  className={`px-4 py-2 text-sm rounded-md font-medium flex items-center gap-2 ${
                    userType === "user" 
                      ? "bg-white text-black" 
                      : "text-white"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  User
                </button>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-teal-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-400 focus:ring-0 rounded-lg h-12 px-4 outline-none transition-all"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-teal-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-400 focus:ring-0 rounded-lg h-12 px-4 outline-none transition-all"
                  required
                />
              </div>

              {/* Graduation Year Input */}
              <div>
                <input
                  id="graduationYear"
                  type="text"
                  placeholder="Graduation Year"
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="w-full bg-white border border-teal-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-400 focus:ring-0 rounded-lg h-12 px-4 outline-none transition-all"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-teal-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-400 focus:ring-0 rounded-lg h-12 px-4 pr-12 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Sign up Button */}
              <button
                type="submit"
                className="w-full bg-white text-teal-500 hover:bg-gray-50 font-bold rounded-lg h-12 transition-all duration-200 shadow-lg"
              >
                Sign up as {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </button>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white text-gray-700 hover:bg-gray-50 font-medium rounded-lg h-12 flex items-center justify-center transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup