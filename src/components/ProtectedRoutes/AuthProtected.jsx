import {  useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AuthProtected({children}) {
  
const{token } = useContext(AuthContext);

const navigate = useNavigate();
useEffect(() => { 
  if (token) {
    navigate("/home");
  }
}, [token, navigate]);
  return (
    <>
      {children}
    </>
  )
}

export default AuthProtected
