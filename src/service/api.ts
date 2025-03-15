import axios from "axios";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig: any) => {
  axiosConfig.baseURL = "https://pokeapi.co/api/v2/";

  return axiosConfig;
});

export default axiosWithConfig;
