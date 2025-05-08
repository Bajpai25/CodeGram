import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainHeading from "../components/MainHeading";
import axios from "axios";
import { Sparkles, User, Briefcase, GraduationCap, Award, LinkIcon, Loader } from 'lucide-react';

interface Peer {
  _id: string;
  name: string;
  linkedInLink: string;
  education: string;
  skills: string[];
  achievements: string;
  batch: string;
  company: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ExplorePage = ({
  token,
  id,
}: {
  token: string | null;
  id: string | null;
}) => {
  const isLoggedIn = Boolean(id);
  const navigate = useNavigate();

  const [peers, setPeers] = useState<Peer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  async function fetchPeerData() {
    setLoading(true);
    try {
      const res = await axios("http://localhost:5001/api/peers");
      if (res.status === 200) {
        setPeers(res.data);
      }
    } catch (error) {
      console.error("Error fetching peers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPeerData();
  }, []);

  const filteredPeers = peers.filter((peer) => {
    const matchesSearch = 
      peer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      peer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "company") return matchesSearch && peer.company;
    if (filterBy === "batch") return matchesSearch && peer.batch === filterBy;
    
    return matchesSearch;
  });

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
          status: isLoggedIn ? "loggedin" : "not-loggedin",
        }}
      />

      <div className="relative z-20 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-orange-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
            Explore Peers
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with talented developers and expand your professional network
          </p>
        </div>

        {isLoggedIn ? (
          <>
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search by name, company, or skills..."
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <select
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                    >
                      <option value="all">All Peers</option>
                      <option value="company">Has Company</option>
                      <option value="2025">Batch 2025</option>
                      <option value="2024">Batch 2024</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Peer Cards */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : filteredPeers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPeers.map((peer) => (
                  <div
                    key={peer._id}
                    className="peer-card bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 hover:border-orange-500/30 transition-all duration-300 p-6 cursor-pointer group"
                    onClick={() => navigate(`/peer/${peer._id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl text-white font-bold">{peer.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold truncate bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 group-hover:translate-x-1 transition-transform duration-300">
                          {peer.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-400 mt-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="truncate">{peer.company || "Not specified"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-400">Education</div>
                          <div className="text-white">{peer.education || "Not specified"}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Award className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-400">Batch</div>
                          <div className="text-white">{peer.batch || "Not specified"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-gray-400 mb-2">Skills</div>
                      <div className="flex flex-wrap gap-2">
                        {peer.skills && peer.skills.length > 0 ? (
                          peer.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full text-orange-300 text-sm border border-orange-500/30"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No skills listed</span>
                        )}
                        {peer.skills && peer.skills.length > 3 && (
                          <span className="px-3 py-1 bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-full text-orange-300/70 text-sm border border-orange-500/20">
                            +{peer.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                      {peer.linkedInLink ? (
                        <a
                          href={peer.linkedInLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-400 hover:text-orange-300 flex items-center gap-1 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LinkIcon className="w-4 h-4" />
                          LinkedIn
                        </a>
                      ) : (
                        <span className="text-gray-500 text-sm">No LinkedIn profile</span>
                      )}
                      
                      <button className="text-sm text-white bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0 translate-x-2">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-400">No peers found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <h3 className="text-xl font-semibold text-white mb-4">Connect with fellow developers</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Please log in or sign up to explore exciting coding content, connect with peers, and expand your network.
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
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
