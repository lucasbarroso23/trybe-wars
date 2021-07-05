import {
  getPlanetsFailure,
  getPlanetsStarted,
  getPlanetsSuccess,
} from "../actions/planetsActions";

import api from "../services/api";

export default async function getPlanets(dispacth, getState) {
  dispacth(getPlanetsStarted());

  const stateBefore = getState();

  try {
    const response = await api.get("/planets/");
    console.log("API CALL results", response.data.results);
    console.log("STATE BEFORE", stateBefore);

    const { data } = response;

    dispacth(getPlanetsSuccess(data));
  } catch (err) {
    dispacth(getPlanetsFailure(err));
  }
}
