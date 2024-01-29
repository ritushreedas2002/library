import { useEffect } from "react";
import Body from "./Body";
import Navbar from "./Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";

const MainContainer=()=>{
    // const dispatch=useDispatch();
    // const navigate=useNavigate();
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //       if (user) {
    //         // User is signed in
    //         const { uid, email, displayName } = user;
    //         dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
    //         // ...
    //         navigate("/MainBody");
    //       } else {
    //         // User is signed out
    //         dispatch(removeUser());
    //         navigate("/");
    //       }
    //     });
      
    //     // Unsubscribe when the component unmounts
    //     // After login and moving, there is no requirement of onAuth state, so return
    //     return () => unsubscribe();
    //   }, [dispatch, navigate]);
    return (
        <div className="flex flex-col justify-center min-h-[100%] p-4"style={{
            backgroundImage: 'linear-gradient(90deg, rgba(239,219,26,1) 0%, rgba(245,236,139,1) 52%, rgba(239,241,204,1) 100%, rgba(159,184,88,1) 100%)' }}>
            <Navbar/>
            <Body/>
            
          </div>
    )
}
export default MainContainer;