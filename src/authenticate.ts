import axios from 'axios';

const BASE_URL='https://middleware.9packsoftware.com/middleware'

export const authenticate = async () => {
  const username = "124";
  const password = "124";
  const url = BASE_URL + `/validate_user/${username}/${password}?clientCode=9pack`;
  const response = await axios.get(url);
  debugger;
  
}
