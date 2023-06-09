import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const result = await axios.post("http://localhost:4000/auth/login", data);
      const token = result.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);
      localStorage.setItem("username", JSON.stringify(userDataFromToken));
      setState({ ...state, error: null, user: userDataFromToken });
      navigate("/");
    } catch (error) {
      // console.log(error.response.data.message);
      setState({ ...state, error: error.response.data.message });
    }
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setState({ ...state, user: null });
  };

  //   const autoLogout = () => {
  //     const user = localStorage.getItem("username");
  //     if (user) {
  //       if (user.exp * 1000 < Date.now()) {
  //         alert("หมดเวลาเข้าสู่ระบบกรุณาล็อกอินอีกครั้ง");
  //         logout();
  //       }
  //     }
  //   };

  //   useEffect(() => {
  //     autoLogout();
  //   });

  // access admin role
  const role = localStorage
    .getItem("username")
    ?.split(",")[1]
    ?.split(":")[1]
    ?.split(`"`)[1];

  // access value of userId from storage
  const UserIdFromLocalStorage = Number(
    localStorage.getItem("username")?.split(",")[0]?.split(":")[1]
  );

  const isAuthenticated = Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        role,
        UserIdFromLocalStorage,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);
//return value context authcontext

export { AuthProvider, useAuth };
