export function getPlanetsStarted() {
  return {
    type: "GET_PLANETS_STARTED",
  };
}

export function getPlanetsSuccess(data) {
  return {
    type: "GET_PLANETS_SUCCESS",
    data,
    error: null,
    loading: false,
  };
}

export function getPlanetsFailure(error) {
  return {
    type: "GET_PLANETS_FAILURE",
    error,
    loading: true,
  };
}

export function addNameFilter(nameFilter) {
  return {
    type: "ADD_NAME_FILTER",
    nameFilter,
  };
}

export function addOrderFilter(tableColumn, order) {
  return {
    type: "ADD_ORDER_FILTER",
    tableColumn,
    order,
  };
}

export function addNumericFilter(tableColumn, comparison, value) {
  return {
    type: "ADD_NUMERIC_FILTER",
    tableColumn,
    comparison,
    value,
  };
}

export function removeNumericFilter(tableColumn) {
  return {
    type: "REMOVE_NUMERIC_FILTER",
    tableColumn,
  };
}
