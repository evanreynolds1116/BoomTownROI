import React, { useEffect, useState } from "react";
import apiFetch from "./apiFetch";

const IssuesList = () => {
  const [allIssues, setAllIssues] = useState([]);
  const [issueStatus, setIssueStatus] = useState([]);

  const getIssues = () => {
    apiFetch.getIssuesURL()
        .then((response) => {
            if (response.status === 200) {
                setIssueStatus(response.status)
                return response.json()
            } else {
                setIssueStatus(response.status)
            }
        }).then((issueData) => setAllIssues(issueData))
  };

  useEffect(() => {
    getIssues();
  }, []);

  return (
    <>
      <div>
        <h1>Issues</h1>
        {issueStatus === 200 ? (
          <ul>
            {allIssues.map((issue) => (
              <li>ID: {issue.id}</li>
            ))}
          </ul>
        ) : (
          <p>Oops! Looks like there's a problem. HTTP Status: {issueStatus}</p>
        )}
      </div>
    </>
  );
};

export default IssuesList;
