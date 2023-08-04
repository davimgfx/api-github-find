import { useState } from "react";
import {
  Search,
  UserInfos,
  UserProjects,
  Error,
  Loading,
  UserFollowers,
  UserFollowing,
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
  const [currentUserRepos, setCurrentUserRepos] = useState<
    UserReposProps[] | null
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

  // Function to handle API calls
  const fetchData = async (url: string) => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch(url);
      if (!response.ok) {
        setError(true);
        setIsLoading(false);
        return null;
      }
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      setError(true);
      return null;
    }
  };

  //load user Infos
  const loadUser = async function (userName: string) {
    setCurrentUser(null);
    setCurrentUserRepos(null);
    const data = await fetchData(`https://api.github.com/users/${userName}`);
    if (data) {
      setCurrentUser(data);
    }
  };

  //load user repositories
  const loadUserRepos = async (userName: string) => {
    setCurrentUserRepos(null);
    const dataRepos = await fetchData(
      `https://api.github.com/users/${userName}/repos`
    );
    if (dataRepos) {
      setCurrentUserRepos(dataRepos);
    }
  };

  // Load user followers and update state
  const loadUserFollowers = async (userName: string) => {
    setCurrentUserFollowers(null);
    const dataFollowers = await fetchData(
      `https://api.github.com/users/${userName}/followers`
    );
    if (dataFollowers) {
      setCurrentUserFollowers(dataFollowers);
    }
  };

  // Load user following and update state
  const loadUserFollowing = async (userName: string) => {
    setCurrentUserFollowing(null);
    const dataFollowing = await fetchData(
      `https://api.github.com/users/${userName}/following`
    );
    if (dataFollowing) {
      setCurrentUserFollowing(dataFollowing);
    }
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
                currentUserFollowers={currentUserFollowers}
                setCurrentUser={setCurrentUser}
                loadUser={loadUser}
                loadUserRepos={loadUserRepos}
                loadUserFollowers={loadUserFollowers}
                setIsActive={setIsActive}
              />
            ) : (
              <UserFollowing
                currentUserFollowing={currentUserFollowing}
                loadUser={loadUser}
                loadUserRepos={loadUserRepos}
                loadUserFollowers={loadUserFollowers}
                setCurrentUser={setCurrentUser}
                setIsActive={setIsActive}
              />
            )}
          </div>
        )
      )}
    </>
  );
};

export default Home;
