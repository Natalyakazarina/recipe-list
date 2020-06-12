import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles/index";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";
import {  useParams } from "react-router-dom";


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

const EditAddForm = ({onSubmit, item}) => {
  const classes = useStyles();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  let {currentRecipeId: id} = useParams();

  useEffect(
    (e) => {
      if (item) {
        setName(item.name);
        setDescription(item.description);
      }
    },
    [item]
  );

  // const AddRecipeSubmit = (values) => {
  //   addRecipe(values);
  // }

  // const EditRecipeSubmit = (values) => {
  //   editRecipe({ ...values, currentRecipeId })
  // }

  const submit = (e) => {
    e.preventDefault(e);

    const obj = {};
    obj.name = name;
    obj.description = description;

    if (item) {
      obj.id = item.id;
    }

    onSubmit(obj);
  }

  // if (addSuccessfully) {
  //   reset();
  //   return <Redirect to="/recipes" />;
  // }

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
      <form onSubmit={submit}>
        <div className="add-form">
          <DialogContent>
            <label className="label" htmlFor="name">
              Name
            </label>
            <TextField
              required
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
              required
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
  onSubmit: PropTypes.func,
  item: PropTypes.object,
};

export default EditAddForm;
