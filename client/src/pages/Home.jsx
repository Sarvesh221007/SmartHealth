import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center overflow-hidden">
        {/* Wave Background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180" style={{ zIndex: 0 }}>
          <svg className="relative block w-full h-40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,0 C600,120 600,0 1200,120 L1200,0 L0,0 Z" className="fill-white"></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Welcome to <span className="text-blue-600">Smart Health Journal</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Track your health, get AI-powered insights, and connect with doctors seamlessly.
            </p>

            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {!user ? (
                <>
                  <Link
                    to="/register"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:-translate-y-1 transition"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-semibold rounded-lg shadow-lg hover:from-gray-400 hover:to-gray-500 transform hover:-translate-y-1 transition"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1 transition"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://img.freepik.com/free-vector/medical-concept-illustration_114360-1579.jpg"
              alt="Health Journal"
              className="w-full max-w-md md:max-w-lg drop-shadow-xl rounded-lg animate-floating"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-blue-600">Track Symptoms</h3>
              <p className="text-gray-600">Log your symptoms and monitor health trends over time.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-blue-600">AI Insights</h3>
              <p className="text-gray-600">Receive AI-powered health suggestions and recommendations.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-blue-600">Connect with Doctors</h3>
              <p className="text-gray-600">Share your logs with doctors for professional guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready to start your health journey?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of users already tracking their health and getting actionable insights.
          </p>

          {!user && (
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:-translate-y-1 transition"
            >
              Sign Up Now
            </Link>
          )}
          {user && (
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transform hover:-translate-y-1 transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
