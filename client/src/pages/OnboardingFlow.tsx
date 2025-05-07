"use client"

import type React from "react"
import { useState } from "react"
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import type { SelectChangeEvent } from "@mui/material"
import { CheckCircle, ArrowRight } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import axios from "axios"
import {useNavigate} from "react-router-dom"

const steps = [
  "Name",
  "Preferred Coding Language",
  "Study Year",
  "Area of Interest",
  "Skill Level",
  "Learning Path",
  "Experience Level",
  "Carrer Stage",
  "Coding Goals",
  "Preferred Communication Tools",
  "Assessment Type",
  "Time Commitment per Week",
]

const onboardingFields = {
  name: "",
  preferredLanguage: "",
  skillLevel: "",
  learningPath: "",
  experienceLevel: "",
  studyYear: "",
  areaOfInterest: "",
  codingGoals: "",
  communicationTools: "",
  assessmentType: "",
  careerStage: "",
  timeCommitment: "",
}

const onboardingOptions = {
  languages: ["JavaScript", "Python", "Java", "C++", "Ruby"],
  skillLevels: ["Beginner", "Intermediate", "Advanced"],
  learningPaths: ["Full-Stack Development", "AI/ML Specialist", "Data Science", "Mobile App Development"],
  experienceLevels: ["Beginner", "Intermediate", "Advanced"],
  studyYears: ["First Year", "Second Year", "Third Year", "Final Year", "Fresh Graduate", "Working Professional"],
  areasOfInterest: ["Web Dev", "App Dev", "AI/ML", "Data Science", "Cloud Computing"],
  communicationTools: ["Chat", "Voice", "Video Calls"],
  assessmentTypes: ["Coding Challenges", "Peer Reviews", "Quizzes"],
  careerStages: ["Student", "Entry-level Professional", "Experienced Professional"],
  timeCommitments: ["1-5 hours", "5-10 hours", "10+ hours"],
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(onboardingFields)
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [onboarded, setonBoarded] = useState(false)
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  const navigate=useNavigate();

  const handleChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [e.target.name as string]: e.target.value,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  function parseRoadmap(roadmapString:any) {
    try {
      // Remove unwanted symbols like \n, \t, and extra whitespace
      const cleanedString = roadmapString.replace(/\\n|\\t|\\r/g, '').trim();
  
      // Parse the cleaned string into a JSON object
      const roadmapJson = JSON.parse(cleanedString);
  
      // Return the parsed JSON object
      return roadmapJson;
    } catch (error) {
      console.error("Error cleaning and parsing roadmap:", error);
      return null;
    }
  }
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setonBoarded(true);
  
      const userId = localStorage.getItem("id");
      const onboardData = { ...formData, userId };
  
      // First API call
      const onboardResponse = await axios.post('http://localhost:5001/api/onboard', onboardData);
      if (onboardResponse.status === 201) {
        setCompleted(true);
      }
  
      // Second API call - Generate Roadmap
      setLoadingRoadmap(true); // Show loading screen
      const roadmapResponse = await axios.post('http://localhost:5001/api/generate_roadmap', formData);
      if (roadmapResponse.status === 200) {
        console.log(roadmapResponse);
      }
      const parsedData = parseRoadmap(roadmapResponse.data.roadmap);
      console.log(parsedData);
  
      // Third API call - Create Roadmap
      const roadmapCreated = await axios.post('http://localhost:5001/api/roadmap', parsedData.roadmap);
      if (roadmapCreated.status === 200) {
        console.log(roadmapCreated);
      }
  
      // Pass the parsed data to the /roadmap route using navigate
      navigate("/roadmap", { state: { roadmap: parsedData } });
  
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setLoading(false);
      setLoadingRoadmap(false); // Hide loading screen once everything is done
    }
  };
  
  

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name.trim().length > 0
      case 1:
        return formData.preferredLanguage !== ""
      case 2:
        return formData.studyYear !== ""
      case 3:
        return formData.areaOfInterest !== ""
      case 4:
        return formData.skillLevel !== ""
      case 5:
        return formData.learningPath !== ""
      case 6:
        return formData.experienceLevel !== ""
      case 7:
        return formData.careerStage !== ""
      case 8:
        return formData.codingGoals.trim().length > 0
      case 9:
        return formData.communicationTools !== ""
      
      case 10:
        return formData.assessmentType !== ""
      
      case 11:
        return formData.timeCommitment !== ""
      
      default:
        return false
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  }

  if (loadingRoadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-4"
          >
            <svg width="60" height="60" viewBox="0 0 60 60" className="text-orange-500">
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="4" fill="none" />
              <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="175" strokeDashoffset="25">
                <animate
                  attributeName="stroke-dashoffset"
                  from="25"
                  to="175"
                  dur="1s"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-orange-500">Your roadmap is being cooked...</h2>
          <p className="text-gray-400">Please wait while we generate your personalized roadmap!</p>
        </div>
      </div>
    );
  }
  
  if (completed) {
    return (
      <div className="flex justify-center items-center min-h-screen p-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[6%] left-[55%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-red-500/30 to-red-800/30 opacity-70 z-10 animate-pulse"></div>
          <div className="absolute top-[8%] left-[45%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-orange-400/30 to-orange-600/30 opacity-70 z-10 animate-pulse"></div>
          <div className="absolute top-[10%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[120px] bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 opacity-70 z-10 animate-pulse"></div>
        </div>

        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg text-center z-20 backdrop-blur-lg"
          initial="hidden"
          animate="visible"
          variants={successVariants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className="flex justify-center mb-6"
          >
            <CheckCircle size={80} className="text-orange-500" />
          </motion.div>
          <motion.h2
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TypeAnimation
              sequence={[
                "Onboarding Complete!",
                1000,
                "Welcome to Codegram!",
                1000,
                `Welcome, ${formData.name}!`,
                2000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={1}
              style={{
                fontSize: "1em",
                display: "inline-block",
              }}
            />
          </motion.h2>
          <motion.p
            className="text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            You're all set to begin your coding journey. Get ready to solve challenges and level up your skills!
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <Button
              variant="contained"
              onClick={() => {
                setCompleted(false)
                setCurrentStep(0)
                setFormData(onboardingFields)
              }}
              className="inline-flex items-center px-8 py-3"
              style={{
                background: "linear-gradient(90deg, #f97316, #dc2626)",
                textTransform: "none",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(249, 115, 22, 0.3)",
              }}
            >
              Start Coding Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 overflow-hidden text-[14px] bg-gradient-to-b from-black to-gray-900">
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8 rounded-xl shadow-xl w-full max-w-lg z-20 backdrop-blur-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center`}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    index < currentStep
                      ? "bg-orange-500"
                      : index === currentStep
                      ? "bg-orange-500 ring-4 ring-orange-500/20"
                      : "bg-gray-700"
                  }`}
                />
                <span
                  className={`text-xs mt-1 ${index === currentStep ? "text-orange-500 font-medium" : "text-gray-500"}`}
                >
                  {index + 1}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-600"
              initial={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8"
          >
            <motion.div className="text-center mb-6" variants={itemVariants}>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                {steps[currentStep]}
              </h2>
              <p className="text-gray-400 mt-2">
                Step {currentStep + 1} of {steps.length}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              {currentStep === 0 && (
                <TextField
                  fullWidth
                  label="Enter your Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mb-4"
                  InputProps={{
                    style: {
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#9ca3af" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#374151",
                      },
                      "&:hover fieldset": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#f97316",
                      },
                    },
                  }}
                />
              )}
              {currentStep === 1 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Preferred Coding Language</InputLabel>
                  <Select
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    name="preferredLanguage"
                    label="Preferred Coding Language"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.languages.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {currentStep === 2 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Study Year</InputLabel>
                  <Select
                    value={formData.studyYear}
                    onChange={handleChange}
                    name="studyYear"
                    label="Study Year"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.studyYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {currentStep === 3 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Area of Interest</InputLabel>
                  <Select
                    value={formData.areaOfInterest}
                    onChange={handleChange}
                    name="areaOfInterest"
                    label="Area of Interest"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.areasOfInterest.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {currentStep === 4 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Skill Level</InputLabel>
                  <Select
                    value={formData.skillLevel}
                    onChange={handleChange}
                    name="skillLevel"
                    label="Skill Level"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.skillLevels.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {currentStep === 5 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Learning Path</InputLabel>
                  <Select
                    value={formData.learningPath}
                    onChange={handleChange}
                    name="learningPath"
                    label="Prefereed Learning Path"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.learningPaths.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {currentStep === 6 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Experience Level</InputLabel>
                  <Select
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    name="experienceLevel"
                    label="Experience Level"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.experienceLevels.map((language) => (
                      <MenuItem key={language} value={language}>
                        {language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              
              {currentStep === 7 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Career Stages</InputLabel>
                  <Select
                    value={formData.careerStage}
                    onChange={handleChange}
                    name="careerStage"
                    label="Carrer Stages"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.careerStages.map((tool) => (
                      <MenuItem key={tool} value={tool}>
                        {tool}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              
                 {currentStep === 8 && (
                  <TextField
                    fullWidth
                    label="codingGoals"
                    variant="outlined"
                    name="codingGoals"
                    value={formData.codingGoals}
                    onChange={handleInputChange}
                    className="mb-4"
                    InputProps={{
                      style: {
                        borderRadius: "0.5rem",
                        color: "#f1f5f9",
                        background: "rgba(17, 24, 39, 0.7)",
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "#9ca3af" },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#374151",
                        },
                        "&:hover fieldset": {
                          borderColor: "#f97316",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#f97316",
                        },
                      },
                    }}
                  />
                )}
               {currentStep === 9 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Communication Tools</InputLabel>
                  <Select
                    value={formData.communicationTools}
                    onChange={handleChange}
                    name="communicationTools"
                    label="Communication Tools"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.communicationTools.map((tool) => (
                      <MenuItem key={tool} value={tool}>
                        {tool}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {currentStep === 10 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Assessment Type</InputLabel>
                  <Select
                    value={formData.assessmentType}
                    onChange={handleChange}
                    name="assessmentType"
                    label="Assessment Type"
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.assessmentTypes.map((tool) => (
                      <MenuItem key={tool} value={tool}>
                        {tool}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {currentStep === 11 && (
                <FormControl fullWidth variant="outlined" className="mb-4">
                  <InputLabel style={{ color: "#9ca3af" }}>Time Commitment</InputLabel>
                  <Select
                    value={formData.timeCommitment}
                    onChange={handleChange}
                    name="timeCommitment"
                    label="Time Commitment"
                    
                    sx={{
                      borderRadius: "0.5rem",
                      color: "#f1f5f9",
                      background: "rgba(17, 24, 39, 0.7)",
                      ".MuiOutlinedInput-notchedOutline": {
                        borderColor: "#374151",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#f97316",
                      },
                      ".MuiSvgIcon-root": {
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {onboardingOptions.timeCommitments.map((tool) => (
                      <MenuItem key={tool} value={tool}>
                        {tool}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {currentStep > 0 && (
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={loading}
              className="w-full"
            >
              Back
            </Button>
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading || !isStepValid()}
              className="w-full inline-flex items-center"
              style={{
                background: isStepValid() ? "linear-gradient(90deg, #f97316, #dc2626)" : "#1f2937",
                textTransform: "none",
                borderRadius: "0.5rem",
                boxShadow: isStepValid() ? "0 10px 15px -3px rgba(249, 115, 22, 0.3)" : "none",
              }}
            >
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !isStepValid()}
              className="w-full inline-flex items-center"
              style={{
                background: isStepValid() ? "linear-gradient(90deg, #f97316, #dc2626)" : "#1f2937",
                textTransform: "none",
                borderRadius: "0.5rem",
                boxShadow: isStepValid() ? "0 10px 15px -3px rgba(249, 115, 22, 0.3)" : "none",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  Submit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OnboardingFlow
