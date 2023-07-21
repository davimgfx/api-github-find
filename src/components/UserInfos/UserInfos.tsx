import React from "react";
import { UserProps } from "../../types/user";
import GroupIcon from "@mui/icons-material/Group";
import PlaceIcon from "@mui/icons-material/Place";
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
  return (
    <>
      <article className="user-infos">
        <a href={html_url} target="_blanket">
          <img src={avatar_url} alt={login} className="img-profile" />
        </a>
        <div className="info-names-profile">
          <h2>{name}</h2>
          <p>{login}</p>
        </div>
        <p className="info-bio-profile">{bio}</p>
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

        <h2>
          <PlaceIcon
            sx={{
              transform: "translateY(0.2rem)",
              color: "#7D8590",
            }}
          />{" "}
          {location}
        </h2>
      </article>
    </>
  );
};

export default UserInfos;
