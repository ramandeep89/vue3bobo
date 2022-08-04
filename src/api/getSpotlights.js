import axios from "axios";

const getSpotlights = async () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const response = await axios.get(`${baseUrl}/spotlights`);
  return response.data;
};

export default getSpotlights;
