import apiFetch from "./apiFetch";
import { useEffect, useState } from "react";

const BoomTownROIList = () => {
  // state for BTROI data
  const [allBoomTownData, setAllBoomTownData] = useState([]);

  // state for BTROI http status if it's not 200
  const [boomTownDataStatus, setBoomTownDataStatus] = useState([]);

  // state for BTROI/repos count to compare to public_repos
  const [reposURLCount, setReposURLCount] = useState([]);

//   const getBoomTownROI = () => {
//     // get BoomTownROI URL api.github.com/orgs/BoomTownROI
//     apiFetch.getBoomTownROI().then((response) => {
//       // save response status to variable
//       console.log(response)
//       const httpStatus = response.status;
//       console.log(httpStatus)
//       // if the response status is undefined or ok, set response message
//       if (response.ok) {
//         const boomData = response.json();
//         setAllBoomTownData(boomData);
//         // setAllBoomTownData(httpStatus);
//       } else {
//         // if we get the right response back, set data
//         // const boomData = response.json();
//         // setAllBoomTownData(boomData);
//         setAllBoomTownData(httpStatus);
//       }
//     });

    // const getBoomTownROI = () => {
    //     apiFetch.getBoomTownROI().then((response) => {
    //         console.log(response)
    //         const httpStatus = response.status
    //         console.log(httpStatus)
    //         if (httpStatus !== 200) {
    //             setBoomTownDataStatus(httpStatus)
    //         } 
    //     }).then((boomData) => console.log(boomData))
    // }

    // get repos URL and set the length to compare later to BTROI public repos count
    // apiFetch.getReposURL()
    // .then((reposData) => {
    //   setReposURLCount(reposData.length);
    // });
//   };


 const getBoomTownROI = () => {
    apiFetch.getBoomTownROI()
        .then((response) => {
            if (response.status === 200) {
                setBoomTownDataStatus(response.status)
                return response.json()
            } else {
                setBoomTownDataStatus(response.status)
            }
        }).then((boomData) => setAllBoomTownData(boomData));

    apiFetch.getReposURL()
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                setReposURLCount(response.status)
            }
        }).then((reposURLData) => setReposURLCount(reposURLData.length))

 }

 useEffect(() => {
    getBoomTownROI();
  }, []);

  return (
    <>
        <div>
            <h1>Is Updated Later Than Created?</h1>
            
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
                    <p>Oops! Looks like there's a problem. HTTP Status: {boomTownDataStatus}</p>
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
                <p>Oops! Looks like there's a problem. HTTP Status: {boomTownDataStatus}</p>
            )}
        </div>
      
    </>
  );
};

export default BoomTownROIList;
