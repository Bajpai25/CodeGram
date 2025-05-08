import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Code, Calendar, Clock, ChevronRight, CheckCircle2, Lightbulb, Rocket, Sparkles, GraduationCap } from 'lucide-react';
import axios from 'axios';


interface Month {
    title: string;
    focus: string;
    topics: string[];
    project: string;
    resources: string[];
  }

const RoadmapId = () => {





  const location = useLocation();
  const roadmapFromState = location.state?.roadmap; 
  console.log("Roadmap from state:", roadmapFromState);

  const [activeMonth, setActiveMonth] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Default roadmap data in case nothing is passed
  const defaultRoadmap = {
    goal: "Full-Stack Developer (Remote)",
    monthlyCommitment: "1-5 hours/day",
    monthlyProgress: [
      {
        title: "Month 1: Foundations",
        description: "Building the core skills",
        topics: ["HTML & CSS Fundamentals", "JavaScript Basics", "Git & GitHub", "Basic Terminal Commands"],
        projects: ["Personal Portfolio Website", "Interactive Form"],
        resources: ["MDN Web Docs", "freeCodeCamp", "The Odin Project"]
      },
      {
        title: "Month 2: Frontend Frameworks",
        description: "Learning modern frontend development",
        topics: ["React Fundamentals", "State Management", "Responsive Design", "CSS Frameworks (Tailwind)"],
        projects: ["Todo Application", "Weather Dashboard"],
        resources: ["React Documentation", "Tailwind CSS Docs", "Frontend Masters"]
      },
      {
        title: "Month 3: Backend Basics",
        description: "Server-side programming fundamentals",
        topics: ["Node.js Basics", "Express.js", "RESTful APIs", "Database Concepts"],
        projects: ["REST API", "Authentication System"],
        resources: ["Node.js Documentation", "Express.js Guide", "REST API Design Best Practices"]
      },
      {
        title: "Month 4: Database & Authentication",
        description: "Working with data and security",
        topics: ["MongoDB", "SQL Basics", "Authentication & Authorization", "Data Modeling"],
        projects: ["Full-Stack CRUD App", "User Management System"],
        resources: ["MongoDB University", "SQL Tutorial", "JWT.io"]
      },
      {
        title: "Month 5: Advanced Concepts",
        description: "Enhancing your applications",
        topics: ["TypeScript", "Next.js", "Testing", "Performance Optimization"],
        projects: ["E-commerce Platform", "Blog with CMS"],
        resources: ["TypeScript Handbook", "Next.js Documentation", "Web.dev Performance Guide"]
      },
      {
        title: "Month 6: Deployment & Career Prep",
        description: "Launching your work and preparing for jobs",
        topics: ["CI/CD", "Cloud Deployment", "Portfolio Refinement", "Interview Preparation"],
        projects: ["Capstone Project", "Technical Resume"],
        resources: ["Vercel Documentation", "AWS Free Tier Guide", "Tech Interview Handbook"]
      }
    ],
    student: "Shashwat",
    successTips: [
      'Code daily (even 30 minutes)', 
      'Contribute to open-source projects', 
      'Join communities like freeCodeCamp/Dev.to', 
      'Build projects for your portfolio', 
      'Practice mock technical interviews'
    ],
    timeline: "6 Months"
  };

  const [roadmapData, setRoadmapData] = useState(roadmapFromState? roadmapFromState : defaultRoadmap);
const {id}=useParams()
 async function get_roadmap_by_id(){
  const response=await axios(`http://localhost:5001/api/roadmap/${id}`)
  if(response.status===200){
    console.log(response.data)
    setRoadmapData(response.data)
  }
 }

 useEffect(()=>{
  get_roadmap_by_id()
 },[])

  useEffect(() => {
    if (roadmapFromState && typeof roadmapFromState === 'object') {
    //   const mergedRoadmap = {
    //     ...defaultRoadmap,
    //     ...roadmapFromState,
    //     monthlyProgress: roadmapFromState.monthlyProgress || defaultRoadmap.monthlyProgress,
    //     successTips: roadmapFromState.successTips || defaultRoadmap.successTips
    //   };
      setRoadmapData(roadmapFromState.roadmap);
    }
    console.log(roadmapData)

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const progressTimer = setTimeout(() => {
      setProgress(15);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, [roadmapFromState]);

 const handleMonthClick = (index: number) => {
  setActiveMonth(index);
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4"
          >
            <Rocket size={48} className="text-orange-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-orange-500">Loading your roadmap...</h2>
        </div>
      </div>
    );
  }

  const monthlyProgress = Array.isArray(roadmapData.months) ? roadmapData.months : [];
  const successTips: string[] = Array.isArray(roadmapData.successTips) ? roadmapData.successTips : [];
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-x-hidden pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-red-500/30 to-red-800/30 opacity-70 z-10 animate-pulse"></div>
        <div className="circle-2-animation absolute top-[8%] left-[45%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-orange-400/30 to-orange-600/30 opacity-70 z-10 animate-pulse"></div>
        <div className="circle-3-animation absolute top-[10%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[120px] bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 opacity-70 z-10 animate-pulse"></div>
      </div>

      <div className="relative z-20 pt-[100px] px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"
        >
          <TypeAnimation
            sequence={[
              `Your Path to ${roadmapData.goal }`,
              2000,
              `${roadmapData.student }`,
              2000,
              "From Beginner to Pro",
              2000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: "1em", display: "inline-block" }}
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <Calendar className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-gray-300">{roadmapData.timeline}</span>
          </div>
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <Clock className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-gray-300">{roadmapData.monthlyCommitment}</span>
          </div>
          <div className="flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <Code className="w-5 h-5 text-orange-500 mr-2" />
            <span className="text-gray-300">{roadmapData.goal}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Your progress</span>
              <span className="text-sm font-medium text-orange-500">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 mt-16">
        <div className="flex mb-8 space-x-4 overflow-x-auto pb-2">
          <button 
            className={`px-4 py-2 rounded-lg ${activeMonth === -1 ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' : 'bg-gray-800/50 text-gray-300'}`}
            onClick={() => setActiveMonth(-1)}
          >
            Timeline View
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeMonth === -2 ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' : 'bg-gray-800/50 text-gray-300'}`}
            onClick={() => setActiveMonth(-2)}
          >
            Detailed View
          </button>
        </div>

        {activeMonth >= 0 && monthlyProgress.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <svg 
              className="absolute left-[30px] top-0 h-full w-[60px] overflow-visible hidden md:block" 
              viewBox="0 0 60 800"
              preserveAspectRatio="xMidYMax meet"
            >
              <motion.path
                variants={pathVariants}
                d="M30,0 L30,800"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray="8 4"
                className="path"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>

            {monthlyProgress.map((month:Month, index:any) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex mb-12 relative"
                onClick={() => handleMonthClick(index)}
              >
                <div className="md:w-16 w-12 flex-shrink-0 flex justify-center z-10">
                  <motion.div 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                      ${index === activeMonth 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600' 
                        : 'bg-gray-800 border border-orange-500/30'}`}
                  >
                    <span className="font-bold">{index + 1}</span>
                  </motion.div>
                </div>

                <motion.div 
                  className={`flex-grow bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border
                    ${index === activeMonth 
                      ? 'border-orange-500/50 shadow-lg shadow-orange-500/10' 
                      : 'border-gray-700'}`}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(249, 115, 22, 0.5)',
                    boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.1)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{month.title }</h3>
                    <p className="text-gray-400 mb-4">{month.focus}</p>

                    {index === activeMonth && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <h4 className="font-semibold text-orange-500 mb-2 flex items-center">
                                <Code className="w-4 h-4 mr-2" />
                                Key Topics
                              </h4>
                              <ul className="space-y-2">
                                {Array.isArray(month.topics) && month.topics.map((topic:any, i:any) => (
                                  <motion.li 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-gray-300">{topic}</span>
                                  </motion.li>
                                ))}
                                {(!Array.isArray(month.topics) || month.topics.length === 0) && (
                                  <li className="text-gray-400">No topics specified</li>
                                )}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-orange-500 mb-2 flex items-center">
                                <Rocket className="w-4 h-4 mr-2" />
                                Projects
                              </h4>
                              <ul className="space-y-2">
                              {month.project && month.project.split(',').map((project:string, i:number) => (
  <motion.li 
    key={i}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
    className="flex items-start"
  >
    <Rocket className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
    <span className="text-gray-300">{project.trim()}</span>
  </motion.li>
))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-semibold text-orange-500 mb-2 flex items-center">
                              <GraduationCap className="w-4 h-4 mr-2" />
                              Resources
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(month.resources) && month.resources.map((resource:string, i:number) => (
                                <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-md text-sm">
                                  {resource}
                                </span>
                              ))}
                              {(!Array.isArray(month.resources) || month.resources.length === 0) && (
                                <span className="text-gray-400">No resources specified</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}

                    {index !== activeMonth && (
                      <button 
                        className="text-orange-500 hover:text-orange-400 flex items-center mt-2"
                      >
                        View details <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeMonth === -2 && monthlyProgress.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {monthlyProgress.map((month:Month, index:number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-orange-500/30 transition-all duration-300 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mr-3 text-sm font-bold">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-white">{month.title || `Month ${index + 1}`}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{month.focus}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-orange-500 mb-2">Key Topics</h4>
                        <ul className="space-y-1">
                          {Array.isArray(month.topics) && month.topics.map((topic:string, i:number) => (
                            <li key={i} className="flex items-start text-gray-300">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                          {(!Array.isArray(month.topics) || month.topics.length === 0) && (
                            <li className="text-gray-400">No topics specified</li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-orange-500 mb-2">Projects</h4>
                        <ul className="space-y-1">
                          
                            <li className="flex items-start text-gray-300">
                            {month.project && month.project.split(',').map((project:string, i:number) => (
  <motion.li 
    key={i}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
    className="flex items-start"
  >
    <Rocket className="w-4 h-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
    <span className="text-gray-300">{project.trim()}</span>
  </motion.li>
))}
                            </li>
                          
                          
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-orange-500 mb-2">Resources</h4>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(month.resources) && month.resources.map((resource:string, i:number) => (
                            <span key={i} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-md text-sm">
                              {resource}
                            </span>
                          ))}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeMonth === -1 && monthlyProgress.length > 0 && (
          <div className="relative">
            <svg 
              className="absolute left-[30px] top-0 h-full w-[60px] overflow-visible hidden md:block" 
              viewBox="0 0 60 800"
              preserveAspectRatio="xMidYMax meet"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M30,0 L30,800"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray="8 4"
                className="path"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </svg>

            {monthlyProgress.map((month:Month, index:number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex mb-12 relative"
              >
                <div className="md:w-16 w-12 flex-shrink-0 flex justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className="flex-grow bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-2">{month.title || `Month ${index + 1}`}</h3>
                  <p className="text-gray-400">{month.focus}</p>
                  
                  <button 
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white flex items-center"
                    onClick={() => handleMonthClick(index)}
                  >
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <section className="relative z-20 py-16 mt-8 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"
          >
            Success Tips for Your Journey
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {successTips.length > 0 ? (
              successTips.map((tip:string, index:number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.2)' }}
                  className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-orange-500" />
                  </div>
                  <p className="text-gray-300">{tip}</p>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.2)' }}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                </div>
                <p className="text-gray-300">Code daily (even 30 minutes)</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-20 py-16 bg-gradient-to-b from-black/50 to-gray-900/50 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
              Ready to Begin Your Developer Journey?
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Start your path to becoming a {roadmapFromState?.roadmap?.goal} today with this personalized roadmap.
            </p>
            <Link to="/">
            <button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1">
              Start Learning Now
              <ChevronRight className="h-5 w-5 ml-1 inline-block" />
            </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RoadmapId;
