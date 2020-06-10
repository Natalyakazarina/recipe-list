import {connect} from 'react-redux';
import App from "./../App";

const mapStateToProps = state => {
  return {
    items: state.recipes.recipes,
  }
};

export default connect(
  mapStateToProps,
  null
)(App);
