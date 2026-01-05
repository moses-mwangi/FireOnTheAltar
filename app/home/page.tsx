// app/introduction/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen, Heart, Users, Target,
  Sparkles, ChevronRight, Star, Shield,
  Globe, Clock, Award, Zap, Brain,
  Compass, Bookmark, Share2, Play,
  Download, Home, Search, Layers,
  BarChart, TrendingUp, MessageSquare,
  HelpCircle, GraduationCap, HeartHandshake
} from 'lucide-react';

const BibleIntroduction = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'getting-started', label: 'Getting Started', icon: <Compass className="h-5 w-5" /> },
    { id: 'study-methods', label: 'Study Methods', icon: <Brain className="h-5 w-5" /> },
    { id: 'features', label: 'Platform Features', icon: <Sparkles className="h-5 w-5" /> },
  ];

  const sections = [
    {
      id: 'what-is-bible',
      title: 'What is the Bible?',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-purple-500 to-indigo-500',
      description: 'Understanding the sacred text',
      content: `The Bible is the inspired Word of God, consisting of 66 books written over 1,500 years by approximately 40 different authors. It's divided into two main sections:
      
      • Old Testament (39 books) - God's covenant with Israel
      • New Testament (27 books) - God's new covenant through Jesus Christ
      
      The Bible is not just a historical document, but a living book that reveals God's character, His plan for salvation, and His guidance for our lives today.`
    },
    {
      id: 'why-read',
      title: 'Why Read the Bible?',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-rose-500 to-red-500',
      description: 'The benefits of daily reading',
      content: `Regular Bible reading transforms lives in powerful ways:

      • Spiritual Growth: Deepens your relationship with God
      • Wisdom & Guidance: Provides direction for daily decisions
      • Peace & Comfort: Brings hope in difficult times
      • Transformation: Changes your thinking and character
      • Foundation: Builds a solid spiritual foundation
      
      "Your word is a lamp for my feet, a light on my path." - Psalm 119:105`
    },
    {
      id: 'how-to-begin',
      title: 'How to Begin',
      icon: <Target className="h-6 w-6" />,
      color: 'from-emerald-500 to-teal-500',
      description: 'Practical steps to start',
      content: `Starting your Bible journey is easier than you think:

      1. Choose a Translation: NIV, ESV, or NLT are great for beginners
      2. Start with the Gospels: Begin with Matthew, Mark, Luke, or John
      3. Set a Regular Time: Even 10-15 minutes daily makes a difference
      4. Pray First: Ask God to speak to you through His Word
      5. Use Study Tools: Take advantage of notes and commentaries
      6. Join a Community: Share insights with other believers
      
      Don't worry about understanding everything at once. The Holy Spirit will guide you!`
    },
    {
      id: 'study-tools',
      title: 'Study Tools',
      icon: <Brain className="h-6 w-6" />,
      color: 'from-amber-500 to-orange-500',
      description: 'Methods for deeper understanding',
      content: `Enhance your study with these methods:

      • SOAP Method:
        - Scripture: Read a passage
        - Observation: What does it say?
        - Application: How does it apply to me?
        - Prayer: Respond to God

      • Verse Mapping: Break down verses word by word
      • Topical Study: Study specific themes (love, faith, prayer)
      • Character Study: Learn from biblical figures
      • Context Study: Understand historical/cultural background
      
      Our platform provides tools for all these methods!`
    }
  ];

  const gettingStartedSteps = [
    {
      step: 1,
      title: 'Create Your Account',
      description: 'Set up your personal study space',
      icon: <Users className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      action: 'Sign Up'
    },
    {
      step: 2,
      title: 'Take the Quick Tour',
      description: 'Learn platform features in 5 minutes',
      icon: <Compass className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      action: 'Start Tour'
    },
    {
      step: 3,
      title: 'Choose a Reading Plan',
      description: 'Start with a guided 30-day plan',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      action: 'View Plans'
    },
    {
      step: 4,
      title: 'Join a Study Group',
      description: 'Connect with other believers',
      icon: <HeartHandshake className="h-8 w-8" />,
      color: 'bg-gradient-to-r from-amber-500 to-orange-500',
      action: 'Find Community'
    }
  ];

  const platformFeatures = [
    {
      title: 'Smart Reading Plans',
      description: 'Personalized plans based on your goals and schedule',
      icon: <Target className="h-6 w-6" />,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Interactive Notes',
      description: 'Highlight, tag, and organize your insights',
      icon: <Bookmark className="h-6 w-6" />,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      title: 'Spaced Repetition',
      description: 'Remember more with scientifically-proven review system',
      icon: <Brain className="h-6 w-6" />,
      color: 'text-amber-600 bg-amber-100'
    },
    {
      title: 'Community Insights',
      description: 'Learn from other believers\' notes and reflections',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Audio Bible',
      description: 'Listen to scripture anywhere, anytime',
      icon: <Play className="h-6 w-6" />,
      color: 'text-rose-600 bg-rose-100'
    },
    {
      title: 'Progress Tracking',
      description: 'Visualize your growth and consistency',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  const studyMethods = [
    {
      name: 'Devotional Reading',
      description: 'Focus on spiritual nourishment and personal application',
      time: '10-15 min',
      level: 'Beginner',
      icon: '🙏',
      color: 'from-purple-100 to-pink-100'
    },
    {
      name: 'Verse-by-Verse',
      description: 'Detailed analysis of each verse in context',
      time: '20-30 min',
      level: 'Intermediate',
      icon: '🔍',
      color: 'from-blue-100 to-cyan-100'
    },
    {
      name: 'Topical Study',
      description: 'Explore themes across different books',
      time: '30-45 min',
      level: 'Intermediate',
      icon: '📚',
      color: 'from-emerald-100 to-teal-100'
    },
    {
      name: 'Book Study',
      description: 'Study an entire book systematically',
      time: '45-60 min',
      level: 'Advanced',
      icon: '📖',
      color: 'from-amber-100 to-orange-100'
    }
  ];

  const faqs = [
    {
      question: 'Which Bible translation should I use?',
      answer: 'For beginners, NIV or NLT are great starting points. As you grow, you might explore ESV for word-for-word accuracy or MSG for contemporary language.'
    },
    {
      question: 'How much time should I spend reading?',
      answer: 'Start with 10-15 minutes daily. Consistency is more important than duration. Even 5 minutes with focused attention is valuable.'
    },
    {
      question: "What if I don't understand what I'm reading?",
      answer: 'That\'s normal! Use study notes, commentaries, and don\'t hesitate to ask questions in our community. Understanding grows over time.'
    },
    {
      question: 'Where should I start reading?',
      answer: 'We recommend starting with the Gospel of John, then Mark, then Romans. This gives you a good foundation in Jesus\' life and basic theology.'
    }
  ];

  const testimonies = [
    {
      name: 'Sarah M.',
      role: 'New Believer',
      content: 'This platform made Bible study approachable. The guided plans helped me build a consistent habit for the first time!',
      avatar: '👩‍🦰'
    },
    {
      name: 'James T.',
      role: 'Small Group Leader',
      content: 'The community features have transformed our group study. Sharing insights has deepened our discussions significantly.',
      avatar: '👨‍🏫'
    },
    {
      name: 'Maria G.',
      role: 'Bible Study Teacher',
      content: 'The study tools are incredible. My students engagement has increased dramatically since we started using this platform.',
      avatar: '👩‍🏫'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48" />
        
        <div className="relative px-6 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm">Welcome to Bible Study Hub</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Your Journey with God's Word Begins Here
                </h1>
                
                <p className="text-xl text-white/90 mb-8">
                  A welcoming space for believers to read, study, and grow in faith together. 
                  Whether you're new to the Bible or a seasoned student, we're here to help.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/dashboard"
                    className="px-8 py-3 bg-white text-purple-600 rounded-xl hover:bg-white/90 font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Reading Now
                  </Link>
                  <button className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-medium">
                    Take Quick Tour
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/20 rounded-2xl text-center">
                      <div className="text-4xl mb-2">📖</div>
                      <div className="text-white font-bold">66 Books</div>
                      <div className="text-white/80 text-sm">Complete Bible</div>
                    </div>
                    <div className="p-6 bg-white/20 rounded-2xl text-center">
                      <div className="text-4xl mb-2">🙏</div>
                      <div className="text-white font-bold">Daily Plans</div>
                      <div className="text-white/80 text-sm">Guided Reading</div>
                    </div>
                    <div className="p-6 bg-white/20 rounded-2xl text-center">
                      <div className="text-4xl mb-2">👥</div>
                      <div className="text-white font-bold">Community</div>
                      <div className="text-white/80 text-sm">Share & Learn</div>
                    </div>
                    <div className="p-6 bg-white/20 rounded-2xl text-center">
                      <div className="text-4xl mb-2">⚡</div>
                      <div className="text-white font-bold">Smart Tools</div>
                      <div className="text-white/80 text-sm">Enhanced Study</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tabs Navigation */}
        <div className="sticky top-4 z-10 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-2">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* Welcome Message */}
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Welcome to Your Bible Study Journey
                </h2>
                <p className="text-lg text-slate-600">
                  The Bible is more than just a book—it's God's living Word, a guide for life, 
                  and the foundation of our faith. This platform is designed to make your study 
                  journey meaningful, organized, and deeply rewarding.
                </p>
              </div>

              {/* Key Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                    className={`bg-white rounded-2xl border border-slate-200 p-6 cursor-pointer transition-all hover:shadow-lg ${
                      selectedSection === section.id ? 'ring-2 ring-purple-500 ring-offset-2' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color} text-white`}>
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
                        <p className="text-slate-600 mt-1">{section.description}</p>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform ${
                        selectedSection === section.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                    
                    {selectedSection === section.id && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Bible Verses */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-800">Key Bible Verses to Remember</h3>
                  <p className="text-slate-600 mt-2">Foundation verses for your journey</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <BookOpen className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">2 Timothy 3:16-17</div>
                        <div className="text-sm text-slate-600">NIV</div>
                      </div>
                    </div>
                    <p className="text-slate-700 italic">
                      "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work."
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-emerald-100">
                        <Heart className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Psalm 119:105</div>
                        <div className="text-sm text-slate-600">NIV</div>
                      </div>
                    </div>
                    <p className="text-slate-700 italic">
                      "Your word is a lamp for my feet, a light on my path."
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-amber-100">
                        <Shield className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Hebrews 4:12</div>
                        <div className="text-sm text-slate-600">NIV</div>
                      </div>
                    </div>
                    <p className="text-slate-700 italic">
                      "For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart."
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <Zap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">Joshua 1:8</div>
                        <div className="text-sm text-slate-600">NIV</div>
                      </div>
                    </div>
                    <p className="text-slate-700 italic">
                      "Keep this Book of the Law always on your lips; meditate on it day and night, so that you may be careful to do everything written in it. Then you will be prosperous and successful."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Getting Started Tab */}
          {activeTab === 'getting-started' && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Start Your Bible Journey in 4 Simple Steps
                </h2>
                <p className="text-lg text-slate-600">
                  We've designed this platform to make your first steps easy and meaningful.
                  Follow this simple path to begin growing in God's Word.
                </p>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gettingStartedSteps.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full">
                      <div className={`p-4 rounded-xl text-white ${step.color} mb-4 inline-block`}>
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                      <p className="text-slate-600 mb-4">{step.description}</p>
                      <button className="w-full py-2 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                        {step.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Start Guides */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-white">
                    <Zap className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Quick Start Guides</h3>
                    <p className="text-slate-600">Choose your starting point</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">5-Minute Daily</h4>
                        <p className="text-sm text-slate-600">For busy schedules</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• One key verse per day</li>
                      <li>• Quick reflection prompt</li>
                      <li>• Perfect for mornings</li>
                    </ul>
                    <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700">
                      Start 5-Min Plan
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-emerald-100">
                        <BookOpen className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Gospel Journey</h4>
                        <p className="text-sm text-slate-600">30 days with Jesus</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Walk with Jesus daily</li>
                      <li>• Learn His teachings</li>
                      <li>• Discover His love</li>
                    </ul>
                    <button className="w-full mt-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700">
                      Start Gospel Plan
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-amber-100">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Group Study</h4>
                        <p className="text-sm text-slate-600">Study with others</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Join a study group</li>
                      <li>• Weekly discussions</li>
                      <li>• Shared insights</li>
                    </ul>
                    <button className="w-full mt-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700">
                      Find a Group
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Study Methods Tab */}
          {activeTab === 'study-methods' && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Discover Your Study Style
                </h2>
                <p className="text-lg text-slate-600">
                  Different methods work for different people. Find the approach that resonates with you.
                </p>
              </div>

              {/* Study Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studyMethods.map((method) => (
                  <div key={method.name} className={`bg-gradient-to-br ${method.color} rounded-2xl border border-slate-200 p-6`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-3xl mb-2">{method.icon}</div>
                        <h3 className="text-xl font-bold text-slate-800">{method.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600">Time</div>
                        <div className="font-bold text-slate-800">{method.time}</div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4">{method.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-white/50 text-slate-700 rounded-full text-sm">
                        {method.level} Level
                      </span>
                      <button className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-white/90">
                        Try This Method
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* SOAP Method Detailed */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-white">
                    <GraduationCap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">SOAP Method - A Popular Approach</h3>
                    <p className="text-slate-600">Simple yet profound study technique</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    {
                      letter: 'S',
                      word: 'Scripture',
                      description: 'Write out the verse or passage',
                      color: 'bg-purple-100 text-purple-700'
                    },
                    {
                      letter: 'O',
                      word: 'Observation',
                      description: 'What does the text say?',
                      color: 'bg-blue-100 text-blue-700'
                    },
                    {
                      letter: 'A',
                      word: 'Application',
                      description: 'How does this apply to me?',
                      color: 'bg-emerald-100 text-emerald-700'
                    },
                    {
                      letter: 'P',
                      word: 'Prayer',
                      description: 'Respond to God based on this',
                      color: 'bg-amber-100 text-amber-700'
                    }
                  ].map((step) => (
                    <div key={step.letter} className="text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${step.color} text-3xl font-bold`}>
                        {step.letter}
                      </div>
                      <h4 className="font-bold text-slate-800 mb-2">{step.word}</h4>
                      <p className="text-sm text-slate-600">{step.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-white rounded-xl">
                  <h4 className="font-bold text-slate-800 mb-4">Example: John 3:16</h4>
                  <div className="space-y-4 text-sm text-slate-700">
                    <div>
                      <div className="font-medium text-purple-600">S:</div>
                      <p>"For God so loved the world that he gave his one and only Son..."</p>
                    </div>
                    <div>
                      <div className="font-medium text-blue-600">O:</div>
                      <p>God's motivation is love. The extent of His love is shown through giving His Son.</p>
                    </div>
                    <div>
                      <div className="font-medium text-emerald-600">A:</div>
                      <p>I should receive this love daily and extend it to others.</p>
                    </div>
                    <div>
                      <div className="font-medium text-amber-600">P:</div>
                      <p>Lord, thank you for your incredible love. Help me to live in it today.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Platform Features Designed for Growth
                </h2>
                <p className="text-lg text-slate-600">
                  Everything you need for a rich, meaningful Bible study experience.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformFeatures.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-slate-800">{feature.title}</h3>
                    </div>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Platform Tour */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">Platform Tour</h3>
                    <p className="text-slate-600">See how it all works together</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700">
                    Start Interactive Tour
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <Home className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Dashboard</h4>
                        <p className="text-slate-600">Your personalized home base with daily verses, stats, and quick actions.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100">
                        <Search className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Bible Reader</h4>
                        <p className="text-slate-600">Read with multiple translations, highlights, notes, and study tools.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-100">
                        <Layers className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Notes & Topics</h4>
                        <p className="text-slate-600">Organize insights by topic, tag, and review schedule.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <BarChart className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Review System</h4>
                        <p className="text-slate-600">Spaced repetition helps you remember what you learn.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-rose-100">
                        <MessageSquare className="h-5 w-5 text-rose-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Community</h4>
                        <p className="text-slate-600">Share insights and learn from other believers.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-indigo-100">
                        <Award className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Progress Tracking</h4>
                        <p className="text-slate-600">Visualize your growth and celebrate milestones.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h3>
            <p className="text-slate-600 mt-2">Common questions from beginners</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-50">
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                  <h4 className="font-bold text-slate-800">{faq.question}</h4>
                </div>
                <p className="text-slate-600 pl-8">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800">What Believers Are Saying</h3>
            <p className="text-slate-600 mt-2">Join thousands growing in faith</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonies.map((testimony, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{testimony.avatar}</div>
                  <div>
                    <div className="font-bold text-slate-800">{testimony.name}</div>
                    <div className="text-sm text-slate-600">{testimony.role}</div>
                  </div>
                </div>
                <p className="text-slate-700 italic">"{testimony.content}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of believers who are growing in their faith through daily Bible study.
              Your journey with God's Word starts today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-white text-purple-600 rounded-xl hover:bg-white/90 font-medium"
              >
                Start Reading Now
              </Link>
              <Link
                href="/register"
                className="px-8 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-medium"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleIntroduction;