"use client"
import { useEffect, useState } from "react"
import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { loginUser, storeAuthData } from "@/utils/api"

const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  useEffect(() => {
    // Check if redirected from signup
    if (searchParams.get("registered") === "true") {
      setShowSuccess(true)
      // Remove query parameter from URL
      router.replace("/login")
      // Hide success message after 5 seconds
      const timer = setTimeout(() => setShowSuccess(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Call backend API
      const authResponse = await loginUser({ email, password })

      // Store auth data
      storeAuthData(authResponse)

      // Redirect based on user role
      const role = authResponse.user.role.toLowerCase()
      if (role === "graduate") {
        router.push("/graduate")
      } else if (role === "sponsor") {
        router.push("/sponsor")
      } else {
        router.push("/user")
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password")
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google")
  }

  const handleSignUpClick = () => {
    try {
      localStorage.removeItem("isLoggedIn")
    } catch {}
    router.push("/signup")
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
        {/* Left Side */}
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
            <h1 className="text-[#00C896] text-2xl font-bold mb-8 text-center">Welcome Back!</h1>

            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  Account created successfully! Please log in to continue.
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

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

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#00C896] text-white hover:bg-[#00b68f] font-bold rounded-lg h-12 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <button type="button" className="text-sm text-black hover:text-gray-700 transition-colors">
                  Forgot password?
                </button>
              </div>

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

              {/* Sign Up Link */}
              <div className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleSignUpClick}
                  className="text-[#00C896] hover:text-[#00b68f] font-medium underline"
                >
                  Sign Up
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

export default Login
