import axios from "axios";

const api = axios.create({});

const fetchData = (url) => {
  return api.get(url).catch((error) => console.error(`Error: ${error}`));
};

export default fetchData;
