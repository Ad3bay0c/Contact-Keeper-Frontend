import axios from "axios";

const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authoriztion"] = token;
  } else {
    delete axios.defaults.headers.common["Authoriztion"];
  }
};

export default SetAuthToken;
