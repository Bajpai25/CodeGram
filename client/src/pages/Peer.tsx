"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import MainHeading from "../components/MainHeading"
import axios from "axios"
import { User, Briefcase, GraduationCap, Award, LinkIcon, ArrowLeft, Sparkles } from "lucide-react"

interface Peer {
  _id: string
  name: string
  linkedInLink: string
  education: string
  skills: string[]
  achievements: string
  batch: string
  company: string
  createdAt: string
  updatedAt: string
  __v: number
}

const Peer = ({
  token,
  user_id,
}: {
  token: string | null
  user_id: string | null
}) => {
  const { id } = useParams()
  const isLoggedIn = Boolean(user_id)

  const [peer, setPeer] = useState<Peer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPeerDetail() {
      setLoading(true)
      try {
        const res = await axios(`http://localhost:5001/api/peers/${id}`)
        if (res.status === 200) {
          setPeer(res.data)
        }
      } catch (error) {
        console.error("Error fetching peer details:", error)
        setError("Failed to load peer details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
      fetchPeerDetail()
    
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <MainHeading
          data={{
            status: "not-loggedin",
          }}
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
            Access Restricted
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Please log in or sign up to view peer profiles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 font-semibold text-white border border-orange-500/50 rounded-lg hover:bg-orange-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-red-500/30 to-red-800/30 opacity-70 z-10 animate-pulse"></div>
        <div className="circle-2-animation absolute top-[8%] left-[45%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-orange-400/30 to-orange-600/30 opacity-70 z-10 animate-pulse"></div>
        <div className="circle-3-animation absolute top-[10%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[120px] bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 opacity-70 z-10 animate-pulse"></div>
      </div>

      <MainHeading
        data={{
          status: "loggedin",
        }}
      />

      <div className="relative z-20 container mx-auto px-4 py-16">
        <Link
          to="/explore"
          className="inline-flex items-center text-orange-400 hover:text-orange-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Link>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-red-500/30">
            <h3 className="text-xl font-semibold text-red-400 mb-2">{error}</h3>
            <Link to="/explore" className="text-orange-400 hover:text-orange-300 inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Explore
            </Link>
          </div>
        ) : peer ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl md:text-5xl text-white font-bold">{peer.name.charAt(0)}</span>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                    {peer.name}
                  </h1>

                  <div className="flex items-center gap-2 text-gray-300 mb-6">
                    <Briefcase className="w-5 h-5 text-orange-500" />
                    <span>{peer.company || "No company specified"}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Education</div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-orange-500" />
                        <span>{peer.education || "Not specified"}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm text-gray-400">Batch</div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-orange-500" />
                        <span>{peer.batch || "Not specified"}</span>
                      </div>
                    </div>
                  </div>

                  {peer.linkedInLink && (
                    <a
                      href={peer.linkedInLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mb-8"
                    >
                      <LinkIcon className="w-5 h-5" />
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                    Skills
                  </span>
                </h2>

                <div className="flex flex-wrap gap-2 mb-8">
                  {peer.skills && peer.skills.length > 0 ? (
                    peer.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full text-orange-300 text-sm border border-orange-500/30"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No skills listed</span>
                  )}
                </div>

                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                    Achievements
                  </span>
                </h2>

                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                  {peer.achievements ? (
                    <p className="text-gray-300 whitespace-pre-line">{peer.achievements}</p>
                  ) : (
                    <p className="text-gray-500">No achievements listed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold text-gray-400">Peer not found</h3>
            <p className="text-gray-500 mt-2 mb-6">The peer you're looking for doesn't exist or has been removed</p>
            <Link
              to="/explore"
              className="inline-flex items-center px-6 py-3 font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
            >
              Back to Explore
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Peer
