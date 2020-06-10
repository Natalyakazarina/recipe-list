import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, NavLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import RecipeForm from "./components/RecipeForm";
import AddRecipes from "./containers/AddRecipes";
import Recipes from "./containers/Recipes";
import RemoveRecipes from "./containers/RemoveRecipes";
import RecipesItem from "./containers/RecipesItem";

import ParticleComponent from "./components/ParticleComponent";

const useStyles = makeStyles({
  root: {
    display: "flex",
    marginLeft: "10px",
  },
  paper: {
    backgroundColor: "#937aea",
    marginTop: "5%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "500px",
    margin: "auto",
    height: "500px",
  },
  list: {
    paddingLeft: "10px",
  },
  color: {
    backgroundColor: "#1dd293",
    width: "300px",
  },
});

function App({ items }) {
  // if (items.length === 0) {
  //   alert("Array is empty");
  // }

  const classes = useStyles();

  return (
    <div className="wrapper">
      <ParticleComponent />
      <div className="overlay">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <MenuList className={classes.list}>
              <MenuItem>
                <FontAwesomeIcon className="icon" icon={faUtensils} />
                <NavLink
                  className="nav-links"
                  activeClassName="active"
                  to="/"
                  exact
                >
                  <Typography variant="h6">
                    Free Code Camp Recipe Box
                  </Typography>
                </NavLink>
              </MenuItem>

              <MenuItem>
                <NavLink
                  className="nav-links"
                  activeClassName="active"
                  to="/add-recipes"
                >
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.color}
                  >
                    Add a New Recipe
                  </Button>
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink
                  className="nav-links"
                  activeClassName="active"
                  to="/recipes"
                >
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.color}
                  >
                    Show All Recipes
                  </Button>
                </NavLink>
              </MenuItem>
              <MenuItem>
                <RemoveRecipes />
              </MenuItem>
              <MenuItem>
                <NavLink className="nav-links" activeClassName="active" to="/">
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.color}
                  >
                    Hide All Recipes
                  </Button>
                </NavLink>
              </MenuItem>
              <div className="render-recipes">
                {items.map(({ index, name }) => (
                  <div key={index}>
                    <button className="btn btn-outline-light">{name}</button>
                  </div>
                ))}
              </div>
            </MenuList>
          </Paper>
          <Switch>
            <Route exact path="/">
              <RecipeForm />
            </Route>
            <Route path="/add-recipes">
              <AddRecipes />
            </Route>
            <Route path="/recipes" exact>
              <Recipes />
            </Route>
            <Route path="/recipe-item/:currentRecipeId">
              <RecipesItem />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
