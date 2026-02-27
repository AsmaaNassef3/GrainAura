import {  useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AppProtected({children}) {
  
const { token} = useContext(AuthContext);

const navigate = useNavigate();
useEffect(() => { 
  if (!token) {
    navigate("/login");
  }
}, [token, navigate]);
  return (
    <>
      {children}
    </>
  )
}

export default AppProtected
