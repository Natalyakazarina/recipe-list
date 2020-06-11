import update from "immutability-helper";
import { handleActions } from "redux-actions";

import Actions from "./../actions/recipes";

const initialState = {
  recipes: [],
  localStorageRecipesError: "",
  addSuccessfully: false,
  isEditFormVisible: false,
  recipeData: null,
  fetchRecipeDataError: "",
};

const recipesReducer = handleActions(
  {
    [Actions["RECIPES/FETCH_RECIPES_SUCCESSFULLY"]]: (state, action) => {
      return update(state, {
        $merge: {
          recipes: action.payload.recipes,
        },
      });
    },

    [Actions["RECIPES/FETCH_RECIPES_ERROR"]]: (state, action) => {
      return update(state, {
        $merge: {
          localStorageRecipesError: action.payload.message,
        },
      });
    },

    [Actions["RECIPES/ALL_REMOVE"]]: (state, action) => {
      return update(state, {
        $set: {
          recipes: [],
        },
      });
    },

    [Actions["RECIPES/ADDED_NEW_RECIPE_SUCCESSFULLY"]]: (state, action) => {
      return update(state, {
        $merge: {
          recipes: action.payload,
          addSuccessfully: true,
        },
      });
    },

    [Actions["RECIPES/ADDED_NEW_RECIPE_ERROR"]]: (state, action) => {
      return update(state, {
        $merge: {
          createRecipeErrorMessage: action.payload.message,
        },
      });
    },

    [Actions["RECIPES/RESET_EDIT"]]: (state, action) => {
      return update(state, {
        $merge: {
          addSuccessfully: initialState.addSuccessfully,
        },
      });
    },

    [Actions["RECIPES/CLOSE_EDIT_FORM"]]: (state, action) => {
      return update(state, {
        $merge: {
          isEditFormVisible: false,
        },
      });
    },

    [Actions["RECIPES/OPEN_EDIT_FORM"]]: (state, action) => {
      return update(state, {
        $merge: {
          isEditFormVisible: true,
        },
      });
    },

    [Actions["RECIPES/EDIT_RECIPE"]]: (state, action) => {
      const editState = state.recipes.slice();
      let indexToEdit;
      editState.forEach((recipe, index) => {
        if (recipe.id === action.payload.id) {
          indexToEdit = index;
        }
      });
      editState[indexToEdit].name = action.payload.name;
      editState[indexToEdit].description = action.payload.description;
      return update(state, {
        $merge: { recipeList: editState },
      });
    },

    [Actions["RECIPES/FETCH_RECIPE_DATA_SUCCESSFULLY"]]: (state, action) => {
      const recipeData = action.payload;
      return update(state, {
        $merge: {
          recipeData,
        },
      });
    },

    [Actions["RECIPES/FETCH_RECIPE_DATA_ERROR"]]: (state, action) => {
      return update(state, {
        $merge: {
          fetchRecipeDataError: action.payload.message,
        },
      });
    },
  },
  initialState
);

export default recipesReducer;
