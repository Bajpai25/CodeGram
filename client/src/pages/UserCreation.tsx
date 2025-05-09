import React, { useState } from 'react';
import { User, Sparkles, Briefcase, GraduationCap, Award, Users, LinkIcon } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserCreation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        linkedInLink: '',
        education: '',
        skills: [] as string[], // Correctly initialize skills as an array
        achievements: '',
        batch: '',
        company: ''
      });
      

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://codegram-backend.onrender.com/api/peers', formData);
      console.log('Peer created:', response.data);
      alert('Profile created successfully!');
      navigate("/explore")
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="circle-1-animation absolute top-[6%] left-[55%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-red-500/30 to-red-800/30 opacity-70 z-10 animate-pulse"></div>
        <div className="circle-2-animation absolute top-[8%] left-[45%] -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[120px] bg-gradient-to-br from-orange-400/30 to-orange-600/30 opacity-70 z-10 animate-pulse"></div>
        <div className="circle-3-animation absolute top-[10%] left-[45%] -translate-x-1/2 w-[500px] h-[500px] rounded-full filter blur-[120px] bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 opacity-70 z-10 animate-pulse"></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
              Create Your Profile
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete your profile to unlock personalized learning experiences and connect with the community.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 hover:border-orange-500/30 transition-all duration-300 p-8">
              
              {/* Personal Information Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-orange-500" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                    Personal Information
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="input-group">
                    <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  {/* LinkedIn */}
                  <div className="input-group">
                    <label htmlFor="linkedInLink" className="block text-gray-300 mb-2">LinkedIn Profile</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <LinkIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <input
                        type="url"
                        id="linkedInLink"
                        name="linkedInLink"
                        value={formData.linkedInLink}
                        onChange={handleChange}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Education & Work Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-orange-500" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                    Education & Work
                  </span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Education */}
                  <div className="input-group">
                    <label htmlFor="education" className="block text-gray-300 mb-2">Education</label>
                    <input
                      type="text"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                      placeholder="B.Tech in Computer Science"
                    />
                  </div>
                  
                  {/* Company */}
                  <div className="input-group">
                    <label htmlFor="company" className="block text-gray-300 mb-2">Company</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Briefcase className="w-5 h-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                        placeholder="Google, Microsoft, etc."
                      />
                    </div>
                  </div>
                  
                  {/* Batch */}
                  <div className="input-group">
                    <label htmlFor="batch" className="block text-gray-300 mb-2">Batch/Graduation Year</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Users className="w-5 h-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="batch"
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                        placeholder="2023"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skills & Achievements Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-orange-500" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                    Skills & Achievements
                  </span>
                </h2>
                
                {/* Skills */}
                <label htmlFor="skill-input" className="block text-gray-300 mb-2">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                id="skill-input"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                placeholder="Add a skill (e.g., JavaScript, Python)"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Add
              </button>
            </div>

            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.skills.map((skill:string, index:number) => (
                  <span key={index} className="px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full text-orange-300 text-sm border border-orange-500/30 flex items-center gap-2">
                    {skill}
                    <button onClick={() => removeSkill(index)} className="text-red-500">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </div>
                
                {/* Achievements */}
                <div>
                  <label htmlFor="achievements" className="block text-gray-300 mb-2">Achievements</label>
                  <textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    placeholder="Share your notable achievements, certifications, or awards..."
                  ></textarea>
                </div>
            </div>
            
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1"
              >
                Create Profile
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreation;
