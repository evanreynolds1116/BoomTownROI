import React, { useEffect, useState } from "react";
import apiFetch from "./apiFetch";

const MembersList = () => {
    const [allMembers, setAllMembers] = useState([]);
    const [membersStatus, setMembersStatus] = useState([]);
  
    const getMembers = () => {
      apiFetch.getMembersURL()
        .then((response) => {
            if (response.status === 200) {
                setMembersStatus(response.status)
                return response.json()
            } else {
                setMembersStatus(response.status)
            }
        }).then((memberData) => setAllMembers(memberData))
    };
  
    useEffect(() => {
      getMembers();
    }, []);
  
    return (
      <>
        <div>
        <h1>Members</h1>
        {membersStatus === 200 ? (
          <ul>
            {allMembers.map((member) => (
              <li>ID: {member.id}</li>
            ))}
          </ul>
        ) : (
          <p>Oops! Looks like there's a problem. HTTP Status: {membersStatus}</p>
        )}
      </div>
      </>
    );
  };
  
  export default MembersList;