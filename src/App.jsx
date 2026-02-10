
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './Layout/MainLayout'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import UserProfile from './Pages/UserProfile/UserProfile'
import NotFound from './Pages/NotFound/NotFound'
import AuthLayout from './Layout/AuthLayout'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'


const router = createBrowserRouter([
  { path: '', element:<MainLayout/> , children:[

    {index:true , element:<Navigate to = {"home"}/>},
    {path:'/home' , element:<NewsFeed/>},
    {path:'/profile' , element:<UserProfile/>},
    {path:'*' , element:<NotFound/>}
  ]},
  {path:'',element:<AuthLayout/>, children:[

{path:'/login' , element:<Login/>},
{path:'/register' , element:<Register/>},




  ]}
])



function App() {

  return (

  <RouterProvider router={router}/>
 
   
  )
}

export default App
