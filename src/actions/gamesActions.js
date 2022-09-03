import axios from 'axios';
import { FETCH_GAMES } from './types'; 

export const fetchGames = (league) => async (dispatch) => 
{
  const res = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/games/${league}`,
    withCredentials: true
  })
  const filterGames = res.data.filter(game => {
    return new Date(game.commence_time) > Date.now()
  });
  const payload = {
    [league]: filterGames
  }
  dispatch({ type: FETCH_GAMES, payload: payload })
};