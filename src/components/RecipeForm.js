import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles/index";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    backgroundColor: "#508cf9",
    marginTop: "5%",
    textAlign: "center",
    width: "1860",
    marginRight: "10px",
  },
  title: {
    marginBottom: "10%",
    fontSize:"3rem",
  },
  heading: {
    fontSize:"2rem",
  },
  fonts: {
    fontSize:"1rem",
    fontWeight: "400px",
    marginTop: "5%",
  },
});

function RecipeForm() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className="main-block">
        <Typography variant="h2" className={classes.title}>
          This is a Recipe App
        </Typography>
        <Typography variant="h4" className={classes.heading}>You can record your recipes here</Typography>
        <Typography variant="h6" className={classes.fonts}>
          All your recipes are stored in your browser's local storage and any
          changes you make will remain saved as long as you continue to access
          this page from the same browser.
        </Typography>
      </div>
    </Container>
  );
}

export default RecipeForm;
