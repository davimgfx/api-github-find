import { useState } from "react";
import { Code, ForkRight, Star } from "@mui/icons-material";
import { UserReposProps } from "../../types/user";
import LoadingProjects  from "../LoadingProjects/LoadingProjects"
import "./UserProjects.css";

interface UserProjectsProps {
  currentUserRepos: UserReposProps[];
}

const UserProjects = ({ currentUserRepos }: UserProjectsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (!currentUserRepos) {
    return <LoadingProjects/>
  }
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentUserRepos.slice(indexOfFirstItem, indexOfLastItem);

  const style = {
    background: "rgb(131, 48, 156)",
    padding: "0.2rem",
    borderRadius: "1.2rem",
  };

  const hasNextPage = currentUserRepos.length > indexOfLastItem;

  const nextPage = () => {
    if (!hasNextPage) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="user-projects-div">
      {currentItems.map((repo: UserReposProps) => (
        <div key={repo.html_url} className="user-projects-profile">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="user-projects-profile-links link-no-decoration"
          >
            <div className="user-projects-profile-top">
              <div className="user-projects-profile-top-title">
                <h2>{repo.name}</h2>
                <p className="public-private">{repo.visibility.toUpperCase()}</p>
              </div>
              <p>{repo?.description}</p>
            </div>
            <div className="user-projects-profile-bottom">
              {repo.language && (
                <div className="user-projects-items">
                  <Code sx={style} />
                  <p>{repo.language}</p>
                </div>
              )}
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
      {currentUserRepos.length > 8 && (
        <>
          <div className="pagination-buttons">
            <button disabled={currentPage === 1} onClick={prevPage} className="button">
              Previous
            </button>
            <button disabled={!hasNextPage} onClick={nextPage} className="button">
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProjects;
