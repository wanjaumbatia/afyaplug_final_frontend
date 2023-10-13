import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userId, setUserId_] = useState(localStorage.getItem("userId"));
  const [role, setRole_] = useState(localStorage.getItem("role"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };
  const setUserId = (newUserId) => {
    setUserId_(newUserId);
  };
  const setRole = (newRole) => {
    setRole_(newRole);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    }
    if (role) {
      localStorage.setItem("role", role);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    }
  }, [token, userId, role]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      userId,
      role,
      setToken,
      setUserId,
      setRole
    }),
    [token, userId, role]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
