import {connect} from 'react-redux';
import Actions from "./../actions/recipes";
import RecipesItem from "../components/RecipesItem";

const mapStateToProps = state => {
  return {
    recipeData: state.recipes.recipeData,
    fetchRecipeDataError: state.recipes.fetchRecipeDataError,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipeData: (id) => dispatch(Actions["RECIPES/FETCH_RECIPE_DATA"](id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipesItem);