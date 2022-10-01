import axios from "axios";

export async function getTopTenGamesData(url) {
  const response = await axios.get("http://localhost:3000/games?sort=desc&limit=10");
  return response.data;
}
