import { call, put, takeLatest, all } from "redux-saga/effects";

import localStorageService from "../services/localStorageService";

import Actions from "./../actions/recipes";

function* fetchRecipes() {
  try {
    let recipes = yield call(localStorageService.get);
    yield put(Actions["RECIPES/FETCH_RECIPES_SUCCESSFULLY"]({ recipes }));
  } catch ({ message }) {
    console.error(message);
    yield put(Actions["RECIPES/FETCH_RECIPES_ERROR"]({ message }));
  }
}

function* addRecipe(action) {
  try {
    let currentRecipe = yield call(
      localStorageService.save,
      action.payload.params
    );
    yield put(
      Actions["RECIPES/ADDED_NEW_RECIPE_SUCCESSFULLY"]({ currentRecipe })
    );
  } catch ({ message }) {
    console.error(message);
    yield put(Actions["RECIPES/ADDED_NEW_RECIPE_ERROR"]({ message }));
  }
}

function* fetchRecipeData(action) {
  try {
    let recipeData = yield call(localStorageService.getData);
    yield put(
      Actions["RECIPES/FETCH_RECIPE_DATA_SUCCESSFULLY"]({ recipeData })
    );
  } catch ({ message }) {
    console.error(message);
    yield put(Actions["RECIPES/FETCH_RECIPE_DATA_ERROR"]({ message }));
  }
}

function* fetchRecipesSaga() {
  yield takeLatest("RECIPES/FETCH_RECIPES", fetchRecipes);
}

function* addRecipeSaga() {
  yield takeLatest("RECIPES/ADDED_NEW_RECIPE", addRecipe);
}

function* fetchRecipeDataSaga() {
  yield takeLatest("RECIPES/FETCH_RECIPE_DATA", fetchRecipeData);
}

export default function* recipesSaga() {
  yield all([fetchRecipesSaga(), addRecipeSaga(), fetchRecipeDataSaga()]);
}
