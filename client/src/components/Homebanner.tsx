import React, { useState } from 'react';
import {
  Code2,
  Users,
  Brain,
  Trophy,
  ChevronRight,
  Sparkles,
  Laptop,
  MessageSquare
} from 'lucide-react';

function Homebanner() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Code2 className="w-8 h-8 text-orange-500" />,
      title: "Interactive Coding Environment",
      description: "Write, compile, and test code in real-time with our powerful integrated development environment."
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Collaborative Learning",
      description: "Connect with peers and mentors through real-time collaboration features and code sharing."
    },
    {
      icon: <Brain className="w-8 h-8 text-orange-500" />,
      title: "Smart Assessment",
      description: "AI-powered code analysis and personalized learning paths to accelerate your growth."
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and achievement milestones."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-8 text-orange-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-800">
            Master Coding Through Interactive Learning!
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
            Experience a revolutionary platform that combines collaborative coding, real-time communication, and intelligent progress tracking.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-zinc-900 p-8 rounded-2xl transform transition-all duration-300 hover:scale-105 border border-zinc-700 ${
                hoveredFeature === index ? 'shadow-xl shadow-orange-500/20' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
}

export default Homebanner;
