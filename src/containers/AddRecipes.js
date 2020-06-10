import { connect } from "react-redux";
import Actions from "./../actions/recipes";
import AddRecipes from "../components/AddRecipes";

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.recipes.recipes,
    addSuccessfully: state.recipes.addSuccessfully,
    localStorageRecipesError: state.recipes.localStorageRecipesError,
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch, state) => {
  return {
    addRecipe: (params) => dispatch(Actions["RECIPES/ADDED_NEW_RECIPE"](params)),
    reset: () => dispatch(Actions["RECIPES/RESET_EDIT"]()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipes);
