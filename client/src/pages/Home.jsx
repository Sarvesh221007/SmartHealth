import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* Hero Section with Wave Background */}
      <section className="relative bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center overflow-hidden">
        {/* SVG Wave Background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180" style={{ zIndex: 0 }}>
          <svg
            className="relative block w-full h-40"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
          >
            <path
              d="M0,0 C600,120 600,0 1200,120 L1200,0 L0,0 Z"
              className="fill-white"
            ></path>
          </svg>
        </div>

        <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text Content */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Welcome to <span className="text-blue-600">Smart Health Journal</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Track your health, get AI-powered insights, and connect with doctors seamlessly.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
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
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://img.freepik.com/free-vector/medical-concept-illustration_114360-1579.jpg?w=826&t=st=1693980074~exp=1693980674~hmac=38db1344ac5f23792df9aee7cbd13f8d55db3a8d7701dc2f5c8b3af5f1d92d95"
              alt="Health Journal"
              className="w-full max-w-md md:max-w-lg drop-shadow-xl rounded-lg animate-floating"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-blue-600">Track Symptoms</h3>
              <p className="text-gray-600">
                Easily log your symptoms and monitor your health progress over time.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-blue-600">AI Insights</h3>
              <p className="text-gray-600">
                Get AI-powered health suggestions and recommendations based on your logs.
              </p>
            </div>
            <div className="p-6 shadow-lg rounded-lg hover:shadow-xl transition transform hover:-translate-y-2">
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-blue-600">Connect with Doctors</h3>
              <p className="text-gray-600">
                Doctors can access your logs securely and provide professional guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to start your health journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of users already tracking their health and getting actionable insights.
          </p>
          <Link
            to="/register"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:-translate-y-1 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </>
  );
}
