const url = "https://api.github.com/orgs/BoomTownROI";
const requestHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Basic aHR0cHM6Ly9hcGkuZ2l0aHViLmNvbTo=",
};

const requestOptions = {
  method: "GET",
  headers: requestHeaders,
  redirect: "follow",
};

// all api fetch calls... this current way is making me hit the API rate limit quickly. Not sure best practice to avoid that.
export default {
  // returns 200
  getBoomTownROI() {
    return fetch(`${url}`, requestOptions)
  },
  // returns 200
  getReposURL() {
    return fetch(`${url}/repos`, requestOptions)
  },
  // returns 200
  getEventsURL() {
    return fetch(`${url}/events`, requestOptions);
  },
  // returns 404
  getHooksURL() {
    return fetch(`${url}/hooks`, requestOptions)
  },
  // returns 404
  getIssuesURL() {
    return fetch(`${url}/issues`, requestOptions);
  },
  // returns 404
  getMembersURL() {
    return fetch(`${url}/members{/member}`, requestOptions);
  },
  // returns 404
  getPublicMembersURL() {
    return fetch(`${url}/public_members{/member}`, requestOptions)
  },
};
