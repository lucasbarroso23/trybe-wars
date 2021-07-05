import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import getPlanets from "./thunks/planetsThunks";

import Sidemenu from "./components/sidemenu";
import Table from "./components/table";

import styles from "./styles/app.module.scss";
import "./styles/global.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlanets);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Sidemenu />
      <Table />
    </div>
  );
}

export default App;
