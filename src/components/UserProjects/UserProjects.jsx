import { Code, ForkRight, Star } from "@mui/icons-material";
import React from "react";
import "./UserProjects.css";
const UserProjects = ({ currentUserRepos }) => {
  const style = {
    background: "rgb(131, 48, 156)",
    padding: "0.2rem",
    borderRadius: "1.2rem",
  };

  return (
    <div className="user-projects-div">
      {currentUserRepos &&
        currentUserRepos.map((repo) => (
          <div key={repo.html_url} className="user-projects-profile">
            <a
              href={repo.html_url}
              target="_blank"
              className="user-projects-profile-links link-no-decoration">
              <div className="user-projects-profile-top">
                <div className="user-projects-profile-top-title">
                  <h2>{repo.name}</h2>
                  <p className="public-private">
                    {repo.visibility.toUpperCase()}
                  </p>
                </div>
                <p>{repo?.description}</p>
              </div>
              <div className="user-projects-profile-bottom">
                <div className="user-projects-items">
                  <Code sx={style} />
                  <p>{repo.language}</p>
                </div>
                <div className="user-projects-items">
                  <Star sx={style} />
                  <p>{repo.stargazers_count}</p>
                </div>
                <div className="user-projects-items">
                  <ForkRight sx={style} />
                  <p>{repo.forks}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
    </div>
  );
};

export default UserProjects;
