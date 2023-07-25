import { UserProps } from "../../types/user";
import GroupIcon from "@mui/icons-material/Group";
import PlaceIcon from "@mui/icons-material/Place";
import LaunchIcon from "@mui/icons-material/Launch";
import "./UserInfos.css";

const UserInfos = ({
  avatar_url,
  login,
  location,
  followers,
  following,
  html_url,
  bio,
  name,
}: UserProps) => {
  const openGitHubProfile = () => {
    window.open(html_url, "_blank"); // This will open the link in a new tab
  };
  return (
    <>
      <article className="profile-infos">
        <a href={html_url} target="_blanket">
          <img src={avatar_url} alt={login} className="img-profile" />
        </a>
        <div className="info-names-profile">
          <h2>{name}</h2>
          <p>{login}</p>
        </div>
        <p className="info-bio-profile">{bio}</p>
        <button className="info-bio-button" onClick={openGitHubProfile}>
          {" "}
          <LaunchIcon /> See on GitHub
        </button>
        <div className="followers-profile">
          <div className="followers-profile-names">
            <h2>
              {" "}
              <GroupIcon
                sx={{
                  transform: "translateY(0.2rem)",
                  color: "#7D8590",
                }}
              />{" "}
              {followers} <span className="highlight">followers</span> ·{" "}
              {following} <span className="highlight">following</span>
            </h2>
          </div>
        </div>
        {location ? (
          <h2 className="location-profile">
            <PlaceIcon
              sx={{
                transform: "translateY(0.2rem)",
                color: "#7D8590",
              }}
            />{" "}
            {location}
          </h2>
        ) : null}
      </article>
    </>
  );
};

export default UserInfos;
