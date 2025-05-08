"use client"

import MainHeading from "../components/MainHeading"
import { TypeAnimation } from "react-type-animation"
import { Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios, { type AxiosError } from "axios"
import { API_URL } from "../App"
import Loading from "../components/Loading"
import { Sparkles, MessageSquare, Laptop, Brain } from 'lucide-react'

const LandingPage = ({
  token,
  id,
}: {
  token: string | null
  id: string | null
}) => {
  const [username, setUsername] = useState<string>("")
  const [verified, setVerified] = useState<boolean>(false)
  const [verifiedCertain, setVerifiedCertain] = useState<boolean>(false)

  useEffect(() => {
    if (!id) {
      setVerified(false)
      setVerifiedCertain(true)
      return
    }

    axios
      .get(`${API_URL}/api/accounts/id/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setUsername(data.username)
        setVerified(true)
        setVerifiedCertain(true)
      })
      .catch((e: AxiosError) => {
        setVerified(false)
        setVerifiedCertain(true)
      })
  }, [id, token])

  return (
    <div className="text-[14px] overflow-x-hidden min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Header Section */}
      {verifiedCertain && verified ? (
        <MainHeading
          data={{
            username: username,
            status: "loggedin",
          }}
        />
      ) : verifiedCertain === true && verified === false ? (
        <MainHeading
          data={{
            status: "not-loggedin",
          }}
        />
      ) : (
        <MainHeading
          data={{
            status: "none",
          }}
        />
      )}

      {/* Hero Section with Animated Background */}
      <div className="relative w-full overflow-hidden min-h-screen">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-red-500/30 to-red-800/30 opacity-70 z-10 animate-pulse"></div>
          <div className="circle-2-animation absolute top-[8%] left-[45%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-orange-400/30 to-orange-600/30 opacity-70 z-10 animate-pulse"></div>
          <div className="circle-3-animation absolute top-[10%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[120px] bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 opacity-70 z-10 animate-pulse"></div>
        </div>

        {/* Main Content */}
        {verifiedCertain && verified ? (
          <div className="relative z-20 pt-[100px] px-4">
            <h1 className="text-6xl md:text-6xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
              <TypeAnimation
                sequence={[`Welcome back ${username}!`, 2000, `Ready for more challenges?`, 2000, "Let's dive in!"]}
                wrapper="span"
                cursor={true}
                style={{
                  fontSize: "1.5em",
                  display: "inline-block",
                }}
              />
            </h1>
            <p className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto text-center leading-relaxed">
              Ready to conquer complex challenges? Explore our Problem List now!
            </p>
            <div className="mt-12 text-center">
              <Link
                to="/problemset"
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Problem List
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Alumni Companies Carousel Heading */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-semibold text-gray-300 mb-8">Our Alumni Work At</h3>
            </div>
          </div>
        ) : verifiedCertain === true && verified === false ? (
          <div className="relative z-20 pt-[1px] px-4">
            <h1 className="text-5xl md:text-6xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
              <TypeAnimation
                sequence={["Learn", 2000, "Solve", 2000, "Explore", 2000, "Prepare", 2000, "Start Now!", 5000]}
                wrapper="span"
                cursor={true}
                repeat={Number.POSITIVE_INFINITY}
                style={{
                  fontSize: "1em",
                  display: "inline-block",
                }}
              />
            </h1>
            <p className="mt-8 text-xl text-gray-300 max-w-2xl mx-auto text-center leading-relaxed">
              Reach the pinnacle of your coding potential with Codegram. Elevate your skills, conquer challenges, and
              excel in technical interviews.
            </p>
            <div className="mt-6 text-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Alumni Companies Carousel Heading */}
            <div className="mt-10 text-center">
              <h3 className="text-2xl font-semibold text-gray-300 mb-8">Our Alumni Work At</h3>
            </div>
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[120]">
            <Loading />
          </div>
        )}
      </div>
      {/* Full-width Alumni Companies Carousel */}
      <CompanyCarousel />

      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-8 text-orange-500" />
          <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-800">
            Master Coding Through Interactive Learning!
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Experience a revolutionary platform that combines collaborative coding, real-time communication, and
            intelligent progress tracking.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-20 py-20 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
            Why Choose Codegram?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Learning Path</h3>
              <p className="text-gray-400">
                Personalized learning experience that adapts to your skill level and learning pace.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Real-world Problems</h3>
              <p className="text-gray-400">
                Practice with challenges inspired by actual technical interviews and industry scenarios.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Community Driven</h3>
              <p className="text-gray-400">
                Learn and grow with a community of developers sharing solutions and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-20 py-20 bg-gradient-to-b from-black/50 to-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-gray-400">Coding Challenges</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">50K+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-white/5 rounded-3xl transform -skew-y-6"></div>
          <div className="relative bg-zinc-900 rounded-3xl p-8 border border-zinc-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Experience Modern Coding Education</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Laptop className="w-6 h-6 text-orange-500" />
                    <p className="text-white/70">Advanced IDE with real-time compilation</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-orange-500" />
                    <p className="text-white/70">Integrated communication tools</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-orange-500" />
                    <p className="text-white/70">AI-powered learning assistance</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800"
                  alt="Coding Interface"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="relative z-20 py-20 bg-black/50 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
            Ready to Begin Your Coding Journey?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of developers who have already leveled up their coding skills with Codegram.
          </p>
          {verifiedCertain && verified ? (
            <Link
              to="/problemset"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Coding Now!
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : verifiedCertain === true && verified === false ? (
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Coding Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : null}
        </div>
      </section>
    </div>
  )
}

// Company Carousel Component
const CompanyCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollCarousel = () => {
      if (carouselRef.current) {
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollLeft += 1;
        }
      }
    };
    
    const intervalId = setInterval(scrollCarousel, 20);
    return () => clearInterval(intervalId);
  }, []);
  
  // Company logos with their SVGs - keeping the original ones
  const companies = [
    {
      name: "Amazon",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-full h-full" fill="currentColor">
          <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 6.5 18 19 18 37.5v31.8c0 9.7-6 11.5-12.5 11.5-10.7 0-170.5-12.5-170.5-191.5s172.2-192 223-192c50.7 0 71.5 22.5 71.5 45.2 0 19.2-15.5 30-35.5 30-10 0-17.5-5-17.5-12.5 0-27.5-70.7-35.2-90.5-35.2zm-63.7 136.5c0-32.2 20.5-49.5 49.5-49.5 27.8 0 48.5 15.8 48.5 49.5s-20.7 49.5-48.5 49.5c-29 0-49.5-17.2-49.5-49.5z"/>
        </svg>
      )
    },
    {
      name: "Google",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="w-full h-full" fill="currentColor">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
      )
    },
    {
      name: "Flipkart",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
          <path d="M9.82 11.93h.01c.18 0 .33.15.33.33v1.4c0 .18-.15.33-.33.33h-.01c-.18 0-.33-.15-.33-.33v-1.4c0-.18.15-.33.33-.33zm4.33 0h.01c.18 0 .33.15.33.33v1.4c0 .18-.15.33-.33.33h-.01c-.18 0-.33-.15-.33-.33v-1.4c0-.18.15-.33.33-.33zm-8.64-2.5c-.18 0-.33.15-.33.33v4.17c0 .18.15.33.33.33h.01c.18 0 .33-.15.33-.33V9.76c0-.18-.15-.33-.33-.33h-.01zm13.15 0c-.18 0-.33.15-.33.33v4.17c0 .18.15.33.33.33h.01c.18 0 .33-.15.33-.33V9.76c0-.18-.15-.33-.33-.33h-.01zM7.84 9.43h-.01c-.18 0-.33.15-.33.33v1.4c0 .18.15.33.33.33h.01c.18 0 .33-.15.33-.33v-1.4c0-.18-.15-.33-.33-.33zm8.33 0h-.01c-.18 0-.33.15-.33.33v1.4c0 .18.15.33.33.33h.01c.18 0 .33-.15.33-.33v-1.4c0-.18-.15-.33-.33-.33z"/>
        </svg>
      )
    },
    {
      name: "TCS",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3-5h6v2H9v-2zm0-4h6v2H9v-2zm0-4h6v2H9V7z"/>
        </svg>
      )
    },
    {
      name: "Wipro",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z"/>
        </svg>
      )
    },
    {
      name: "Capgemini",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
        </svg>
      )
    }
  ];
  
  // Duplicate companies for seamless looping
  const allCompanies = [...companies, ...companies];
  
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900/80 to-black/80 py-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"></div>
      
      {/* Gradient overlay on left */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-black to-transparent"></div>
      
      {/* Gradient overlay on right */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-black to-transparent"></div>
      
      {/* Carousel container */}
      <div 
        ref={carouselRef}
        className="flex overflow-x-scroll scrollbar-hide py-8 w-full"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="flex space-x-20 pl-32 pr-32">
          {allCompanies.map((company, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center min-w-[120px]"
            >
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300 p-3 flex items-center justify-center text-orange-500 hover:text-orange-400">
                {company.svg}
              </div>
              <span className="mt-3 text-gray-400 text-sm">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage
