import React from "react";
import "./UserProjects.css";
const UserProjects = ({ currentUserRepos }) => {
  console.log(currentUserRepos);
  return (
    <div className="user-projects-div">
      {currentUserRepos &&
        currentUserRepos.map((repo) => (
          <div key={repo.html_url} className="user-projects-profile">
            <a href={repo.html_url} target="_blank" className="user-projects-profile-links link-no-decoration">
              <div className="user-projects-profile-top">
                <div className="user-projects-profile-top-title">
                  <h2>{repo.name}</h2>
                  <p className="public-private">{repo.visibility.toUpperCase()}</p>
                </div>
                <p>{repo?.description}</p>  
              </div>
              <div className="user-projects-profile-bottom">
                <p>Language: {repo.language}</p>
                <p>Forks: {repo.forks}</p>
              </div>
            </a>
          </div>
        ))}
    </div>
  );
};

export default UserProjects;
