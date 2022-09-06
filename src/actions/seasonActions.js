import axios from 'axios';
import { FETCH_YEARS } from './types'; 

export const fetchYears = () => async (dispatch) => {
  const { data } = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/seasons`,
    withCredentials: true,
    crossDomain:true
  })
  const years = data.map(season => season.year)
  
  dispatch({type: FETCH_YEARS, payload: years})
}