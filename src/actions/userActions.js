import axios from 'axios';
import { FETCH_USER, UPDATE_USER, FETCH_USERS} from './types'; 

export const fetchUser = () => async (dispatch) => 
{
  const res = await axios({ 
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/current_user`,
    withCredentials: true,
    crossDomain:true
  })
  dispatch({ type: FETCH_USER, payload: res.data })
};

export const fetchUsers = (selectedYear = null) => async (dispatch) => 
{
  if(selectedYear && selectedYear !== "actual") {
    const season = await axios({
      method: 'get',
      url: `${process.env.REACT_APP_HOSTNAME}/api/seasons/${selectedYear}`,
      withCredentials: true,
      crossDomain:true
    });
    const users = season?.data?.users ?? [];
    dispatch({ type: FETCH_USERS, payload: users })
    return;
  }

  const { data } = await axios({
    method: 'get',
    url: `${process.env.REACT_APP_HOSTNAME}/api/users`,
    withCredentials: true,
    crossDomain:true
  })

  dispatch({ type: FETCH_USERS, payload: data })
};

export const updateUser = (user, values) => {
  axios({
    method: 'patch',
    url: `${process.env.REACT_APP_HOSTNAME}/api/current_user/${user._id}`,
    data: values,
    withCredentials: true,
    crossDomain:true
  })
  return {
    type: UPDATE_USER,
    payload: values
  }
}
