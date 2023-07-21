import { useState } from "react";
import { Search, UserInfos} from "../../components";
import { UserProps } from "../../types/user.ts";

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  const loadUser = async function (userName: string) {
    const response = await fetch(`https://api.github.com/users/${userName}`);

    const data = await response.json();
    console.log(data)
    const { avatar_url, login, location, followers, following, html_url, bio, name } =
      data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
      html_url,
      bio,
      name
    };

    setCurrentUser(userData)
  };

  return (
    <>
      <Search loadUser={loadUser} />
      {currentUser && (<p><UserInfos {...currentUser}/></p>)}
      
    </>
  );
};

export default Home;
