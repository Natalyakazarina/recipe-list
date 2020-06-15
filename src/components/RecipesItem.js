import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles/index";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import Recipes from "../containers/Recipes";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "500px",
    backgroundColor: "#508cf9",
    marginTop: "5%",
    width: "1860",
    marginRight: "10px",
  },
  typography: {
    textAlign: "center",
    fontStyle: "italic",
    color: "rgb(255, 255, 255)",
  },
  cards:{
    borderRadius: "20%",
    marginTop: "10%",
    color: "teal",
  }
});

function RecipesItem({ recipeData, fetchRecipeData, fetchRecipeDataError }) {
  let { currentRecipeId: id } = useParams();

  useEffect(() => {
    fetchRecipeData(id);
  }, []);

  useEffect(() => {
    if (fetchRecipeDataError) {
      alert(fetchRecipeDataError);
    }
  }, [fetchRecipeDataError]);

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className="main-block">
        <Typography variant="h4" className={classes.typography}>
          Recipe Data
        </Typography>
        {recipeData && (
          <Card variant="outlined" className={classes.cards}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {recipeData.name}
              </Typography>
              <Typography color="textSecondary">
                {recipeData.description}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </Container>
  );
}

RecipesItem.propTypes = {
  fetchRecipeData: PropTypes.func.isRequired,
  recipeData: PropTypes.object,
  fetchRecipeDataError: PropTypes.string,
};

export default RecipesItem;
