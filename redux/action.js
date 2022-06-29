import { createAction } from "@reduxjs/toolkit";

export const addCategory = createAction("addCategory");
export const changeCategory = createAction("changeCategory");
export const choseCategory = createAction("choseCategory");
export const clearCurrent = createAction("clearCurrent");

export const allCurrency = createAction("allCurrency");
export const choseCurrency = createAction("choseCurrency");

export const addExpense = createAction("addExpense");
export const editExpense = createAction("editExpense");
export const removeExpense = createAction("removeExpense");

export const addReport = createAction("addReport");
export const removeReport = createAction("removeReport");
export const editReport = createAction("editReport");
