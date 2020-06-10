import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles/index";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";

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
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    margin: "auto",
    fontSize: "20px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
});

const EditAddForm = ({ items, addRecipe, editRecipe, match, reset, addSuccessfully, currentRecipe, currentRecipeId }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // const id = + match.params.currentRecipeId;
  // const currentRecipe = items.find((item) => item.id === id);


  useEffect(
    (e) => {
      if (currentRecipe) {
        setName(currentRecipe.name);
        setDescription(currentRecipe.description);
      }
    },
    [currentRecipe]
  );

  const AddRecipeSubmit = (values) => {
    addRecipe(values);
  }

  const EditRecipeSubmit = (values) => {
    editRecipe({ ...values, currentRecipeId })
  }

  const submit = (e, values) => {
    e.preventDefault(e)
    if (match.params.hasOwnProperty('currentRecipeId')) EditRecipeSubmit(values)
    else AddRecipeSubmit(values)
  }

  if (addSuccessfully) {
    reset();
    return <Redirect to="/recipes" />;
  }

  function clearForm() {
    setName("");
    setDescription("");
  }
  
  function addField(name, e) {
    switch (name) {
      case "Name":
        setName(e.target.value);

        break;
      case "Description":
        setDescription(e.target.value);
        break;
      default:
        alert("Нет таких значений");
    }
  }

  return (
    <div>
      <form>
        <div className="add-form">
          <DialogContent>
            <label className="label" htmlFor="name">
              Name
            </label>
            <TextField
              className={classes.texts}
              onChange={addField.bind(this, "Name")}
              autoFocus
              margin="dense"
              id="name"
              placeholder={`Enter Name`}
              type="text"
              fullWidth
              value={name}
              variant="outlined"
            />
            <label className="label" htmlFor="description">
              Description
            </label>
            <TextField
              className={classes.texts}
              id="description"
              multiline
              rowsMax={6}
              value={description}
              onChange={addField.bind(this, "Description")}
              placeholder={`Enter Description`}
              variant="outlined"
            />

            <div className="buttons-changes">
              <button type="reset" className="changes btn btn-danger">
                <NavLink className="Navlinks" to={`/recipes`}>
                  Cancel
                </NavLink>
              </button>
              <button
                type="reset"
                className="changes btn btn-secondary"
                onClick={clearForm.bind(this)}
              >
                Reset
              </button>
              <button
                type="submit"
                className="changes btn btn-success"
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </DialogContent>
        </div>
      </form>
    </div>
  );
};

EditAddForm.propTypes = {
  submit: PropTypes.func,
  items: PropTypes.object,
};

export default EditAddForm;
