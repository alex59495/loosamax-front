import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

// Redux actions
import {createBet} from '../../actions/betActions';

import { formatDate } from '../../utils/textTransformation';

import BandResult from './BandResult';
import GameResult from '../Games/GameResult'

const BetPreview = ({game, bet, createBet, user, history, group}) => {

  const clickable = (x) => {
    if(bet) {
      return
    } else {
      return createBet({
        choice: x, 
        team: choiceData(x), 
        game: {...game}, 
        user_id: user._id,
      }, history)
    }
  }

  const choiceData = (x) => {
    switch(x) {
      case "1":
        return game.home_team
      case "N":
        return 'Match nul'
      case "2":
        return game.away_team
      default:
        return;
    }
  }

  const result = (bet) => {
    if (!bet) return null
    if (bet.game.result === null) return;
    if (bet.choice === bet.game.result) {
      return (
        <>
          <GameResult game={bet.game} />
          <BandResult result="Winner"/>
        </>
      )

    } else {
      return (
        <>
          <GameResult game={bet.game} />
          <BandResult result="Looser"/>
        </>
      )
    }
  }

  const oddRisk = (oddValue) => {
    if (oddValue > 2.5) { return "risk" }
    else if (oddValue < 2) { return "safe" }
    else { return "intermediate" }
  }

  return (
    <div className="card-odd">
      <div className="match">
        <div 
            className={`card-odd-detail ${bet && bet.choice === "1" ? 'active-odd' : ''} ${!bet ? 'clickable' : ''}`}
            onClick={() => clickable("1")}
            style={bet ? null : {cursor: 'pointer'}}
          >
            <span className="team">{game.home_team}</span>
            <span className={oddRisk(game.home_odd)}>{game.home_odd}</span>
          </div>
          <div 
            className={`card-odd-detail ${bet && bet.choice === "N" ? 'active-odd' : ''} ${!bet ? 'clickable' : ''}`}
            onClick={() => clickable("N")}
            style={bet ? null : {cursor: 'pointer'}}
          >
            <span>Nul</span>
            <span className={oddRisk(game.draw_odd)}>{game.draw_odd}</span>
          </div>
          <div 
            className={`card-odd-detail ${bet && bet.choice === "2" ? 'active-odd' : ''} ${!bet ? 'clickable' : ''}`}
            onClick={() => clickable("2")}
            style={bet ? null : {cursor: 'pointer'}}
          >
            <span className="team">{game.away_team}</span>
            <span className={oddRisk(game.away_odd)}>{game.away_odd}</span>
          </div>
      </div>
      <div className="date">{formatDate(game.commence_time)}</div>
      {result(bet)}
    </div>
  )
}

const mapStateToProps =({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps, {createBet})(withRouter(BetPreview))