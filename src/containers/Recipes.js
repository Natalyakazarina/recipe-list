import { connect } from "react-redux";
import Recipes from "../components/Recipes";
import Actions from "./../actions/recipes";

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.recipes.recipes,
    localStorageRecipesError: state.recipes.localStorageRecipesError,
    isEditFormVisible: state.recipes.isEditFormVisible,
    // currentlyEditing: state.recipes.currentlyEditing,
    editId: state.recipes.iditId,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onItemRemove: (id) => dispatch(Actions["RECIPES/RECIPE_REMOVE"](id)),
    fetchRecipes: () => dispatch(Actions["RECIPES/FETCH_RECIPES"]()),
    openEditForm: (id) => dispatch(Actions["RECIPES/OPEN_EDIT_FORM"]()),
    closeEditForm: () => dispatch(Actions["RECIPES/CLOSE_EDIT_FORM"]()),
    editRecipe: (params) => dispatch(Actions["RECIPES/EDIT_RECIPE"](params)),
    addRecipe: (params) => dispatch(Actions["RECIPES/ADDED_NEW_RECIPE"](params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
