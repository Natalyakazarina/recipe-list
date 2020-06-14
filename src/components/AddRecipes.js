import React, { useEffect } from "react";
import {Redirect} from 'react-router-dom';

import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles/index";
import EditAddForm from "./EditAddForm";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "500px",
    backgroundColor: "#508cf9",
    marginTop: "5%",
    width: "1860px",
    marginRight: "10px",
  },
  texts: {
    width: "600px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
});

function AddRecipes({
  addRecipe,
  errorMessage,
  addSuccessfully,
  reset,
}) {
  const classes = useStyles();

  useEffect(() => {
    if (errorMessage) {
      alert("Something went wrong. Try again later.");
    }
  }, [errorMessage]);

  if (addSuccessfully) {
    reset();
    return <Redirect to="/recipes" />;
  }

  return (
    <Container className={classes.container}>
      <div>
        <EditAddForm onSubmit={addRecipe}  />
      </div>
    </Container>
  );
}

AddRecipes.propTypes = {
  errorMessage: PropTypes.string,
  addRecipe: PropTypes.func,
  reset: PropTypes.func,
  addSuccessfully: PropTypes.bool,
};

export default AddRecipes;
