import { combineReducers } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import { currency } from "./currency";

const initCategories = [
  "Mail",
  "Hotel",
  "Other",
  "Taxi",
  "Service",
  "Gas",
  "Computer",
  "Food",
  "Water",
  "Meal",
  "TV",
];

const allCategories = createReducer(initCategories, {
  addCategory: (state, { payload }) => {
    if (state.includes(payload)) {
      return;
    } else {
      return [...state, payload];
    }
  },
  changeCategory: (state, { payload }) => {
    state[payload.index] = payload.value;
    return state;
  },
});

const currentCategory = createReducer([], {
  choseCategory: (_, { payload }) => payload,
  clearCurrent: (state) => (state = []),
});

const allCurrency = createReducer(currency, {
  allCurrency: (state, {}) => state,
});

const choseCurrency = createReducer([], {
  choseCurrency: (_, { payload }) => payload,
});

const allExpenses = createReducer([], {
  addExpense: (state, { payload }) => [...state, payload],
  editExpense: (state, { payload }) => {
    return state.map((item) => {
      if (item.id === payload.id) {
        return payload.expense;
      }
      return item;
    });
  },
  removeExpense: (state, { payload }) => {
    return state.filter((item) => item.id !== payload);
  },
});

const allReport = createReducer([], {
  addReport: (state, { payload }) => [...state, payload],
  editReport: (state, { payload }) => {
    // state[payload.index] = { ...state[payload.index], ...payload.report };
    // return state;
    return state.map((item) => {
      if (item.id === payload.id) {
        return payload.report;
      }
      return item;
    });
  },
  removeReport: (state, { payload }) => {
    // state.splice(payload, 1);
    // return state;
    return state.filter((item) => item.id !== payload);
  },
});

export default combineReducers({
  allCategories,
  currentCategory,
  allCurrency,
  choseCurrency,
  allExpenses,
  allReport,
});
