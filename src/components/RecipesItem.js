import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import Recipes from "../containers/Recipes";

function RecipesItem({ recipeData, fetchRecipeData, fetchRecipeDataError }) {
  let {currentRecipeId: id} = useParams();

  useEffect(() => {
    fetchRecipeData();
  }, []);

  useEffect(() => {
    if (fetchRecipeDataError) {
      alert(fetchRecipeDataError);
    }
  }, [fetchRecipeDataError]);

  return (
    <Container>
      <Typography variant="h4">Recipe Data</Typography>
      {recipeData && (
        <Card variant="outlined">
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
      <Recipes currentRecipeId={+id} />
    </Container>
  );
}

RecipesItem.propTypes = {
  fetchRecipeData: PropTypes.func.isRequired,
  recipeData: PropTypes.object,
  fetchRecipeDataError: PropTypes.string,
};

export default RecipesItem;
