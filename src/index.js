import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import appStore from './components/utils/appStore';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './components/Home/MainContainer';
import Login from './components/Login/Login';
import MainBody from './components/MainBody/MainBody';
import User from './components/User/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
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
    element: <MainBody/>,
  },
  {
    path: "/User",
    element: <User/>,
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
