import  { useState } from "react";
import { Search, UserInfos, UserProjects, Error } from "../../components";
import { UserProps, UserReposProps } from "../../types/user.ts";
import logo from "../../assets/logodark.png";
import "./Home.css";

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [currentUserRepos, setCurrentUserRepos] = useState<
    UserReposProps[] | null
  >(null);
  const [error, setError] = useState<boolean>(false);

  const loadUser = async function (userName: string) {
    setCurrentUser(null);
    setCurrentUserRepos(null);
    setError(false);
    const response = await fetch(`https://api.github.com/users/${userName}`);

    if (response.status === 404) {
      setError(true);
      return;
    }

    const data = await response.json();

    setCurrentUser(data);
  };

  const loadUserRepos = async function (userName: string) {
    setCurrentUser(null);
    setCurrentUserRepos(null);
    setError(false);

    const responseRepos = await fetch(
      `https://api.github.com/users/${userName}/repos`
    );

    if (responseRepos.status === 404) {
      setError(true);
      return;
    }

    const dataRepos = await responseRepos.json();

    setCurrentUserRepos(dataRepos);
  };

  return (
    <>
      <div className="find-bar">
        <img src={logo} alt="logo" className="logo" />
        <Search loadUser={loadUser} loadUserRepos={loadUserRepos} />
      </div>
      {/* Options */}
      {currentUser && currentUserRepos && (
        <div className="buttons-controls">
          <h2 className="button-control activity-container">Repositories</h2>
          <h2 className="button-control ">Followers</h2>
          <h2 className="button-control">Following</h2>
        </div>
      )}
      {/* User infos e projects */}
      {currentUser && currentUserRepos && (
        <div className="user">
          <UserInfos {...currentUser} />
          {error && <Error />}
          {/* Pass 'error' prop here */}
          <UserProjects currentUserRepos={currentUserRepos} />
        </div>
      )}
    </>
  );
};

export default Home;
