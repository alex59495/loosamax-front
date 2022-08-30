import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";
import { Link } from 'react-router-dom';

import { fetchGames } from '../../actions/gamesActions';
import { fetchStanding } from '../../actions/leaguesStandingsActions';

import BetPreview from '../Bets/BetPreview';
import LeagueStandings from '../Standings/LeagueStandings';

import { snakeToCamel, capitalize } from '../../utils/textTransformation';
import { isWeekend } from '../../utils/isWeekend';

const ListGames = ({league, leaguesStandings, fetchGames, fetchStanding, games}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchAsync() {    
      await fetchGames(league)
      await fetchStanding(league)
      setIsLoading(false)
    }
    fetchAsync()
  }, [])

  const renderGames = () => {
    if(!games.hasOwnProperty(league)) {
      return null
    }

    if (isWeekend()) {
      return <p className="text-comment text-center">Alors comme ça on veut parier les week-end {new Date().getDay() === 1 ? "(oui, Lundi c'est we aussi !)" : null} ? On aime pas les faillots ici, va falloir attendre.</p>
    }

    if(games[league].length === 0) {
      return <p className="text-comment text-center">Pas encore de paris disponibles pour cette ligue jeune impétueux. Il va falloir patienter</p>
    }

    const listGames = games[league].map(game => {
      return (
        <>
          <BetPreview key={game._id} game={game} />
        </>
      )
    })
    
    return (
      <>
        <div className="grid_wrap">
          {listGames}
        </div>
        <LeagueStandings leagueStanding={leaguesStandings[league]} />
      </>
    )
  }

  const renderListGames = () => {
    if(isLoading) {
      return (
        <div className="container-center" style={{height: "100%", width: "100%"}}>
          <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      )
    } else {
      return (
        <div className="d-flex justify-content-center">
          {renderGames()}
        </div>
      )
    }
  }

  return (
    <div data-test="list-games">
      <div className="link">
        <Link to="/leagues">Revenir aux ligues</Link>
      </div>
      <h1 className="text-center">{capitalize(snakeToCamel(league))}</h1>
      {renderListGames()}
    </div>
  )
}

const mapStateToProps = ({games, leaguesStandings}) => {
  return {
    games,
    leaguesStandings,
  }
}

export default connect(mapStateToProps, { fetchGames, fetchStanding })(ListGames);
