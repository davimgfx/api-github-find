import { useState, KeyboardEvent } from "react";
import SearchIcon from '@mui/icons-material/Search';

type SearchProps = {
  loadUser: (username: string) => Promise<void>;
};

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loadUser(userName);
    }
  };

  return (
    <div>
      <h2>Find a User:</h2>
      <p>Know your best projects</p>
      <div>
        <input
          type="text"
          placeholder="Write the user name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => loadUser(userName)}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default Search;
