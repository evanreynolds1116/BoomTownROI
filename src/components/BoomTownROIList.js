import apiFetch from "./apiFetch";
import { useEffect, useState } from "react";

const BoomTownROIList = () => {
  // state for BTROI data
  const [allBoomTownData, setAllBoomTownData] = useState([]);

  // state for BTROI http status if it's not 200
  const [boomTownDataStatus, setBoomTownDataStatus] = useState([]);

  // state for BTROI/repos count to compare to public_repos
  const [reposURLCount, setReposURLCount] = useState([]);

  const getBoomTownROI = () => {
    // call BT ROI url
    apiFetch
      .getBoomTownROI()
      // handle response of fetch call
      .then((response) => {
        // if the http status is 200, save staus return response.json()
        if (response.status === 200) {
          setBoomTownDataStatus(response.status);
          return response.json();
        } else {
          setBoomTownDataStatus(response.status);
        }
        // set the data returned from fetch call to state
      })
      .then((boomData) => setAllBoomTownData(boomData));

    apiFetch
      .getReposURL()
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          setReposURLCount(response.status);
        }
      })
      .then((reposURLData) => setReposURLCount(reposURLData.length));
  };

  // call on first render
  useEffect(() => {
    getBoomTownROI();
  }, []);

  return (
    <>
      <div>
        <h1>Is Updated Later Than Created?</h1>
        {/* if status from api call is 200, render this html */}
        {boomTownDataStatus === 200 ? (
          <ul>
            <li>Created At: {allBoomTownData.created_at}</li>
            <li>Updated At: {allBoomTownData.updated_at}</li>
            {allBoomTownData.updated_at > allBoomTownData.created_at ? (
              <li>YES &#9989;</li>
            ) : (
              <li>NO &#10062;</li>
            )}
          </ul>
        ) : (
          <p>
            Oops! Looks like there's a problem. HTTP Status:{" "}
            {boomTownDataStatus}
          </p>
        )}
      </div>

      <div>
        <h1>Does public_repos count match repos_url count?</h1>

        {boomTownDataStatus === 200 ? (
          <ul>
            <li>public_repos count: {allBoomTownData.public_repos}</li>
            <li>repos_url count: {reposURLCount}</li>
            {allBoomTownData.public_repos === reposURLCount ? (
              <li>YES &#9989;</li>
            ) : (
              <li>NO &#10062;</li>
            )}
          </ul>
        ) : (
          <p>
            Oops! Looks like there's a problem. HTTP Status:{" "}
            {boomTownDataStatus}
          </p>
        )}
      </div>
    </>
  );
};

export default BoomTownROIList;
