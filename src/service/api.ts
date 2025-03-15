import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default axiosWithConfig;
