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
import User from "./components/User/User";
import BookDetails from "./components/Books/BookDetails";
import SearchResults from "./components/MainBody/SearchBar/SearchResults";
import PDFUpload from "./components/PdfRender/PDFUpload";
import { pdfjs } from "react-pdf";
import Notetaking from "./components/NOTE/Notetaking";
import Favourites from "./components/Features/Favourites/Favourites";
import CurrentRead from "./components/Features/Current Read/CurrentRead";
import RecentlyViewed from "./components/Features/RecentlyViewed/RecentlyViewed";
import Bookmark from "./components/Features/Bookmark/Bookmark";
import Gpt from "./components/GPT/Gpt";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
//import { jwtDecode } from "jwt-decode";
//import Testing from "./components/Testing";

const App = () => {
  //const [theuser, setTheUser] = useState(null);

  const dispatch = useDispatch();

  // const handleCallbackResponse = (response) => {
  //   console.log("Encoded JWT token:" + response.credential);
  //   var userObject = jwtDecode(response.credential);
  //   console.log(userObject);
  //   console.log("Google sign in called");
  //   setTheUser(userObject);
  //   dispatch(addtheUser(userObject));
  // };

  // const handleSignOut = () => {
  //   console.log("Google sign out called");
  //   setTheUser(null);
  //   dispatch(removetheUser());
  // };

  // const googleuser = useSelector((store) => store.user.theuser);

  // console.log(googleuser + "google");

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id:
  //       "",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  // }, []);

  const isLoading = useSelector((store) => store.user.isLoading);
  console.log(isLoading);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;

        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        localStorage.setItem("userAuthenticated", "true");
        localStorage.setItem("uid", encodeURIComponent(user.uid));
        dispatch(setisLoading(false));
      } else {
        // User is signed out
        dispatch(removeUser());
        localStorage.setItem("userAuthenticated", "false");
      }
    });

    // Unsubscribe when the component unmounts
    // After login and moving, there is no requirement of onAuth state, so return
    return () => unsubscribe();
  }, []);

  const user = useSelector(selectUser);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<FirstPage />} />
          {localStorage?.getItem("uid") && (
            <Route
              path="/book/:bookid"
              element={<BookDetails uid={localStorage?.getItem("uid")} />}
            />
          )}

          <Route path="/search/:query" element={<SearchResults />} />
          <Route
            path="/Login"
            element={
              localStorage?.getItem("userAuthenticated") === "true" ||
              user /*|| googleuser */ ? (
                <Navigate to="/MainBody" />
              ) : (
                <>
                  <Login />
                </>
              )
            }
          />
          <Route
            path="/MainBody"
            element={
              localStorage.getItem("userAuthenticated") === "true" || user ? (
                /*|| googleuser*/ <MainBody /*onSignOut={handleSignOut}*/ />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
          {/* {console.log(theuser + "available")} */}
          {/* <Route
            path="/MainBody"
            element={theuser ? <MainBody /> : <Navigate to="/Login" />}
          /> */}
          <Route path="/User" element={<User />} />
          <Route path="/Pdf" element={<PDFUpload />} />
          {localStorage?.getItem("uid") && (
            <Route
              path="/Note"
              element={<Notetaking userid={localStorage?.getItem("uid")} />}
            />
          )}
          {localStorage?.getItem("uid") && (
            <Route
              path="/favourites"
              element={<Favourites uid={localStorage?.getItem("uid")} />}
            />
          )}
          {localStorage?.getItem("uid") && (
            <Route
              path="/current-read"
              element={<CurrentRead uid={localStorage?.getItem("uid")} />}
            />
          )}
          {localStorage?.getItem("uid") && (
            <Route
              path="/recent"
              element={<RecentlyViewed uid={localStorage?.getItem("uid")} />}
            />
          )}
          {localStorage?.getItem("uid") && (
            <Route
              path="/bookmark"
              element={<Bookmark uid={localStorage?.getItem("uid")} />}
            />
          )}
          {localStorage?.getItem("uid") && (
            <Route
              path="/gpt"
              element={<Gpt/>}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
};
export default App;
