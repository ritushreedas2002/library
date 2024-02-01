import "swiper/swiper-bundle.css";
import FirstPage from "./components/Home/FirstPage";
import { useSelector } from "react-redux";
import MainBody from "./components/MainBody/MainBody";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/utils/Firebase";
import {
  addUser,
  addtheUser,
  removeUser,
  removetheUser,
  selectUser,
  setisLoading,
} from "./components/utils/userSlice";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { jwtDecode } from "jwt-decode";
import UserProfile from "./components/User/UserProfile";
import User from "./components/User/User";
import BookDetails from "./components/utils/BookDetails";


const App = () => {
  const [theuser, setTheUser] = useState(null);
  const dispatch = useDispatch();

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT token:" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    console.log("Google sign in called");
    setTheUser(userObject);
    dispatch(addtheUser(userObject));
  };

  const handleSignOut = () => {
    console.log("Google sign out called");
    setTheUser(null);
    dispatch(removetheUser());
  };

  const googleuser = useSelector((store) => store.user.theuser);

  console.log(googleuser + "google");

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "588472909417-ro3c81i7dlpusa7lpbh0flqb28dp5lrv.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const isLoading = useSelector((store) => store.user.isLoading);
  console.log(isLoading);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    return () => unsubscribe();
  }, []);

  const user = useSelector(selectUser);

  //console.log(user);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/book/:bookid" element={<BookDetails />} />
          <Route
            path="/Login"
            element={
              user || googleuser ? (
                <Navigate to="/MainBody" />
              ) : (
                <>
                  <Login />
                  {/* <div id="signInDiv"></div> */}
                </>
              )
            }
          />
          <Route
            path="/MainBody"
            element={
              user || googleuser ? (
                <MainBody onSignOut={handleSignOut} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          {console.log(theuser + "available")}
          {/* <Route
            path="/MainBody"
            element={theuser ? <MainBody /> : <Navigate to="/Login" />}
          /> */}
        </Routes>
      </div>
    </Router>
  );
};
export default App;
