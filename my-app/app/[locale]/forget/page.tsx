export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          {/* Image Section - Reusing the same image as register/login */}
          <div className="md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
            <img 
              src="https://i.pinimg.com/736x/76/31/8c/76318cbaebf3351de4065e6f831413f2.jpg" 
              alt="Password recovery illustration" 
              className="w-64 h-auto transform hover:scale-105 transition duration-300"
            />
          </div>
          
          {/* Form Section */}
          <div className="md:w-1/2">
            <form className="space-y-6">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Account Recovery
              </h2>

              <p className="text-sm text-gray-600 text-center">
                Enter your email to recover your username or reset your password
              </p>

              {/* Email Input */}
              <div className="relative">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </span>
              </div>

              {/* Recovery Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="forgot-username"
                    name="recovery-option"
                    type="radio"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    defaultChecked
                  />
                  <label htmlFor="forgot-username" className="ml-2 block text-sm text-gray-700">
                    Forgot Username
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="forgot-password"
                    name="recovery-option"
                    type="radio"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor="forgot-password" className="ml-2 block text-sm text-gray-700">
                    Forgot Password
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Recovery Email
                </button>
              </div>

              {/* Back to Login Link */}
              <div className="text-center text-sm pt-8">
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Back to Sign In
                  <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}