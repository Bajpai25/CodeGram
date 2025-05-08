"use client"

import axios, { type AxiosError } from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../App"
import MainHeading from "../components/MainHeading"

interface UserData {
  id: string
  username: string
  email: string
  problems_solved: string[]
  problems_attempted: string[]
  submissions: any[]
}

interface Roadmap {
  _id: string
  goal: string
  monthlyCommitment: string
  months: any[]
  student: string
  successTips: string[]
  timeline: string
  title?: string
  description?: string
  created_by?: string
  __v: number
}

const ActivityChart = ({ submissions }: { submissions: any[] }) => {
  // Generate last 6 months of dates
  const getLastSixMonths = () => {
    const months = []
    const today = new Date()
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
      months.push(month.toLocaleString("default", { month: "short" }))
    }
    return months
  }

  const months = getLastSixMonths()

  // Generate random activity data (replace with real data later)
  const generateActivityData = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 20))
  }

  const activityData = generateActivityData()

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-800 hover:border-orange-500/30 transition-all duration-300 p-6">
      <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
        Activity
      </h2>
      <div className="relative h-64">
        {/* Y-axis */}
        <div className="absolute left-0 h-full flex flex-col justify-between text-[#8a8a8a] text-sm">
          <span>20</span>
          <span>15</span>
          <span>10</span>
          <span>5</span>
          <span>0</span>
        </div>

        {/* Chart */}
        <div className="ml-8 h-full flex items-end">
          {activityData.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-4/5 bg-gradient-to-r from-orange-500 to-red-600 rounded-sm transition-all duration-500"
                style={{ height: `${(value / 20) * 100}%` }}
              ></div>
              <span className="text-[#8a8a8a] text-sm mt-2">{months[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ProfilePage = ({
  token,
  id,
}: {
  token: string | null
  id: string | null
}) => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])

  const userId = localStorage.getItem("id")
  async function get_Roadmaps_by_user_id() {
    try {
      const res = await axios.get(`http://localhost:5001/api/roadmap/user/${userId}`)
      if (res.status === 200) {
        setRoadmaps(res.data)
        console.log("Roadmaps loaded:", res.data)
      }
    } catch (error) {
      console.error("Error fetching roadmaps:", error)
    }
  }

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError("")

      try {
        if (id) {
          const response = await axios.get(`${API_URL}/api/accounts/id/${id}`, {
            headers: { Authorization: token },
          })
          setUserData(response.data)
        }
      } catch (e) {
        const error = e as Error | AxiosError
        console.error("Error fetching profile:", error)
        setError(error.message || "Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    get_Roadmaps_by_user_id() // Call the function to get roadmaps by user ID
  }, [token, id, userId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <MainHeading data={{ status: "none" }} />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        <MainHeading data={{ status: "none" }} />
        <div className="flex items-center justify-center h-[60vh] text-red-500">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-red-500/30">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-red-500/10 to-red-800/10 opacity-70 z-10 animate-pulse"></div>
        <div className="circle-2-animation absolute top-[8%] left-[45%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-orange-400/10 to-orange-600/10 opacity-70 z-10 animate-pulse"></div>
      </div>
      <MainHeading
        data={{
          username: userData?.username || "",
          status: "loggedin",
          items: [{ text: "Problem List", link_path: "/problemset", icon: "bi-list-check" }],
        }}
      />

      {userData && (
        <>
          {/* Profile Header Section */}
          <div className="w-[calc(100%-72px)] bg-gradient-to-br from-gray-900 to-gray-800 mx-auto mt-[8px] rounded-lg border border-gray-800 hover:border-orange-500/30 transition-all duration-300 p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Picture */}
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-4xl text-white">{userData.username[0]?.toUpperCase()}</span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                  {userData.username}
                </h1>
                <div className="text-[#8a8a8a] mb-4">{userData.email}</div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div className="stat-card bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-[#8a8a8a]">Problems Solved</div>
                    <div className="text-xl font-bold text-white">{userData.problems_solved.length}</div>
                  </div>
                  <div className="stat-card bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-[#8a8a8a]">Problems Attempted</div>
                    <div className="text-xl font-bold text-white">{userData.problems_attempted.length}</div>
                  </div>
                  <div className="stat-card bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-[#8a8a8a]">Total Submissions</div>
                    <div className="text-xl font-bold text-white">{userData.submissions.length}</div>
                  </div>
                  <div className="stat-card bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300">
                    <div className="text-[#8a8a8a]">Success Rate</div>
                    <div className="text-xl font-bold text-white">
                      {userData.submissions.length > 0
                        ? Math.round((userData.problems_solved.length / userData.submissions.length) * 100)
                        : 0}
                      %
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-[calc(100%-72px)] mx-auto mt-4">
            {/* Activity Chart */}
            <ActivityChart submissions={userData.submissions} />

            {/* Recent Submissions */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-800 hover:border-orange-500/30 transition-all duration-300 p-6">
              <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                Recent Submissions
              </h2>
              {userData.submissions.length > 0 ? (
                <div className="space-y-4">
                  {userData.submissions.slice(0, 5).map((submission, index) => (
                    <div key={index} className="submission-card">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">Problem {index + 1}</div>
                          <div className="text-[#8a8a8a] text-sm">{new Date().toLocaleDateString()}</div>
                        </div>
                        <div className="text-orange-500">Accepted</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[#8a8a8a] text-center py-8">No submissions yet</div>
              )}
            </div>
          </div>

          {/* Roadmaps Section */}
          <div className="w-[calc(100%-72px)] mx-auto mt-4 mb-8">
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-800 hover:border-orange-500/30 transition-all duration-300 p-6">
    <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
      My Roadmaps
    </h2>

    {roadmaps && roadmaps.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap._id}
            className="roadmap-card bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-orange-500/30 border border-gray-800 hover:shadow-lg hover:shadow-orange-500/10 group"
            onClick={() => (window.location.href = `/roadmap/${roadmap._id}`)}
          >
            <div className="roadmap-image h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md mb-3 flex items-center justify-center border border-gray-700 overflow-hidden relative">
              {/* Background SVG Pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <pattern
                    id="roadmapPattern"
                    patternUnits="userSpaceOnUse"
                    width="20"
                    height="20"
                    patternTransform="rotate(45)"
                  >
                    <line x1="0" y1="0" x2="0" y2="20" stroke="url(#bgGradient)" strokeWidth="0.5" />
                    <line x1="0" y1="0" x2="20" y2="0" stroke="url(#bgGradient)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#roadmapPattern)" />

                {/* Animated paths */}
                <path
                  className="roadmap-bg-path-1"
                  d="M0,50 Q25,30 50,50 T100,50"
                  stroke="url(#bgGradient)"
                  fill="none"
                  strokeWidth="0.5"
                />
                <path
                  className="roadmap-bg-path-2"
                  d="M0,60 Q30,40 50,60 T100,60"
                  stroke="url(#bgGradient)"
                  fill="none"
                  strokeWidth="0.5"
                />
                <path
                  className="roadmap-bg-path-3"
                  d="M0,40 Q20,60 50,40 T100,40"
                  stroke="url(#bgGradient)"
                  fill="none"
                  strokeWidth="0.5"
                />

                {/* Nodes */}
                <circle cx="20" cy="50" r="1.5" fill="url(#bgGradient)" className="roadmap-bg-node" />
                <circle cx="50" cy="50" r="1.5" fill="url(#bgGradient)" className="roadmap-bg-node" />
                <circle cx="80" cy="50" r="1.5" fill="url(#bgGradient)" className="roadmap-bg-node" />

                <circle cx="30" cy="60" r="1" fill="url(#bgGradient)" className="roadmap-bg-node" />
                <circle cx="70" cy="60" r="1" fill="url(#bgGradient)" className="roadmap-bg-node" />

                <circle cx="25" cy="40" r="1" fill="url(#bgGradient)" className="roadmap-bg-node" />
                <circle cx="75" cy="40" r="1" fill="url(#bgGradient)" className="roadmap-bg-node" />
              </svg>

              <svg
                className="w-20 h-20 roadmap-svg group-hover:scale-110 transition-transform duration-500 z-10"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <path
                  d="M9 20H7C5.89543 20 5 19.1046 5 18V16M9 20V14M9 20H15M5 16V6C5 4.89543 5.89543 4 7 4H9M5 16H3.5M9 4V10M9 4H15M15 4V10M15 4H17C18.1046 4 19 4.89543 19 6V10M15 10H9M15 10V14M15 14H9M15 14V20M15 20H17C18.1046 20 19 19.1046 19 18V16M19 16V10M19 16H20.5M19 10H20.5"
                  stroke="url(#roadmapGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="roadmap-path"
                />
                <circle cx="7" cy="7" r="1.5" fill="url(#roadmapGradient)" className="roadmap-dot roadmap-dot-1" />
                <circle cx="12" cy="12" r="1.5" fill="url(#roadmapGradient)" className="roadmap-dot roadmap-dot-2" />
                <circle cx="17" cy="17" r="1.5" fill="url(#roadmapGradient)" className="roadmap-dot roadmap-dot-3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="font-medium truncate bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 group-hover:translate-x-1 transition-transform duration-300">
              {roadmap.goal}
            </h3>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-[#8a8a8a] text-center py-8">No roadmaps created yet</div>
    )}
  </div>
</div>

<style>
{
  `
                        .stat-card {
                            @apply rounded-lg p-4 transition-all duration-300;
                        }
                        .submission-card {
                            @apply bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-4 transition-all duration-300 hover:border-orange-500/30 border border-gray-800;
                        }
                        .roadmap-card {
                          transform: translateY(0);
                          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                        }
                        .roadmap-card:hover {
                          transform: translateY(-5px);
                        }
                        .roadmap-path {
                          stroke-dasharray: 100;
                          stroke-dashoffset: 100;
                          animation: dash 2s linear forwards;
                        }
                        .roadmap-dot {
                          opacity: 0;
                          animation: fadeIn 0.5s ease forwards;
                        }
                        .roadmap-dot-1 {
                          animation-delay: 0.5s;
                        }
                        .roadmap-dot-2 {
                          animation-delay: 1s;
                        }
                        .roadmap-dot-3 {
                          animation-delay: 1.5s;
                        }
                        .roadmap-bg-path-1, .roadmap-bg-path-2, .roadmap-bg-path-3 {
                          stroke-dasharray: 100;
                          stroke-dashoffset: 100;
                          animation: dash 3s linear forwards;
                        }
                        .roadmap-bg-path-2 {
                          animation-delay: 0.3s;
                        }
                        .roadmap-bg-path-3 {
                          animation-delay: 0.6s;
                        }
                        .roadmap-bg-node {
                          opacity: 0;
                          animation: fadeIn 0.5s ease forwards;
                          animation-delay: 2s;
                        }
                        .roadmap-card:hover .roadmap-bg-node {
                          animation: pulse 2s ease infinite;
                        }
                        @keyframes dash {
                          to {
                            stroke-dashoffset: 0;
                          }
                        }
                        @keyframes fadeIn {
                          to {
                            opacity: 1;
                          }
                        }
                        @keyframes pulse {
                          0% {
                            transform: scale(1);
                            opacity: 1;
                          }
                          50% {
                            transform: scale(1.5);
                            opacity: 0.8;
                          }
                          100% {
                            transform: scale(1);
                            opacity: 1;
                          }
                        }
                        .roadmap-card:hover .roadmap-dot {
                          animation: pulse 1.5s ease infinite;
                        }
                        .roadmap-card:hover .roadmap-bg-path-1,
                        .roadmap-card:hover .roadmap-bg-path-2,
                        .roadmap-card:hover .roadmap-bg-path-3 {
                          animation: glow 1.5s ease infinite;
                        }
                        @keyframes glow {
                          0% {
                            stroke-width: 0.5;
                          }
                          50% {
                            stroke-width: 1;
                          }
                          100% {
                            stroke-width: 0.5;
                          }
                        }
                    `
}
</style>
        </>
      )}
    </div>
  )
}

export default ProfilePage
