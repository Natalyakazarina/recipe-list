import { call, put, takeLatest, all, select } from "redux-saga/effects";

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
    let recipes = yield call(
      localStorageService.save,
      action.payload
    );
    yield put(
      Actions["RECIPES/ADDED_NEW_RECIPE_SUCCESSFULLY"](recipes)
    );
  } catch ({ message }) {
    console.error(message);
    yield put(Actions["RECIPES/ADDED_NEW_RECIPE_ERROR"]({ message }));
  }
}


function* fetchRecipeData(action) {
  try {
    let recipeData = yield call(localStorageService.getData, action.payload);
    yield put(
      Actions["RECIPES/FETCH_RECIPE_DATA_SUCCESSFULLY"](recipeData)
    );
  } catch ({ message }) {
    console.error(message);
    yield put(Actions["RECIPES/FETCH_RECIPE_DATA_ERROR"]({ message }));
  }
}


function* onItemRemove(action) {
  try {
    const recipes = yield call(localStorageService.remove, action.payload);

    yield put(Actions["RECIPES/RECIPE_REMOVE_SUCCESSFULLY"]({ recipes })
    );
  } catch ({ message }) {
    yield put(Actions["RECIPES/RECIPE_REMOVE_ERROR"]({ message }));
  }
}


function* clearAll(action) {
  console.log("let's clear it all");
  try {
    let recipes = yield call(localStorageService.clear);

    yield put(Actions["RECIPES/ALL_REMOVE_SUCCESSFULLY"]({ recipes })
    );
  } catch ({ message }) {
    yield put(Actions["RECIPES/ALL_REMOVE_ERROR"]({ message }));
  }
}


function* editRecipe(action) {
  try {
    const recipes = yield select(state => state.recipes.recipes);
      let indexToEdit;
      recipes.forEach((recipe, index) => {
        if (recipe.id === action.payload.id) {
          indexToEdit = index;
        }
      });
      recipes[indexToEdit].name = action.payload.name;
      recipes[indexToEdit].description = action.payload.description;

    yield call(localStorageService.save, action.payload.params, recipes[indexToEdit].name, recipes[indexToEdit].description);

    yield put(Actions["RECIPES/ADDED_NEW_RECIPE_SUCCESSFULLY"]({ recipes })
    );
  } catch ({ message }) {
    yield put(Actions["RECIPES/ADDED_NEW_RECIPE_ERROR"]({ message }));
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

function* onItemRemoveSaga() {
  yield takeLatest("RECIPES/RECIPE_REMOVE", onItemRemove);
}

function* clearAllSaga() {
  yield takeLatest("RECIPES/ALL_REMOVE", clearAll);
}

function* editRecipeSaga() {
  yield takeLatest("RECIPES/EDIT_RECIPE", editRecipe);
}

export default function* recipesSaga() {
  yield all([fetchRecipesSaga(), addRecipeSaga(), fetchRecipeDataSaga(), onItemRemoveSaga(), editRecipeSaga(), clearAllSaga()]);
}