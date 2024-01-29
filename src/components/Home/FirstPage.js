
import MainContainer from "./MainContainer";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const FirstPage = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <MainContainer />,
//     },
//     {
//       path: "/Login",
//       element: <Login />,
//     },

//     {
//       path: "/MainBody",
//       element: <MainBody />,
//     },
//     {
//       path: "/User",
//       element: <User />,
//     },
//   ]);

// useEffect(()=>{
//     const unsubscribe=onAuthStateChanged(auth, (user) => {
//         if (user) {
//           // User is signed in, see docs for a list of available properties
//           // https://firebase.google.com/docs/reference/js/auth.user
//           const {uid,email,displayName} = user;
//           dispatch(addUser
//             ({uid:uid,email:email,displayName:displayName}));
//           // ...
//           navigate("/MainBody");
//         } else {
//             //Sign out
//           dispatch(removeUser());
//           navigate("/");
//         }
//       });
//         // Unsiubscribe when component unmounts
//         //after login and moving there is no requirement of onAuth state so return
//       return ()=>unsubscribe()
// },[])
  return (
    <MainContainer/>
  );
};

export default FirstPage;
