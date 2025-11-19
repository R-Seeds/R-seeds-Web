"use client"
import { useEffect, useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const usersRaw = localStorage.getItem("users")
      const users = usersRaw ? JSON.parse(usersRaw) : {}
      const record = users[email]
      if (!record || record.password !== password) {
        alert("Invalid email or password")
        return
      }
      localStorage.setItem("userType", record.userType)
      localStorage.setItem("isLoggedIn", "true")
      const type = (record.userType || "user").toLowerCase()
      if (type === "graduate") window.location.href = "/graduate"
      else if (type === "sponsor") window.location.href = "/sponsor"
      else window.location.href = "/user"
    } catch {
      alert("Unable to sign in right now. Please try again.")
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
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white md:flex-row">
      {/* Left Side */}
      <div 
        className="relative hidden md:flex md:w-[60%] lg:w-[58%] xl:w-[55%] h-72 md:h-auto lg:h-screen overflow-hidden bg-[#00b68f] items-center justify-center"
        style={{
          backgroundImage: "url('/login.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 " />
        <div
          className={`relative z-10 flex h-full w-full items-center justify-between px-6 md:px-8 lg:px-10 transition-all duration-700 ease-out "
          `}
        >
          <div className="text-white">
            
          </div>
          <div className="flex flex-col gap-3 px-6 py-4 rounded-[32px] translate-x-6 w-44 items-stretch">
            <button className="rounded-full bg-white text-[#00b68f] font-semibold py-2 text-base shadow-md">
              Sign In
            </button>
            <button
              onClick={handleSignUpClick}
              className="rounded-full border border-white/70 text-white font-semibold py-2 text-base hover:bg-white/10 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        className={`flex w-full md:w-[40%] lg:w-[42%] xl:w-[45%] items-center justify-center bg-white p-6 sm:p-10 md:p-12 transition-all duration-700 ease-out ${
          isMounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
        }`}
      >
        <div className="w-full max-w-md">
          <div
            className={`bg-[#00C896] rounded-2xl p-10 shadow-2xl transition-all duration-700 ease-out ${
              isMounted ? "scale-100" : "scale-95"
            }`}
          >
            <h1 className="text-white text-2xl font-bold mb-8 text-center">Welcome Back!</h1>

            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Input */}
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-2 border-teal-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-400 focus:ring-0 rounded-lg h-12 px-4 outline-none transition-all"
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
                  className="w-full bg-white border-2 border-teal-300 text-gray-900 placeholder:text-gray-500 focus:border-teal-400 focus:ring-0 rounded-lg h-12 px-4 pr-12 outline-none transition-all"
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

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-white text-teal-500 hover:bg-gray-50 font-bold rounded-lg h-12 transition-all duration-200 shadow-lg"
              >
                Sign In
              </button>

              {/* Forgot Password */}
              <div className="text-center">
                <button type="button" className="text-sm text-white hover:text-white/80 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-[#00C896] hover:bg-teal-700 text-white font-medium rounded-lg h-12 flex items-center justify-center transition-all duration-200 shadow-lg"
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

export default Login
