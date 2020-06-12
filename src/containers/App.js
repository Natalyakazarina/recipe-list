import {connect} from 'react-redux';
import App from "./../App";
import Actions from "../actions/recipes";

const mapStateToProps = state => {
  return {
    items: state.recipes.recipes,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipes: () => dispatch(Actions["RECIPES/FETCH_RECIPES"]()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
