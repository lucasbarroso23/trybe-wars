import produce from "immer";

const INITIAL_STATE = {
  data: {},
  filter: {
    filterByName: { name: "" },
    filterByNumericValues: [],
    order: {},
  },
  loading: true,
  error: null,
  availableFiltersArray: [
    "population",
    "orbital_period",
    "diameter",
    "rotation_period",
    "surface_water",
  ],
};

function planetsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_PLANETS_STARTED":
      return produce(state, (draft) => {
        console.log("api call started");
      });

    case "GET_PLANETS_SUCCESS":
      return produce(state, (draft) => {
        draft.data = action.data;
        draft.loading = action.loading;
      });

    case "GET_PLANETS_FAILURE":
      return produce(state, (draft) => {
        draft.error = action.error;
      });

    case "ADD_NAME_FILTER":
      return produce(state, (draft) => {
        draft.filter.filterByName = { name: action.nameFilter };
      });

    case "ADD_NUMERIC_FILTER":
      return produce(state, (draft) => {
        const filterIndex = draft.availableFiltersArray.findIndex(
          (filter) => filter === action.tableColumn
        );

        draft.availableFiltersArray.splice(filterIndex, 1);

        draft.filter.filterByNumericValues.push({
          column: action.tableColumn,
          comparison: action.comparison,
          value: action.value,
        });
      });

    case "REMOVE_NUMERIC_FILTER":
      return produce(state, (draft) => {
        draft.availableFiltersArray.push(action.tableColumn);

        const filterIndex = draft.filter.filterByNumericValues.findIndex(
          (filter) => filter.column === action.tableColumn
        );

        draft.filter.filterByNumericValues.splice(filterIndex, 1);
      });

    case "ADD_ORDER_FILTER":
      return produce(state, (draft) => {
        draft.filter.order = {
          column: action.tableColumn,
          sort: action.order,
        };
      });

    default:
      return state;
  }
}

export default planetsReducer;
