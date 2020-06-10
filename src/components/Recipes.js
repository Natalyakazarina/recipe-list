import React, { useEffect } from "react";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles/index";
import { NavLink } from "react-router-dom";
import EditAddForm from "./EditAddForm";

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
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function Recipes({
  items,
  onItemRemove,
  fetchRecipes,
  localStorageRecipesError,
  openEditForm,
  closeEditForm,
  isEditFormVisible,
  id,
  addRecipe,
}) {

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    if (localStorageRecipesError) {
      alert(localStorageRecipesError);
    }
  }, [localStorageRecipesError]);

  const classes = useStyles();

  function remove(id) {
    if (window.confirm("Are you sure?")) {
      onItemRemove(id);
    }
  }

  function openForm() {
    openEditForm();
  }

  return (
    <Container className={classes.container}>
      {items.length === 0 && (
        <div>
          <h2 className="text-recipes">
            There are no recipes in your database!
          </h2>
          <img className="picture" src="zhdun.jpg" alt="zhdun" />
        </div>
      )}
      {items.length > 0 && <h2 className="recipe-list">Recipe List</h2>}
      {
        <React.Fragment>
          <Dialog
            open={isEditFormVisible}
            onClose={closeEditForm}
            aria-labelledby="form-dialog-title"
          >
            <EditAddForm />
          </Dialog>
        </React.Fragment>
      }

      <ul className="list-group">
        {items.map(({ id, name, description }) => (
          <li
            key={id}
            className="list-group-item justify-content-between align-items-center"
          >
            <div className={classes.header}>
              <h3>{name}</h3>
              <div className="btn btn-group">
                <button className="btn btn-outline-success" onClick={openForm}>
                  Edit This Recipe
                </button>
                <button className="btn btn-outline-primary">
                  <NavLink className="nav-link" to={`/recipes/${id}`}>
                    Show details
                  </NavLink>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={remove.bind(this, id)}
                >
                  Remove This Recipe
                </button>
              </div>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

Recipes.propTypes = {
  items: PropTypes.array,
  onItemRemove: PropTypes.func.isRequired,
  fetchRecipes: PropTypes.func,
  fetchRecipesErrorMessage: PropTypes.string,
};

export default Recipes;