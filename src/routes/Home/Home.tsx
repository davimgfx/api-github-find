import { useState } from "react";
import {
  Search,
  UserInfos,
  UserProjects,
  Error,
  Loading,
  UserFollowers
} from "../../components";
import {
  UserProps,
  UserReposProps,
  UserFollowingsProps,
} from "../../types/user.ts";
import "./Home.css";

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [currentUserRepos, setCurrentUserRepos] = useState<
    UserReposProps[] | null
  >(null);
  const [currentUserFollowers, setCurrentUserFollowers] =
    useState<UserFollowingsProps | null>(null);

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //load user Infos
  const loadUser = async function (userName: string) {
    setCurrentUser(null);
    setCurrentUserRepos(null);
    setError(false);
    const response = await fetch(`https://api.github.com/users/${userName}`);
    if (response.status === 404) {
      setError(true);
      setIsLoading(false);
      alert("User not found");
      return;
    }
    setIsLoading(true);
    const data = await response.json();

    setCurrentUser(data);
    setIsLoading(false);
  };

  //load user repositories
  const loadUserRepos = async function (userName: string) {
    setIsLoading(true);
    setCurrentUser(null);
    setCurrentUserRepos(null);
    setError(false);

    const responseRepos = await fetch(
      `https://api.github.com/users/${userName}/repos`
    );

    if (responseRepos.status === 404) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const dataRepos = await responseRepos.json();

    setCurrentUserRepos(dataRepos);
    setIsLoading(false);
  };

  //load user followers
  const loadUserFollowers = async function (userName: string) {
    setError(false);
    setCurrentUserRepos(null);
    const responseRepos = await fetch(
      `https://api.github.com/users/${userName}/followers`
    );

    if (responseRepos.status === 404) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const dataRepos = await responseRepos.json();
    setCurrentUserFollowers(dataRepos);
    setIsLoading(false);
    console.log(dataRepos);
  };

  return (
    <>
      <Search
        loadUser={loadUser}
        loadUserRepos={loadUserRepos}
        currentUser={currentUser}
        loadUserFollowers={loadUserFollowers}
      />

      {isLoading ? (
        <Loading />
      ) : (
        currentUser && (
          <div>
            <div className="user">
              <UserInfos {...currentUser} />
              {error && <Error />}
              {currentUserRepos !== null ? (
                <UserProjects currentUserRepos={currentUserRepos} />
              ) : (
                <UserFollowers currentUserFollowers={currentUserFollowers}/>
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Home;
