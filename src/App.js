import "swiper/swiper-bundle.css";
import FirstPage from "./components/Home/FirstPage";
import { useSelector } from "react-redux";
import MainBody from "./components/MainBody/MainBody";
 import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/utils/Firebase";
import { addUser, removeUser} from "./components/utils/userSlice";


function App() {
  const dispatch=useDispatch();
  const [isLoading,setisLoading]=useState(true);
    useEffect(() => {
      onAuthStateChanged(auth,(user) => {
      
      if (user) {
          // User is signed in
          const { uid, email, displayName } = user;
          dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
          setisLoading(false);
        
      }else {
        // User is signed out
        dispatch(removeUser());
        
      }
    });
  
    // Unsubscribe when the component unmounts
    // After login and moving, there is no requirement of onAuth state, so return
  }, []);

  const user=useSelector(store=>store.user.user)
  console.log(user);
  
  
  if (isLoading) {
    
    return <p>Loading...</p>;
  }
  
  return (
    <div className="app">
       <>
      {user ? <MainBody /> : <FirstPage />}
    </>
      
    </div>

  ); 
}
export default App;



