import "./App.css";
import React, { useEffect, useState, Fragment } from "react";
// import apiFetch from './apiFetch';
import EventsList from "./components/EventsList";
import ReposList from "./components/ReposList";
import HooksList from "./components/HooksList";
import BoomTownROIList from "./components/BoomTownROIList";
import IssuesList from "./components/IssuesList";
import MembersList from "./components/MembersList";
import PublicMembersList from "./components/PublicMembersList";

function App() {
  return (
    <React.Fragment>
      <div id="flexcontainer">
        <ReposList />
        <EventsList />
        <HooksList />
        <IssuesList />
        <MembersList />
        <PublicMembersList />
        <BoomTownROIList /> 
      </div>
    </React.Fragment>
  );
}

export default App;
