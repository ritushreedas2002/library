import "swiper/swiper-bundle.css";
import FirstPage from "./components/Home/FirstPage";
import { Provider } from "react-redux";
import appStore from "./components/utils/appStore"
import MainContainer from "./components/Home/MainContainer";
import Login from "./components/Login/Login";
import MainBody from "./components/MainBody/MainBody";
import User from "./components/User/User";
import { RouterProvider, createBrowserRouter } from "react-router-dom";


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
      path: "/MainBody",
      element: <MainBody />,
    },
    {
      path: "/User",
      element: <User />,
    },
  ]);

  return (
    <Provider store={appStore}>
      <RouterProvider router={router}>
      <FirstPage/>
      </RouterProvider>
      </Provider>
  ); 
}
export default App;



