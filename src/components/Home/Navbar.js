import { Link } from "react-router-dom";

const Navbar=()=>{
    return (
        <header className="bg-purple-600 p-4 w-full mt-1">
        <nav className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">read it</div>
        <div className="flex items-center">
          <Link to="/" className="text-white hover:text-white px-4 py-2">Home</Link>
          <div className="relative group">
            <button className="text-white px-4 py-2">Browse</button>
            {/* <div className="absolute left-0 hidden group-hover:block bg-white shadow-lg mt-1">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 1</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 2</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Category 3</a>
            </div> */}
          </div>
          <a href="#" className="text-white px-4 py-2">My Books</a>
          <div className="relative group">
            <button className="text-white px-4 py-2">Contact Us</button>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"><Link to="/Login">Login</Link></button>
        </div>
        </nav>
      </header>
    )
}

export default Navbar;