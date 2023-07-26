import { useState, KeyboardEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./Search.css";
type SearchProps = {
  loadUser: (username: string) => Promise<void>;
  loadUserRepos: (username: string) => Promise<void>;
};

const Search = ({ loadUser, loadUserRepos }: SearchProps) => {
  const [userName, setUserName] = useState("");

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loadUser(userName);
      loadUserRepos(userName);
    }
  };

  return (
    <>
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
     
    </>
  );
};

export default Search;
