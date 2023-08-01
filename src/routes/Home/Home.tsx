import { useState } from "react";
import {
  Search,
  UserInfos,
  UserProjects,
  Error,
  Loading,
  UserFollowers,
  UserFollowing
} from "../../components";
import {
  UserProps,
  UserReposProps,
  UserFollowersProps,
  UserFollowingsProps,
} from "../../types/user.ts";
import "./Home.css";

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [currentUserRepos, setCurrentUserRepos] = useState<UserReposProps[] 
>(null);
  const [currentUserFollowers, setCurrentUserFollowers] = useState<
    UserFollowersProps[] | null
  >(null);
  const [currentUserFollowing, setCurrentUserFollowing] = useState<
    UserFollowingsProps[] | null
  >(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<number>(0);
  console.log(currentUser);
  
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

  const loadUserFollowing = async function (userName: string) {
    setError(false);
    setCurrentUserRepos(null);
    setCurrentUserFollowers(null);
    const responseRepos = await fetch(
      `https://api.github.com/users/${userName}/following`
    );

    if (responseRepos.status === 404) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const dataRepos = await responseRepos.json();
    setCurrentUserFollowing(dataRepos);
    setIsLoading(false);
    console.log(dataRepos);
  };

  return (
    <>
      <Search
        currentUser={currentUser}
        loadUser={loadUser}
        loadUserRepos={loadUserRepos}
        loadUserFollowers={loadUserFollowers}
        loadUserFollowing={loadUserFollowing}
        setIsActive={setIsActive}
        isActive={isActive}
      />

      {isLoading ? (
        <Loading />
      ) : (
        currentUser && (
         <div className="user">
              <UserInfos {...currentUser} />
              {error && <Error />}
              {currentUser && isActive === 0 ? (
                <UserProjects currentUserRepos={currentUserRepos} />
              ) : isActive === 1 ? (
                <UserFollowers
                  setCurrentUser={setCurrentUser}
                  currentUserFollowers={currentUserFollowers}
                  loadUser={loadUser}
                  loadUserRepos={loadUserRepos}
                  loadUserFollowers={loadUserFollowers}
                  setIsActive={setIsActive}
                />
              ) : (
                <UserFollowing currentUserFollowing={currentUserFollowing} />
              )}
            </div>
        )
      )}
    </>
  );
};

export default Home;
