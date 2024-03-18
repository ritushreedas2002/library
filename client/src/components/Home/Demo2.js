const Demo2=()=>{
    return (
        <div className="bg-gray-100">
      <nav className="bg-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <a href="#" className="flex items-center text-gray-700">
                <span className="font-bold">MacBook Air</span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-5 px-3 text-gray-700 hover:text-gray-900">About Us</a>
              <a href="#" className="py-2 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">Login</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="https://placehold.co/1200x800" alt="Background with books and nature" />
        </div>
        <div className="relative bg-opacity-75 bg-gray-50 py-32 px-10 text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">READ IT</h1>
          <p className="text-2xl mb-10">Read it, feel it, live it—every story matters.</p>
          <button className="bg-red-500 text-white font-bold py-3 px-8 rounded-full hover:bg-red-600 transition duration-300">Get Started</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Project A</h3>
            </div>
            <div className="border-t border-gray-200">
              <img src="https://placehold.co/300x300" alt="Placeholder image for a book project" className="w-full" />
            </div>
          </div>
          {/* Repeat for other projects */}
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2024 Read It. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    )
}
export default Demo2;