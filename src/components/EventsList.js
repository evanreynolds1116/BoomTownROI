import React, { useEffect, useState } from "react";
import apiFetch from "./apiFetch";

const EventsList = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [eventStatus, setEventStatus] = useState([]);

  const getEvents = () => {
    apiFetch
      .getEventsURL()
      .then((response) => {
        if (response.status === 200) {
          setEventStatus(response.status);
          return response.json();
        } else {
          setEventStatus(response.status);
        }
      })
      .then((eventData) => setAllEvents(eventData));
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div>
        <h1>Events</h1>
        {eventStatus === 200 ? (
          <ul>
            {allEvents.map((event) => (
              <li>ID: {event.id}</li>
            ))}
          </ul>
        ) : (
          <p>Oops! Looks like there's a problem. HTTP Status: {eventStatus}</p>
        )}
      </div>
    </>
  );
};

export default EventsList;
