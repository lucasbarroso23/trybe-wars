import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Text from "react-texty";
// import the styles
import "react-texty/styles.css";
import GrideLoader from "react-spinners/GridLoader";
import { removeNumericFilter } from "../../actions/planetsActions";


import { ReactComponent as WsLogo1 } from "../../assets/starwars1.svg";
import { ReactComponent as WsLogo2 } from "../../assets/starwars2.svg";
import { ReactComponent as WsLogo3 } from "../../assets/starwars3.svg";
import { ReactComponent as WsLogo4 } from "../../assets/starwars4.svg";
import { ReactComponent as WsLogo5 } from "../../assets/starwars5.svg";
import { ReactComponent as WsLogo6 } from "../../assets/starwars6.svg";

import styles from "./index.module.scss";

export default function Table() {
  const planets = useSelector((state) => state.planetsReducer.data.results);
  const loading = useSelector((state) => state.planetsReducer.loading);
  const nameFilter = useSelector((state) => state.planetsReducer.filter.filterByName.name.toLowerCase());
  const numericFilters = useSelector(
    (state) => state.planetsReducer.filter.filterByNumericValues
  );
  const orderFilter = useSelector((state) => state.planetsReducer.filter.order);

  const dispatch = useDispatch();

  console.log("filter", numericFilters);

  useEffect(() => {
    console.log("planetsStore", planets);
    console.log("isLoading", loading);
    console.log("nameFilter", nameFilter);
  }, [planets, loading, nameFilter]);

  return (
    <div className={styles.table}>
      <header>
        <WsLogo1 />
        <WsLogo2 />
        <WsLogo3 />
        <WsLogo4 />
        <WsLogo5 />
        <WsLogo6 />
      </header>

      {loading ? (
        <div className={styles.loading}>
          <GrideLoader color="rgba(255, 255, 255, 0.7)" size={20} />
        </div>
      ) : (
        <>
          <div className={styles.activeFilters}>
            <h1>Filtros ativos</h1>
            <div className={styles.filterPills}>
              {numericFilters.map((filter) => (
                <div data-testid="filter" key={filter.column}>
                  <h3>{filter.column}</h3>
                  <h4>
                    {filter.comparison === "maior que"
                      ? " > "
                      : filter.comparison === "menor que"
                        ? " < "
                        : filter.comparison === "igual a"
                          ? " = "
                          : null}
                  </h4>
                  <h3>{filter.value}</h3>
                  <button
                    type="button"
                    onClick={() => dispatch(removeNumericFilter(filter.column))}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.container}>
            <table>
              <thead>
                <tr>
                  {Object.keys(planets[0]).map(
                    (key) => key !== "residents" && (
                    <th key={key}>
                      <Text tooltip={key} hideArrow tagName="span">
                        {key}
                      </Text>
                    </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {planets
                  .filter((planet) => planet.name.toLowerCase().includes(nameFilter))
                  .filter((planet) => numericFilters.every((filter) => (filter.comparison === "maior que"
                    ? parseInt((planet[filter.column]), 10) > parseInt(filter.value, 10)
                    : filter.comparison === "menor que"
                      ? parseInt((planet[filter.column]), 10) < parseInt(filter.value, 10)
                      : filter.comparison === "igual a"
                        ? parseInt((planet[filter.column]), 10) === parseInt(filter.value, 10)
                        : null)))
                  .sort((a, b) => (orderFilter.sort === "ASC"
                    ? a[orderFilter.column] - b[orderFilter.column]
                    : b[orderFilter.column] - a[orderFilter.column]))
                  .map((planet) => (
                    <tr key={planet.name}>
                      {Object.entries(planet).map(
                        ([key, value]) => key !== "residents" && (
                        <td key={key}>
                          <Text
                            tooltip={value}
                            tooltipMaxWidth={500}
                            hideArrow
                            tagName="span"
                          >
                            {value}
                          </Text>
                        </td>
                        )
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
