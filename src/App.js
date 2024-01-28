import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/Home/MainContainer";
import Login from "./components/Login/Login";
import Test from "./components/Home/Test";
import 'swiper/swiper-bundle.css';
import  Sidebar  from "./components/Home/Sidebar";

//import User from "./components/User/User";
import ProfilePage from "./components/User/ProfilePage";
import User from "./components/User/User";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainContainer />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path:"/Sidebar",
      element:<Sidebar/>
    },
    
    {
      path:"/User",
      element:<User/>
    }
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
