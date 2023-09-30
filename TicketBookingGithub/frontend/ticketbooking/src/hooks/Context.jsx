import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [buses, setBuses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUser(user);
      }
    };
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, buses, setUser, setBuses }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
