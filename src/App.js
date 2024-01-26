
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/Home/MainContainer";
import Login from "./components/Login/Login";


function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<MainContainer/>
    },
   {
    path:"/Login",
    element:<Login/>
   }
    
  ])
  return (

    <RouterProvider router={router}>

    </RouterProvider>
      
    
 
  );
}

export default App;
