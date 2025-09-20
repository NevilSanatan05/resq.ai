import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="space-y-16 relative">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg">
        {/* Animated Heading - Split */}
        <motion.h1
          className="text-5xl font-extrabold text-teal-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          ResQ.AI
        </motion.h1>

        <motion.h2
  className="text-3xl font-semibold text-gray-300 mt-4"
  animate={{ opacity: [1, 1, 1] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    repeatType: "mirror",
    delay: 1, // start 1 second after main heading
    ease: "easeInOut",
  }}
>
  Your Safety, Our Priority
</motion.h2>

        {/* Animated Paragraph */}
        <motion.p
          className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }} // Appears after heading
        >
          AI-powered disaster response platform helping citizens send SOS, rescue teams manage missions, 
          and administrators coordinate relief efforts in real-time.
        </motion.p>

        {/* Buttons */}
        <div className="mt-6 space-x-4">
          <Link
            to="/citizen"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            Send SOS
          </Link>
          <Link
            to="/rescue-dashboard"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            Rescue Dashboard
          </Link>
          <Link
            to="/admin-dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            Admin Panel
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-400">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-red-400">Citizen SOS</h3>
            <p className="text-gray-300 mt-2">
              Send instant SOS requests with live location and details during disasters.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-green-400">Rescue Team</h3>
            <p className="text-gray-300 mt-2">
              Coordinate rescue missions and track teams in real-time.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-400">Admin Panel</h3>
            <p className="text-gray-300 mt-2">
              Monitor overall operations, reports, and emergency management dashboards.
            </p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-400">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">1. SOS Alert</h3>
            <p className="text-gray-300 mt-2">
              Citizens trigger SOS with location + message.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">2. Rescue Dispatch</h3>
            <p className="text-gray-300 mt-2">
              Rescue teams receive alerts and accept missions.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-xl font-semibold">3. Admin Oversight</h3>
            <p className="text-gray-300 mt-2">
              Admins monitor & coordinate teams in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Disasters Section */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-400 mb-3">Recent Disasters</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">These tragic events demonstrate why effective disaster management systems like ResQ.AI are critically needed across India</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Vaishno Devi Incident */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-red-500">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-semibold text-sm">12 Lives Lost</div>
              <div className="h-52 bg-gray-700 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202201/vaishno_devi_stampede_1200x768.jpeg" 
                  alt="Vaishno Devi Stampede" 
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x200?text=Vaishno+Devi+Incident";
                  }}
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                <span className="text-gray-400 text-sm">January 1, 2022</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vaishno Devi Stampede</h3>
              <p className="text-gray-300">
                A tragic stampede at the Mata Vaishno Devi shrine in Jammu and Kashmir claimed 12 lives and injured 15 others during New Year celebrations. The incident highlighted the critical need for better crowd management systems.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-red-400 mr-2">⚠️</span>
                  <span className="text-sm text-gray-400">Crowd Management Failure</span>
                </div>
                <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">Read More →</button>
              </div>
            </div>
          </div>
          
          {/* Kashmir Floods */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-blue-500">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg font-semibold text-sm">32+ Casualties</div>
              <div className="h-52 bg-gray-700 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://media.assettype.com/outlookindia/2025-08-28/j3a7b1j2c/AP25238568370139.jpg?w=801&auto=format,compress&fit=max&format=webp&dpr=1.0" 
                  alt="Kashmir Floods" 
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x200?text=Kashmir+Floods";
                  }}
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                <span className="text-gray-400 text-sm">July 2023</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Kashmir Floods</h3>
              <p className="text-gray-300">
                Devastating floods in Kashmir's Kishtwar district after a cloudburst triggered flash floods killed at least 32 people. Rescue operations faced challenges from difficult terrain, highlighting the need for advanced disaster response systems.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-blue-400 mr-2">🌊</span>
                  <span className="text-sm text-gray-400">Flash Flood Emergency</span>
                </div>
                <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">Read More →</button>
              </div>
            </div>
          </div>
          
          {/* Landslides */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-green-500">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg font-semibold text-sm">420+ Lives Lost</div>
              <div className="h-52 bg-gray-700 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://media.assettype.com/newindianexpress/2024-07-31/73qfxwp1/New_Project_40_.jpg?rect=0,117,1200,675&w=480&auto=format,compress&fit=max" 
                  alt="Wayanad Landslides" 
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x200?text=Landslides";
                  }}
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-gray-400 text-sm">July 2024</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Wayanad Landslides</h3>
              <p className="text-gray-300">
                The deadliest landslide in Kerala's history claimed over 420 lives and injured nearly 400 people. Climate change has increased rainfall intensity by 10%, highlighting the urgent need for better early warning systems.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">🏔️</span>
                  <span className="text-sm text-gray-400">Climate Change Impact</span>
                </div>
                <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">Read More →</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 inline-flex items-center">
            <span>View All Disaster Reports</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

      {/* Why ResQ.AI is Needed */}
      <section className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-12">
          <span className="bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-semibold mb-3 inline-block">CRITICAL NEED</span>
          <h2 className="text-4xl font-bold text-teal-400 mb-4">Why ResQ.AI is Needed</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Traditional disaster response systems are failing to meet the challenges of increasing natural disasters across India</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border-l-4 border-red-500 hover:transform hover:scale-105 transition duration-300">
            <div className="bg-red-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <span className="text-red-400 text-3xl">⏱️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Critical Response Time</h3>
            <p className="text-gray-300 mb-4">
              In disasters like the Vaishno Devi stampede, every minute counts. ResQ.AI reduces response time by 60%, potentially saving thousands of lives annually.
            </p>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-red-400 font-semibold">60%</span>
                </div>
                <span className="text-gray-400 text-sm">Faster Response</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border-l-4 border-blue-500 hover:transform hover:scale-105 transition duration-300">
            <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <span className="text-blue-400 text-3xl">🔄</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Coordination Challenges</h3>
            <p className="text-gray-300 mb-4">
              During the 2023 North India floods, rescue efforts were hampered by poor coordination. ResQ.AI's platform ensures seamless communication between all stakeholders.
            </p>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-blue-400 font-semibold">85%</span>
                </div>
                <span className="text-gray-400 text-sm">Better Coordination</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg border-l-4 border-green-500 hover:transform hover:scale-105 transition duration-300">
            <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <span className="text-green-400 text-3xl">📊</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Data-Driven Decisions</h3>
            <p className="text-gray-300 mb-4">
              The Himachal Pradesh landslides affected over 1,300 roads. ResQ.AI's real-time analytics help authorities allocate resources efficiently based on actual needs.
            </p>
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400 font-semibold">73%</span>
                </div>
                <span className="text-gray-400 text-sm">Resource Optimization</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{width: '73%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-green-500/20 p-6 rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold text-white mb-2">Every Second Counts in Disaster Response</h3>
              <p className="text-gray-300">Join us in revolutionizing how India responds to emergencies and natural disasters.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 inline-flex items-center">
                <span>Learn How ResQ.AI Works</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Impact of ResQ.AI */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <span className="bg-teal-500/20 text-teal-400 px-4 py-1 rounded-full text-sm font-semibold mb-3 inline-block">REAL RESULTS</span>
          <h2 className="text-4xl font-bold text-teal-400 mb-4">The Impact of ResQ.AI</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Our platform is already making a difference in disaster response across India</p>
        </div>
        
        {/* Numerical Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border-t-4 border-teal-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-5xl font-bold text-teal-400 mb-2 flex items-baseline">
              60<span className="text-2xl ml-1">%</span>
            </div>
            <p className="text-white font-medium">Faster Response Time</p>
            <div className="mt-4 h-1 w-16 bg-teal-500 rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border-t-4 border-blue-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-5xl font-bold text-blue-400 mb-2 flex items-baseline">
              85<span className="text-2xl ml-1">%</span>
            </div>
            <p className="text-white font-medium">Better Resource Allocation</p>
            <div className="mt-4 h-1 w-16 bg-blue-500 rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border-t-4 border-green-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-5xl font-bold text-green-400 mb-2 flex items-baseline">
              1000<span className="text-2xl ml-1">+</span>
            </div>
            <p className="text-white font-medium">Lives Potentially Saved</p>
            <div className="mt-4 h-1 w-16 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg border-t-4 border-purple-500 transform transition-all duration-300 hover:scale-105">
            <div className="text-5xl font-bold text-purple-400 mb-2 flex items-baseline">
              24<span className="text-2xl ml-1">hr</span>
            </div>
            <p className="text-white font-medium">Continuous Monitoring</p>
            <div className="mt-4 h-1 w-16 bg-purple-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Community Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="h-8 w-8 text-teal-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              Community Benefits
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-teal-500/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="h-5 w-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Improved Emergency Preparedness</h4>
                  <p className="text-gray-300 mt-1">Vulnerable communities now have better tools and training to prepare for disasters</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-500/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="h-5 w-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Enhanced Coordination</h4>
                  <p className="text-gray-300 mt-1">Seamless communication between government agencies, NGOs, and rescue teams</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <svg className="h-8 w-8 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Data-Driven Results
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Real-time Analytics</h4>
                  <p className="text-gray-300 mt-1">Comprehensive data collection enables better disaster management planning</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500/20 p-2 rounded-full mr-4 mt-1">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Economic Impact</h4>
                  <p className="text-gray-300 mt-1">Reduced financial burden of natural disasters through efficient resource allocation</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Testimonial */}
        <div className="mt-12 bg-gradient-to-r from-teal-500/10 to-blue-500/10 p-8 rounded-xl relative">
          <svg className="absolute text-teal-500/20 h-24 w-24 -top-6 -left-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <div className="text-center">
            <p className="text-xl text-gray-300 italic mb-6">"ResQ.AI's platform was instrumental during the recent floods in our district. The coordination between rescue teams and real-time updates saved countless lives."</p>
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-teal-500/20 flex items-center justify-center mr-3">
                <span className="text-teal-400 text-xl font-bold">RK</span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white">Rajesh Kumar</h4>
                <p className="text-gray-400">District Disaster Management Officer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left side - Image and impact */}
            <div className="bg-gradient-to-br from-teal-500/30 to-blue-500/30 p-8 md:p-12 flex flex-col justify-center">
              <span className="bg-teal-500/30 text-teal-300 px-4 py-1 rounded-full text-sm font-semibold mb-6 inline-block w-fit">MAKE A DIFFERENCE</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Support <span className="text-teal-400">Saves Lives</span></h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-300"><span className="text-white font-semibold">100%</span> of donations go directly to improving disaster response</p>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-300"><span className="text-white font-semibold">₹1,000</span> can provide emergency supplies to 5 families</p>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                    <svg className="h-5 w-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <p className="text-gray-300"><span className="text-white font-semibold">₹5,000</span> helps train 10 community volunteers</p>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-xs text-white font-medium">
                        {['SK', 'AM', 'RJ', 'PK'][i]}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">Joined <span className="text-white">2,500+</span> donors</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Donation form */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-6">Support Our Mission</h3>
              <p className="text-gray-300 mb-8">
                Your donation helps us improve our platform and reach more communities in need. Every contribution makes a difference in disaster response efforts.
              </p>
              
              {/* Donation Form Content (placeholder) */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-400">Choose Amount</label>
                  <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button type="button" className="bg-gray-700 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">₹500</button>
                    <button type="button" className="bg-gray-700 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">₹1,000</button>
                    <button type="button" className="bg-gray-700 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">₹2,000</button>
                    <button type="button" className="bg-gray-700 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">Custom</button>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400">Full Name</label>
                  <input type="text" id="name" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white focus:ring-teal-500 focus:border-teal-500" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email Address</label>
                  <input type="email" id="email" className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white focus:ring-teal-500 focus:border-teal-500" placeholder="johndoe@example.com" />
                </div>
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-6">Donate Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-teal-400">ResQ.AI</span>
            </div>
            <p className="text-sm">&copy; 2025 ResQ.AI. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;