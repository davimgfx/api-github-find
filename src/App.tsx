import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import "./index.css";
import  {ThemeContextType} from "./types/user.ts";


export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme} className="page">
        <Outlet />
      </div>
      </ThemeContext.Provider>
  );
}

export default App;
