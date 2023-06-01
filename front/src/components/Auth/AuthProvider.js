import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { decrypt } from "../util";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("userTimestamp");
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    const userTimestamp = localStorage.getItem("userTimestamp");
    if (userTimestamp) {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const elapsedMilliseconds = Date.now() - userTimestamp;
      if (elapsedMilliseconds >= oneDayInMilliseconds) {
        localStorage.removeItem("user");
        localStorage.removeItem("userTimestamp");
        setUser(null);
      }
    }
  }, []);

  const contextValue = {
    user,
    login(credentials_user) {
      setUser(credentials_user);
      localStorage.setItem("userTimestamp", Date.now());
    },
    logout() {
      const endpoint = (decrypt(user.type) == "0" ?
        'http://localhost:5000/ciudadano/logout' :
        'http://localhost:5000/admin/logout'
      );

      axios.post(endpoint, {}, {
        headers: {
          Authorization: 'Bearer ' + user.token,
        }
      })
        .then(response => {
          console.log(response);
          setUser(null);
        })
        .catch(error => {
          console.log(error);
        });
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;