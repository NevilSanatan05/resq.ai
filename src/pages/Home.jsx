import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-teal-400">ResQ.AI</h1>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
          AI-powered disaster response platform helping citizens send SOS, rescue teams manage missions, 
          and administrators coordinate relief efforts in real-time.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            to="/citizen"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            🚨 Send SOS
          </Link>
          <Link
            to="/rescue"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            🛟 Rescue Dashboard
          </Link>
          <Link
            to="/admin"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
          >
            🖥️ Admin Panel
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
              View incoming SOS requests, accept missions, and update rescue status in real time.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-400">Admin Dashboard</h3>
            <p className="text-gray-300 mt-2">
              Monitor all activities, assign missions, and manage teams dynamically with one interface.
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

      {/* Call to Action */}
      <section className="text-center py-12 bg-gray-800 rounded-xl">
        <h2 className="text-3xl font-bold text-teal-400">Be Prepared, Stay Safe</h2>
        <p className="text-gray-300 mt-3">
          Join ResQ.AI and make disaster response faster, smarter, and safer.
        </p>
        <Link
          to="/citizen"
          className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
        >
          🚨 Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;
