import React, { useEffect, useState } from "react";
import apiFetch from "./apiFetch";

const PublicMembersList = () => {
  const [allPublicMembers, setAllPublicMembers] = useState([]);
  const [publicMembersStatus, setPublicMembersStatus] = useState([]);

  const getPublicMembers = () => {
    apiFetch
      .getPublicMembersURL()
      .then((response) => {
        if (response.status === 200) {
          setPublicMembersStatus(response.status);
          return response.json();
        } else {
          setPublicMembersStatus(response.status);
        }
      })
      .then((publicMemberData) => setAllPublicMembers(publicMemberData));
  };

  useEffect(() => {
    getPublicMembers();
  }, []);

  return (
    <>
      <div>
        <h1>Public Members</h1>
        {publicMembersStatus === 200 ? (
          <ul>
            {allPublicMembers.map((pubMem) => (
              <li>ID: {pubMem.id}</li>
            ))}
          </ul>
        ) : (
          <p>Oops! Looks like there's a problem. HTTP Status: {publicMembersStatus}</p>
        )}
      </div>
    </>
  );
};

export default PublicMembersList;
