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
  UserFollowersProps,
} from "../../types/user.ts";
import "./Home.css";

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [currentUserRepos, setCurrentUserRepos] = useState<
    UserReposProps[] | null
  >(null);
  const [currentUserFollowers, setCurrentUserFollowers] =
    useState<UserFollowersProps[] | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>(0);

  console.log(currentUser)
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
        setIsActive={setIsActive}
        isActive={isActive}
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
                <UserFollowers setCurrentUser={setCurrentUser} currentUserFollowers={currentUserFollowers} loadUser={loadUser} loadUserRepos={loadUserRepos} loadUserFollowers={loadUserFollowers} setIsActive={setIsActive} />
              )}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Home;
