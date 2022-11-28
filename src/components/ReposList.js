import React, { useEffect, useState } from "react";
import apiFetch from "./apiFetch";

const ReposList = () => {
  const [allRepos, setAllRepos] = useState([]);
  const [repoStatus, setRepoStatus] = useState([]);

  //   const getRepos = () => {
  //     apiFetch.getReposURL().then((response) => {
  //         const httpStatus = response.status
  //         if (httpStatus === undefined || response.ok === true) {
  //             setRepoStatus(response.message)
  //         } else if (httpStatus !== 200) {
  //             setRepoStatus(httpStatus)
  //         } else {
  //             const repoData = response.json()
  //             setAllRepos(repoData)
  //         }
  //     })
  //   };

  const getRepos = () => {
    apiFetch
      .getReposURL()
      .then((response) => {
        if (response.status === 200) {
          setRepoStatus(response.status);
          return response.json();
        } else {
          setRepoStatus(response.status);
        }
      })
      .then((repoData) => setAllRepos(repoData));
  };

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <>
      <div>
        <h1>Repos</h1>
        {repoStatus === 200 ? (
          <ul>
            {allRepos.map((repo) => (
              <li>ID: {repo.id}</li>
            ))}
          </ul>
        ) : (
          <p>Oops! Looks like there's a problem. HTTP Status: {repoStatus}</p>
        )}
      </div>
    </>
  );
};

export default ReposList;
