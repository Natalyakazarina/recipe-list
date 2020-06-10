import { connect } from "react-redux";
import RemoveRecipes from "../components/RemoveRecipes";
import Actions from "./../actions/recipes";

const mapStateToProps = (state) => {
  return {
    items: state.recipes.recipes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAll: () => dispatch(Actions["RECIPES/ALL_REMOVE"]()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveRecipes);
