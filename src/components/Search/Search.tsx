import { useState, KeyboardEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./Search.css";
import logodark from "../../assets/logodark.png";
import { UserProps } from "../../types/user";

type SearchProps = {
  loadUser: (username: string) => Promise<void>;
  loadUserRepos: (username: string) => Promise<void>;
  loadUserFollowers: (username: string) => Promise<void>;
  currentUser: UserProps | null;
  setIsActive: (active: number) => void
  isActive: number 
};

const Search = ({
  loadUserFollowers,
  loadUser,
  loadUserRepos,
  currentUser,
  setIsActive,
  isActive
}: SearchProps) => {
  
  const [userName, setUserName] = useState("");
 

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loadUser(userName);
      loadUserRepos(userName);
      setUserName("")
    }
  };

  return (
    <>
      <div>
        <div className="items-search-bar">
          <img src={logodark} alt="logo" className="logo" />
          <div className="items-search-bar">
            <input
              type="text"
              placeholder="Search username..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-bar-input"
            />
            <SearchIcon
              sx={{
                fontSize: "3.1rem",
                background: "#CB6CE6",
                padding: "0.6rem",
                borderRadius: "999rem",
                cursor: "pointer",
                marginLeft: "-2.6rem",
              }}
              onClick={() => {
                loadUser(userName);
                loadUserRepos(userName);
                loadUserFollowers(userName);

                setUserName("")
              }}
            />
            <LightModeIcon
              sx={{
                fontSize: "3.1rem",
                background: "#CB6CE6",
                padding: "0.6rem",
                borderRadius: "999rem",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
      {currentUser && (
        <div className="buttons-controls">
          <h2
    className={`button-control ${isActive === 0 ? "activity-container" : "" } `}
            onClick={() => {
              loadUser(currentUser.login);
              loadUserRepos(currentUser.login);
              setIsActive(0)
            }}>
            Repositories
          </h2>
          <h2
            className={`button-control ${isActive === 1 ? "activity-container" : "" } `}
            onClick={() => {
              loadUserFollowers(currentUser.login);
              setIsActive(1)
            }}>
            Followers
          </h2>
          <h2 className={`button-control ${isActive === 2 ? "activity-container" : "" } `}>Following</h2>
        </div>
      )}
    </>
  );
};

export default Search;
