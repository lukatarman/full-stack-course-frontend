import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "../../adapters/http-client/http.client.adapter.js";
import { monthToString } from "../../utils/dates.js";
import { fixHistories } from "./services/game.details.service.js";

const GameDetailsBehavior = () => {
  const [gameData, setGameData] = useState([]);
  const [tableContent, setTableContent] = useState(null);
  let { id: gameId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getGameById(gameId);
      setGameData(response);
    };

    fetchData();
  }, [gameId]);

  useEffect(() => {
    if (!gameData.playerHistory) return;

    const historiesWithAveragePlayers = fixHistories(gameData.playerHistory);

    setTableContent(
      historiesWithAveragePlayers.map((history) => createTableRow(history))
    );
  }, [gameData]);

  function createTableRow(history) {
    const year = history.date.getFullYear();
    const month = monthToString(history.date.getMonth());
    const players = history.players;

    return (
      <tr key={history.date}>
        <td>
          {year} {month}
        </td>
        <td>{players}</td>
      </tr>
    );
  }

  return [gameData, tableContent];
};

export default GameDetailsBehavior;
