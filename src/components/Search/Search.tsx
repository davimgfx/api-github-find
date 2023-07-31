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
};

const Search = ({
  loadUserFollowers,
  loadUser,
  loadUserRepos,
  currentUser,
}: SearchProps) => {
  const [userName, setUserName] = useState("");

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loadUser(userName);
      loadUserRepos(userName);
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
            className="button-control activity-container"
            onClick={() => {
              loadUser(userName);
              loadUserRepos(userName);
            }}>
            Repositories
          </h2>
          <h2
            className="button-control"
            onClick={() => {
              loadUserFollowers(userName);
            }}>
            Followers
          </h2>
          <h2 className="button-control">Following</h2>
        </div>
      )}
    </>
  );
};

export default Search;
