import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Profile from "./Profile/Profile";
import ListLeagues from "./Games/ListLeagues";
import ListGames from "./Games/ListGames";
import Home from "./Home";
import WeeklyBets from "./Bets/WeeklyBets";
import Stats from "./Stats/Stats";
import OldUserBets from "./Bets/OldUserBets";
import NoMatch from "./NoMatch";

import { Triangle } from "react-loader-spinner";

// Redux functions
import { fetchUser } from "../actions/userActions";

// utils
import { LEAGUES } from "../constants/leagues";

const App = ({ fetchUser, user }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      await fetchUser();
      if (isMounted) setIsLoading(false);
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [fetchUser]);

  const renderLeagues = LEAGUES.map(({ name }) => {
    return (
      <Route
        exact
        path={`/games/${name}`}
        key={name}
        element={<ListGames league={`${name}`} />}
      />
    );
  });

  const renderApp = () => {
    if (isLoading) {
      return (
        <div className="container-center inherit-min-height justify-content-center">
          <Triangle color="#00BFFF" height={100} width={100} />
        </div>
      );
    } else if (user == {} || !user) {
      return (
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route element={<NoMatch />} status={404} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/weekbets" element={<WeeklyBets />} />
              <Route exact path="/mesparis" element={<OldUserBets />} />
              <Route exact path="/stats" element={<Stats />} />
              <Route exact path="/profile/:id" element={<Profile />} />
              <Route exact path="/leagues" element={<ListLeagues />} />
              {renderLeagues}
              <Route element={<NoMatch />} status={404} />
            </Routes>
          </div>
        </BrowserRouter>
      );
    }
  };

  return <>{renderApp()}</>;
};

const mapStateToPros = ({ user }) => {
  return {
    user,
  };
};

export default connect(mapStateToPros, { fetchUser })(App);
