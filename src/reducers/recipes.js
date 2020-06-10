import update from "immutability-helper";
import { handleActions } from "redux-actions";

import Actions from "./../actions/recipes";

const recipes = [
  {
    id: 1,
    name: "Beef Wellington",
    description: [
      "2 x 400g beef fillets",
      "Olive oil",
      "500g mixture of wild mushrooms",
      "1 thyme sprig, leaves only",
      "500g puff pastry",
      "8 slices of Parma ham",
      "2 egg yolks",
      "Sea salt and freshly ground black pepper",
    ],
  },
  {
    id: 2,
    name: "Cajun Chicken Pasta",
    description: [
      "4 ounces linguine pasta",
      "2 skinless boneless chicken breast halves",
      "2 teaspoons Cajun seasoning",
      "2 tablespoons butter",
      "1 red bell sliced pepper",
      "1 green bell sliced pepper",
      "4 fresh sliced mushrooms",
      "1 green chopped onion",
      "1 cup heavy cream",
      "¼ cup grated Parmesan cheese",
    ],
  },
];

const initialState = {
  recipes,
  localStorageRecipesError: "",
  addSuccessfully: false,
  isEditFormVisible: false,
  recipeData: null,
  fetchRecipeDataError: "",
};

let counter = recipes.length;

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

    [Actions["RECIPES/RECIPE_REMOVE"]]: (state, action) => {
      const fromState = state.recipes.slice();
      let indexToRemove;
      fromState.forEach((recipe, index) => {
        if (recipe.id === action.payload.id) {
          indexToRemove = index;
        }
      });
      fromState.splice(indexToRemove, 1);
      return update(state, {
        $merge: {
          recipes: fromState,
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
      counter++;
      return update(state, {
        recipes: {
          $push: [{
            id: counter,
            name: action.payload.name,
            description: action.payload.description
          }],
        },
        $merge: {
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
