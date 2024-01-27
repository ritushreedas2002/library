import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/Home/MainContainer";
import Login from "./components/Login/Login";
import Test from "./components/Home/Test";
import 'swiper/swiper-bundle.css';

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
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
