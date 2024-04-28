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
          </div>
          <div className="relative group">
            <Link to ="/contact"><button className="text-white px-4 py-2">Contact Us</button></Link>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"><Link to="/Login">Login</Link></button>
        </div>
        </nav>
      </header>
    )
}

export default Navbar;