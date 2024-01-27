import { useState } from "react";
import { useFormik } from "formik";

import * as Components from "./Components";
import "./style.css";
import { auth } from "../utils/Firebase";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth"; // Replace with actual import from your firebase auth library
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Login2 = () => {
  const [signIn, setsignIn] = useState(true);
  const [errormessage, seterror] = useState(null);

  // const handleSignUp = (values, action) => {
  //   console.log(values);
  //   action.resetForm();

  //   createUserWithEmailAndPassword(auth, values.email, values.password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode);
  //     });
  // };

  // const handleSignIn = (values, action) => {
  //   console.log(values);
  //   action.resetForm();

  //   signInWithEmailAndPassword(auth, values.email, values.password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       seterror(errorCode + "-" + errorMessage);
  //     });
  // };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setErrors,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();

      if (!signIn) {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed up
            console.log("User created successfully");
            const user = userCredential.user;
            // ...
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle error
            console.log(errorCode);
          });
      } else {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            // Signed in
            console.log("Signed in successfully");
            const user = userCredential.user;
            // ...
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterror(errorCode + "-" + errorMessage);
          });
      }
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

  const handleSignInSubmit = async (values, resetForm) => {
    try {
      console.log(values);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log(user);

      console.log("Sign In Successful");
      resetForm();
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
              <div className="mt-3 flex items-center">
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
    </>
  );
};
export default Login2;
