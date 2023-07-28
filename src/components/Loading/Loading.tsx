import "./Loading.css";
const Loading = () => {
  return (
    <>
      <div className="buttons-controls-loading">
        <div className="button-control-loading skeleton"></div>
        <div className="button-control-loading skeleton"></div>
        <div className="button-control-loading skeleton"></div>
      </div>
      <article className="loading-user-infos-projects">
        <div className="profile-infos-loading">
          <div className="loading-image skeleton"></div>
          <div className="info-names-profile-loading-h2 skeleton"></div>
          <div className="info-names-profile-loading-p skeleton"></div>
          <div className="info-bio-profile-loading skeleton"></div>
          <div className="info-bio-button-loading skeleton"></div>
          <div className="followers-profile-loading skeleton"></div>
        </div>
        <div className="user-projects-div-loading">
          <div className="user-projects-div-elements-loading skeleton"></div>
          <div className="user-projects-div-elements-loading skeleton"></div>
          <div className="user-projects-div-elements-loading skeleton"></div>
          <div className="user-projects-div-elements-loading skeleton"></div>
          <div className="user-projects-div-elements-loading skeleton"></div>
          <div className="user-projects-div-elements-loading skeleton"></div>
          <div className="user-projects-div-elements-loading skeleton"></div>
          <div className="user-projects-div-elements-loading skeleton"></div>
        </div>
      </article>
    </>
  );
};

export default Loading;
