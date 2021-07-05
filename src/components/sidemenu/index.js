import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNameFilter,
  addNumericFilter,
  addOrderFilter,
} from "../../actions/planetsActions";

import styles from "./index.module.scss";

export default function Sidemenu() {
  const [filterValue, setFilterValue] = useState(1000);
  const [comparisonOption, setComparisonOption] = useState("maior que");
  const [numericColumn, setNumericColumn] = useState("population");

  const [orderColumn, setOrderColumn] = useState("name");
  const [asc, setAsc] = useState(false);
  const [desc, setDesc] = useState(false);

  const filtersStore = useSelector(
    (state) => state.planetsReducer.availableFiltersArray
  );

  const dispatch = useDispatch();

  const handleNumericSubmit = (e) => {
    e.preventDefault();
    const column = e.target.coluna.value;
    const comparison = e.target.comparacao.value;
    const valueOpt = e.target.value.value;

    dispatch(addNumericFilter(column, comparison, valueOpt));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const orderCol = e.target.ordem.value;

    if (asc) {
      dispatch(addOrderFilter(orderCol, "ASC"));
    } else {
      dispatch(addOrderFilter(orderCol, "DESC"));
    }
  };

  const handleAsc = (value) => {
    setAsc(value);
    setDesc(!value);
  };

  const handleDesc = (value) => {
    setDesc(value);
    setAsc(!value);
  };

  return (
    <div className={styles.sideMenu}>
      <img
        src="https://fontmeme.com/permalink/210619/3b61621ed26c80a09d5b1206c7398b7f.png"
        alt="Logo.png"
      />

      <div className={styles.search}>
        <label htmlFor="search">Procurar</label>
        <input
          type="text"
          htmlFor="search"
          data-testid="name-filter"
          onChange={(e) => dispatch(addNameFilter(e.target.value))}
        />
      </div>

      <div className={styles.filter}>
        <form action="submit" onSubmit={(e) => handleOrderSubmit(e)}>
          <div className={styles.selectInput}>
            <label htmlFor="ordem">Ordem</label>
            <select
              name="ordem"
              value={orderColumn}
              data-testid="column-sort"
              onChange={(e) => setOrderColumn(e.target.value)}
              id="ordem"
            >
              <option value="population">Population</option>
              <option value="orbital_period">orbital_period</option>
              <option value="diameter">diameter</option>
              <option value="rotation_period">rotation_period</option>
              <option value="surface_water">surface_water</option>
            </select>
          </div>
          <div className={styles.checkboxes}>
            <label htmlFor="asc">ASC</label>
            <input
              type="radio"
              value={asc}
              testid="column-sort-input"
              onChange={(e) => handleAsc(!asc)}
              name="asc"
              checked={!!asc}
              id="asc"
            />
            <label htmlFor="desc">DESC</label>
            <input
              type="radio"
              value={desc}
              testid="column-sort-input"
              onChange={(e) => handleDesc(!desc)}
              checked={!!desc}
              name="desc"
              id="desc"
            />
          </div>
          <button
            type="submit"
            data-testid="column-sort-button"
            disabled={(asc || desc) === false}
          >
            Filtrar
          </button>
        </form>
      </div>

      <div className={styles.filter}>
        <form action="submit" onSubmit={(e) => handleNumericSubmit(e)}>
          <div className={styles.selectInput}>
            <label htmlFor="coluna">Coluna</label>
            <select
              name="coluna"
              value={numericColumn}
              onChange={(e) => setNumericColumn(e.target.value)}
              data-testid="column-filter"
              id="coluna"
            >
              {filtersStore.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectInput}>
            <label htmlFor="comparacao">Filtro numérico</label>
            <select
              name="comparacao"
              value={comparisonOption}
              onChange={(e) => setComparisonOption(e.target.value)}
              id="comparacao"
              data-testid="comparison-filter"
            >
              <option value="maior que">Maior que</option>
              <option value="menor que">Menor que</option>
              <option value="igual a">Igual a</option>
            </select>
          </div>

          <div className={styles.selectInput}>
            <label htmlFor="filterInput">Valor</label>
            <input
              type="text"
              htmlFor="filterInput"
              id="filterInput"
              name="value"
              data-testid="value-filter"
              className={styles.filterInput}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
            <button
              type="submit"
              disabled={!filtersStore?.length || filterValue <= 0}
              data-testid="button-filter"
            >
              Filtrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
