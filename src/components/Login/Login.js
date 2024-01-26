import { useState } from "react";
import { useFormik } from "formik";
import * as Components from "./Components";
import "./style.css";
import { signUpSchema } from "./Validation";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/Firebase"
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Login = () => {
  const [signIn, setsignIn] = useState(true);
  const [errormessage,seterror]=useState(null);

  const handleSignUp = (values, action) => {
    console.log(values);
    action.resetForm();

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  const handleSignIn = (values, action) => {
    console.log(values);
    action.resetForm();

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(errorCode + "-" + errorMessage);
      });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setErrors } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();

    //   if (!signIn) {
    //     createUserWithEmailAndPassword(auth, values.email, values.password)
    //       .then((userCredential) => {
    //         // Signed up
    //         const user = userCredential.user;
    //         // ...
    //         console.log(user);
    //       })
    //       .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // Handle error
    //         console.log(errorCode);
    //       });
    //   }else{
    //     signInWithEmailAndPassword(auth, values.email, values.password)
    //     .then((userCredential) => {
    //           // Signed in 
    //       const user = userCredential.user;
    // // ...
    //       console.log(user)
    //     })
    //     .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     seterror(errorCode+"-"+errorMessage);
    // });

      //}
    },
  });

  const toggleEffect = () => {
    setsignIn(!signIn);
    console.log(signIn);
    setErrors({});
  };


  return (
    <>
        <div className="outline">
      <Components.Container>
        <Components.SignUpContainer signingin={signIn}>
          <Components.Form onSubmit={(values, action) => handleSignUp(values, action)}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              name="name"
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? <p className="form-error">{errors.name}</p> : null}
            <Components.Input
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? <p className="form-error">{errors.email}</p> : null}
            <Components.Input
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? <p className="form-error">{errors.password}</p> : null}
            <Components.Input
              name="confirm_password"
              type="password"
              autoComplete="off"
              placeholder="Confirm Password"
              value={values.confirm_password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error">{errors.confirm_password}</p>
            ) : null}
            <Components.Button>Sign Up</Components.Button>
            <hr />
            <div className="mt-3 flex items-center"><FcGoogle /> <span className="ml-2 text-sm text-blue-600">Sign Up</span></div>
            <div className="m-5"><Link to="/" className="text-blue-700 text-sm">{'Back to home'}</Link></div>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingin={signIn}>
          <Components.Form onSubmit={(values, action) => handleSignIn(values, action)}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Components.Input
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errormessage && <p className="text-sm text-red-500">{errormessage}</p>}
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            
            <Components.Button type="submit">Sign In</Components.Button>
            <div className="mt-3 flex items-center"><FcGoogle /> <span className="ml-2 text-sm text-blue-600">Sign In</span></div>
            <div className="m-5"><Link to="/" className="text-blue-700 text-sm">{'Back to home'}</Link></div>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingin={signIn}>
          <Components.Overlay signingin={signIn}>
            <Components.LeftOverlayPanel signingin={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us, please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={toggleEffect}>Sign In</Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingin={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start the journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={toggleEffect}>Sign Up</Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
    </>
  );
};

export default Login;
