import {combineReducers} from '@reduxjs/toolkit';
import {createReducer} from '@reduxjs/toolkit';

import {currency} from './currency';

const initCategories = [
  'Mail',
  'Hotel',
  'Other',
  'Taxi',
  'Service',
  'Gas',
  'Computer',
  'Food',
  'Water',
  'Meal',
  'TV',
];

const allCategories = createReducer(initCategories, {
  addCategory: (state, {payload}) => {
    if (state.includes(payload)) {
      return;
    } else {
      return [...state, payload];
    }
  },
  changeCategory: (state, {payload}) => {
    state[payload.index] = payload.value;
    return state;
  },
  setCategoriesFromServer: (state, {payload}) => (state = payload),
});

const currentCategory = createReducer([], {
  choseCategory: (_, {payload}) => payload,
  clearCurrent: state => (state = []),
});

const allCurrency = createReducer(currency, {
  allCurrency: (state, {}) => state,
});

const choseCurrency = createReducer([], {
  choseCurrency: (_, {payload}) => payload,
  setCurrencyFromServer: (state, {payload}) => (state = payload),
  clearCurrency: state => (state = []),
});

const allExpenses = createReducer([], {
  addExpense: (state, {payload}) => [...state, payload],
  editExpense: (state, {payload}) => {
    return state.map(item => {
      if (item.id === payload.id) {
        return payload.expense;
      }
      return item;
    });
  },
  removeExpense: (state, {payload}) => {
    return state.filter(item => item.id !== payload);
  },
  setExpensesFromServer: (state, {payload}) => (state = payload),
});

const allReport = createReducer([], {
  addReport: (state, {payload}) => [...state, payload],
  editReport: (state, {payload}) => {
    return state.map(item => {
      if (item.id === payload.id) {
        return payload.report;
      }
      return item;
    });
  },
  removeReport: (state, {payload}) => {
    return state.filter(item => item.id !== payload);
  },
  setReportFromServer: (state, {payload}) => (state = payload),
});

const amountReport = createReducer(
  {amount: 1},
  {
    increment: state => {
      state.amount = state.amount + 1;
      return state;
    },
  },
);

export default combineReducers({
  allCategories,
  currentCategory,
  allCurrency,
  choseCurrency,
  allExpenses,
  allReport,
  amountReport,
});
