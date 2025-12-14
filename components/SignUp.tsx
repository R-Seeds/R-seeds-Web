"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { Eye, EyeOff, GraduationCap, DollarSign, Users } from "lucide-react"
import { registerUser } from "@/utils/api"

interface SignupProps {
  onBackToLogin?: () => void
}

const Signup = ({ onBackToLogin }: SignupProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [graduationYear, setGraduationYear] = useState("")
  const [password, setPassword] = useState("")
  const [organization, setOrganization] = useState("")
  const [country, setCountry] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "graduate" | "sponsor">("user")
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin()
    } else {
      router.push("/login")
    }
  }

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
  }, [router, pathname])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Prepare request based on user type
      const registerRequest: any = {
        name: fullName,
        email: email,
        password: password,
        role: userType.toUpperCase() as "USER" | "GRADUATE" | "SPONSOR",
      }

      // Add role-specific fields
      if (userType === "graduate") {
        if (!graduationYear) {
          setError("Graduation year is required for graduates")
          setIsLoading(false)
          return
        }
        registerRequest.finishYear = parseInt(graduationYear)
      } else if (userType === "sponsor") {
        if (!organization) {
          setError("Organization is required for sponsors")
          setIsLoading(false)
          return
        }
        registerRequest.organization = organization
      } else if (userType === "user") {
        if (!country) {
          setError("Country is required for users")
          setIsLoading(false)
          return
        }
        registerRequest.country = country
      }

      // Call backend API
      await registerUser(registerRequest)

      // Redirect to login page after successful registration
      router.push("/login?registered=true")
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google")
  }

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        @keyframes fadeInFloat {
          0% {
            opacity: 0;
            transform: translateX(-30px) translateY(0px) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateX(0) translateY(-20px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0px) scale(1);
          }
        }
        .animate-image {
          animation: fadeInFloat 1s ease-out forwards, float 6s ease-in-out 1s infinite;
        }
      `}</style>
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-white md:flex-row">
        {/* Left Side  */}
        <div
          className="relative hidden md:flex md:w-[60%] lg:w-[58%] xl:w-[55%] h-72 md:h-auto lg:h-screen overflow-hidden bg-white animate-image"
          style={{
            backgroundImage: "url('/Login security.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
        </div>

      {/* Right Side */}
      <div
        className={`flex w-full md:w-[40%] lg:w-[42%] xl:w-[45%] items-center justify-center bg-white p-6 sm:p-10 md:p-12 transition-all duration-700 ease-out ${
          isMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
        }`}
      >
        <div className="w-full max-w-md">
          <div
            className={`border border-gray-300 rounded-lg p-8 transition-all duration-700 ease-out ${
              isMounted ? "scale-100" : "scale-95"
            }`}
          >
            <div className="text-center mb-8">
              <h1 className="text-[#00C896] text-2xl font-bold mb-2">
                Join <span style={{ fontFamily: 'Akronim, cursive' }}>R</span>-seeds
              </h1>
              <p className="text-gray-600 text-sm">Empower Innovation from RCA Graduates</p>
            </div>

            {/* User Type Selection */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => {
                    setUserType("graduate")
                    setOrganization("")
                    setCountry("")
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                    userType === "graduate" ? "bg-[#00C896] text-white" : "text-black"
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Graduate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserType("sponsor")
                    setGraduationYear("")
                    setCountry("")
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                    userType === "sponsor" ? "bg-[#00C896] text-white" : "text-black"
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  Sponsor
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserType("user")
                    setGraduationYear("")
                    setOrganization("")
                  }}
                  className={`px-4 py-2 text-sm rounded-md font-medium flex items-center gap-2 ${
                    userType === "user" ? "bg-[#00C896] text-white" : "text-black"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  User
                </button>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Full Name Input */}
              <div>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-1 focus:ring-black rounded-lg h-12 px-4 outline-none transition-all"
                  required
                  disabled={isLoading}
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
                  className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-1 focus:ring-black rounded-lg h-12 px-4 outline-none transition-all"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Graduation Year Input - Only for Graduate */}
              {userType === "graduate" && (
                <div>
                  <input
                    id="graduationYear"
                    type="number"
                    placeholder="Graduation Year"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-1 focus:ring-black rounded-lg h-12 px-4 outline-none transition-all"
                    required
                    disabled={isLoading}
                    min="1900"
                    max="2100"
                  />
                </div>
              )}

              {/* Organization Input - Only for Sponsor */}
              {userType === "sponsor" && (
                <div>
                  <input
                    id="organization"
                    type="text"
                    placeholder="Organization Name"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-1 focus:ring-black rounded-lg h-12 px-4 outline-none transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* Country Input - Only for User */}
              {userType === "user" && (
                <div>
                  <input
                    id="country"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-1 focus:ring-black rounded-lg h-12 px-4 outline-none transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* Password Input */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-1 focus:ring-black rounded-lg h-12 px-4 pr-12 outline-none transition-all"
                  required
                  disabled={isLoading}
                  minLength={4}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Sign up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00C896] text-white hover:bg-[#00b68f] font-bold rounded-lg h-12 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : `Sign up as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
              </button>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white border border-gray-300 text-black hover:bg-gray-50 font-medium rounded-lg h-12 flex items-center justify-center transition-all duration-200"
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

              {/* Sign In Link */}
              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-[#00C896] hover:text-[#00b68f] font-medium underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup

