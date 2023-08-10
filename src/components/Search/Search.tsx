import { useState, KeyboardEvent, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./Search.css";
import logodark from "../../assets/logodark.png";
import logolight from "../../assets/logowhite.png";
import { UserProps } from "../../types/user";
import { ThemeContext } from "../../App";

type SearchProps = {
  loadUser: (username: string) => Promise<void>;
  loadUserRepos: (username: string) => Promise<void>;
  loadUserFollowers: (username: string) => Promise<void>;
  loadUserFollowing: (username: string) => Promise<void>;
  currentUser: UserProps | null;
  setIsActive: (active: number) => void;
  isActive: number;
};
import { ThemeContextType } from "../../types/user";

const Search = ({
  loadUserFollowers,
  loadUser,
  loadUserRepos,
  currentUser,
  setIsActive,
  isActive,
  loadUserFollowing,
}: SearchProps) => {
  const [userName, setUserName] = useState("");
  const { theme, toggleTheme }: ThemeContextType = useContext(ThemeContext) ?? {
    theme: "light",
    toggleTheme: () => {},
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loadUser(userName);
      loadUserRepos(userName);
      setIsActive(0);
      setUserName("");
    }
  };

  const toggleDarkMode = () => {
    toggleTheme();
  };

  return (
    <>
      <div>
        <div className={`items-search-bar ${theme}`}>
          <img
            src={theme === "dark" ? logodark : logolight}
            alt="logo"
            className="logo"
          />
          <div className="items-search-bar">
            <input
              type="text"
              placeholder="Search username..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`search-bar-input ${
                theme === "light" ? "border-on" : ""
              }`}
            />
            <SearchIcon
              sx={{
                fontSize: "3.1rem",
                background: "#CB6CE6",
                padding: "0.6rem",
                borderRadius: "999rem",
                cursor: "pointer",
                marginLeft: "-2.6rem",
                color: "white",
              }}
              onClick={() => {
                loadUser(userName);
                loadUserRepos(userName);
                loadUserFollowers(userName);

                setUserName("");
              }}
            />
            <LightModeIcon
              sx={{
                fontSize: "3.1rem",
                background: "#CB6CE6",
                padding: "0.6rem",
                borderRadius: "999rem",
                cursor: "pointer",
                color: "white",
              }}
              onClick={toggleDarkMode}
            />
          </div>
        </div>
      </div>
      {currentUser && (
        <div className="buttons-controls">
          <h2
            className={`button-control ${
              isActive === 0 ? "activity-container" : ""
            } `}
            onClick={() => {
              loadUser(currentUser.login);
              loadUserRepos(currentUser.login);
              setIsActive(0);
            }}>
            Repositories
          </h2>
          <h2
            className={`button-control ${
              isActive === 1 ? "activity-container" : ""
            } `}
            onClick={() => {
              loadUserFollowers(currentUser.login);
              setIsActive(1);
            }}>
            Followers
          </h2>
          <h2
            className={`button-control ${
              isActive === 2 ? "activity-container" : ""
            } `}
            onClick={() => {
              loadUserFollowing(currentUser.login);
              setIsActive(2);
            }}>
            Following
          </h2>
        </div>
      )}
    </>
  );
};

export default Search;
