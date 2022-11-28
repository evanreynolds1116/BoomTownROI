import React, { useEffect, useState } from "react";
import apiFetch from "./apiFetch";

const HooksList = () => {
  const [allHooks, setAllHooks] = useState([]);
  const [hookStatus, setHookStatus] = useState([]);

  const getHooks = () => {
    apiFetch.getHooksURL()
        .then((response) => {
            if (response.status === 200) {
                setHookStatus(response.status)
                return response.json()
            } else {
                setHookStatus(response.status)
            }
        }).then((hookData) => setAllHooks(hookData))
  };

  useEffect(() => {
    getHooks();
  }, []);

  return (
      <>
      <div>
        <h1>Hooks</h1>
        {hookStatus === 200 ? (
          <ul>
            {allHooks.map((hook) => (
              <li>ID: {hook.id}</li>
            ))}
          </ul>
        ) : (
          <p>Oops! Looks like there's a problem. HTTP Status: {hookStatus}</p>
        )}
      </div>
        {/* <div>
        <table>
          <caption>Hooks</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
            </tr>
          </thead>
          {allHooks.length > 1 && hookStatus > 0 ? (
            allHooks.map((hook) => (
            <tbody>
              <td>{hook.id}</td>
              <td>{hook.actor.login}</td>
            </tbody>
          ))
          ) : (
            <p>Looks like there was a problem. Status Code: {hookStatus}</p>
          )}
        </table>
        </div> */}
      </>
  );
};

export default HooksList;
