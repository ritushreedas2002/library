import "swiper/swiper-bundle.css";
import FirstPage from "./components/Home/FirstPage";
import { useSelector } from "react-redux";
import MainBody from "./components/MainBody/MainBody";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/utils/Firebase";
import { addUser, removeUser, selectUser, setisLoading } from "./components/utils/userSlice";
import { Navigate} from "react-router-dom";
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from "./components/Login/Login";

const  App=()=> {
  
  const dispatch = useDispatch();
  const isLoading=useSelector(store=>store.user.isLoading);
  console.log(isLoading);
  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        dispatch(setisLoading(false));
        
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });

    // Unsubscribe when the component unmounts
    // After login and moving, there is no requirement of onAuth state, so return
    return ()=>unsubscribe()
  }, []);

  const user = useSelector(selectUser);
  
  //console.log(user);


  return (
    
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route
            path="/Login"
            element={user ? <Navigate to="/MainBody" /> : <Login/>}
          />
          <Route
            path="/MainBody"
            element={user ? <MainBody /> : <Navigate to="/Login"/>}
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;