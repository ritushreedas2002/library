import { useState } from "react";
import { useFormik } from "formik";

import * as Components from "./Components";
import "./style.css";
import { auth, provider } from "../utils/Firebase";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
} from "@firebase/auth"; // Replace with actual import from your firebase auth library
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addUser, addtheUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

//import { addUser, removeUser } from "../utils/userSlice";

const Login = () => {
  const [signIn, setsignIn] = useState(true);
  const [errormessage, seterror] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //const selector=useSelector(store=>store.user);
  const signUpValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const signInValues = {
    email: "",
    password: "",
  };

  // Sign Up schema
  const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Sign In schema
  const signInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Sign Up form
  const {
    values: signUpFormValues,
    handleSubmit: handleSignUp,
    handleChange: handleSignUpChange,
    handleBlur: handleSignUpBlur,
    errors: signUpErrors,
    touched: signUpTouched,
    setErrors: setSignUpErrors,
    resetForm: resetSignUpForm,
  } = useFormik({
    initialValues: signUpValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      handleSignUpSubmit(values, resetSignUpForm);
    },
  });

  // Sign In form
  const {
    values: signInFormValues,
    handleSubmit: handleSignIn,
    handleChange: handleSignInChange,
    handleBlur: handleSignInBlur,
    errors: signInErrors,
    touched: signInTouched,
    setErrors: setSignInErrors,
    resetForm: resetSignInForm,
  } = useFormik({
    initialValues: signInValues,
    validationSchema: signInSchema,
    onSubmit: (values) => {
      handleSignInSubmit(values, resetSignInForm);
    },
  });

  const handleSignUpSubmit = async (values, resetForm) => {
    try {
      console.log("SignUp call at first sign up");
      console.log(values);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      console.log(user);
      updateProfile(user, {
        displayName: values.name,
      })
        .then(() => {
          // Profile updated!
          // ...
          const { uid, email, displayName } = auth.currentUser; //updated value
          dispatch(
            addUser({ uid: uid, email: email, displayName: displayName })
          );
          localStorage.setItem("userAuthenticated", "true");
          navigate("/MainBody");
          // Redirect to MainBody

          //navigate("/MainBody")
          
        })
        .catch((error) => {
          // An error occurred

          seterror(error.message);
        });

      console.log("Sign Up Successful");
      resetForm();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      seterror(`${errorCode} - ${errorMessage}`);
      setSignUpErrors({}); // Clear form errors
    }
  };
  const handleGoogleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        localStorage.setItem("userAuthenticated", "true");
        navigate("/MainBody");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleSignInSubmit = async (values, resetForm) => {
    try {
      console.log(values);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      localStorage.setItem("userAuthenticated", "true");
      console.log(user);
      navigate("/MainBody");
      console.log("Sign In Successful");
      resetForm();

      // Redirect to MainBody
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      seterror(`${errorCode} - ${errorMessage}`);
      setSignInErrors({}); // Clear form errors
    }
  };

  const toggleEffect = () => {
    setsignIn(!signIn);
    seterror(null);
    setSignUpErrors({});
    setSignInErrors({});
    resetSignUpForm();
    resetSignInForm();
  };

  return (
    <>
      <div className="outline">
        <Components.Container>
          <Components.SignUpContainer signingin={signIn}>
            <Components.Form onSubmit={handleSignUp}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                name="name"
                type="text"
                placeholder="Name"
                value={signUpFormValues.name}
                onChange={handleSignUpChange}
                onBlur={handleSignUpBlur}
              />
              {signUpErrors.name && signUpTouched.name ? (
                <p className="form-error">{signUpErrors.name}</p>
              ) : null}
              <Components.Input
                name="email"
                type="email"
                placeholder="Email"
                value={signUpFormValues.email}
                onChange={handleSignUpChange}
                onBlur={handleSignUpBlur}
              />
              {signUpErrors.email && signUpTouched.email ? (
                <p className="form-error">{signUpErrors.email}</p>
              ) : null}
              <Components.Input
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Password"
                value={signUpFormValues.password}
                onChange={handleSignUpChange}
                onBlur={handleSignUpBlur}
              />
              {signUpErrors.password && signUpTouched.password ? (
                <p className="form-error">{signUpErrors.password}</p>
              ) : null}
              <Components.Input
                name="confirm_password"
                type="password"
                autoComplete="off"
                placeholder="Confirm Password"
                value={signUpFormValues.confirm_password}
                onChange={handleSignUpChange}
                onBlur={handleSignUpBlur}
              />
              {signUpErrors.confirm_password &&
              signUpTouched.confirm_password ? (
                <p className="form-error">{signUpErrors.confirm_password}</p>
              ) : null}
              <Components.Button>Sign Up</Components.Button>
              <hr />
              <div className="mt-3 flex items-center">
                <FcGoogle />{" "}
                <span className="ml-2 text-sm text-blue-600">Sign Up</span>
              </div>
              <div className="m-5">
                <Link to="/" className="text-blue-700 text-sm">
                  {"Back to home"}
                </Link>
              </div>
            </Components.Form>
          </Components.SignUpContainer>
          <Components.SignInContainer signingin={signIn}>
            <Components.Form onSubmit={handleSignIn}>
              <Components.Title>Sign in</Components.Title>
              <Components.Input
                name="email"
                type="email"
                placeholder="Email"
                value={signInFormValues.email}
                onChange={handleSignInChange}
                onBlur={handleSignInBlur}
              />
              {signInErrors.email && signInTouched.email ? (
                <p className="form-error">{signInErrors.email}</p>
              ) : null}
              <Components.Input
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Password"
                value={signInFormValues.password}
                onChange={handleSignInChange}
                onBlur={handleSignInBlur}
              />
              {signInErrors.password && signInTouched.password ? (
                <p className="form-error">{signInErrors.password}</p>
              ) : null}
              {errormessage && (
                <p className="text-sm text-red-500">{errormessage}</p>
              )}
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>

              <Components.Button>Sign In</Components.Button>
              <div
                className="mt-3 flex items-center cursor-pointer "
                onClick={handleGoogleSignIn}
              >
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const userObject = jwtDecode(
                      credentialResponse?.credential
                    );
                    console.log(userObject);
                    dispatch(addtheUser(userObject));
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />  */}
                <div id="signInDiv"></div>
                <FcGoogle />{" "}
                <span className="ml-2 text-sm text-blue-600">Sign In</span>
              </div>
              <div className="m-5">
                <Link to="/" className="text-blue-700 text-sm">
                  {"Back to home"}
                </Link>
              </div>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signingin={signIn}>
            <Components.Overlay signingin={signIn}>
              <Components.LeftOverlayPanel signingin={signIn}>
                <Components.Title>Welcome Back!</Components.Title>
                <Components.Paragraph>
                  To keep connected with us, please login with your personal
                  info
                </Components.Paragraph>
                <Components.GhostButton onClick={toggleEffect}>
                  Sign In
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingin={signIn}>
                <Components.Title>Hello, Friend!</Components.Title>
                <Components.Paragraph>
                  Enter your personal details and start the journey with us
                </Components.Paragraph>
                <Components.GhostButton onClick={toggleEffect}>
                  Sign Up
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
      </div>
      {/* <div id="signInDiv"></div> */}
    </>
  );
};

export default Login;
