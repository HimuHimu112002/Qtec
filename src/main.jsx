import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebaseConfig from './firebaseConfir.js'
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './pages/Home.jsx'
import AllTask from './pages/AllTask.jsx'
import Completed from './pages/Completed.jsx'
import InCompleted from './pages/InCompleted.jsx'
import 'react-toastify/dist/ReactToastify.css';
let router = createBrowserRouter([
  {
    path: "/",
    element: <Home/> ,
  },
  {
    path: "/all",
    element: <AllTask></AllTask>,
  },
  {
    path: "/com",
    element: <Completed></Completed>,
  },
  {
    path: "/incom",
    element: <InCompleted></InCompleted>
  },
]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
