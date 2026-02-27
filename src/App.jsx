
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './Layout/MainLayout'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import UserProfile from './Pages/UserProfile/UserProfile'
import NotFound from './Pages/NotFound/NotFound'
import AuthLayout from './Layout/AuthLayout'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'
import AppProtected from './components/ProtectedRoutes/AppProtected'
import AuthProtected from './components/ProtectedRoutes/AuthProtected'


const router = createBrowserRouter([
  { path: '', element:<AppProtected><MainLayout/></AppProtected> , children:[

    {index:true , element:<Navigate to = {"home"}/>},
    {path:'/home' , element:<NewsFeed/>},
    {path:'/profile' , element:<UserProfile/>},
   
  ]},
  {path:'',element:<AuthProtected><AuthLayout/></AuthProtected>, children:[

{path:'/login' , element:<Login/>},
{path:'/register' , element:<Register/>},




  ]},{
    path:'*' , element:<NotFound/>
  }
])



function App() {

  return (

  <RouterProvider router={router}/>
 
   
  )
}

export default App
