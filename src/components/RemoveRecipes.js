import React from "react";

import Button from "@material-ui/core/Button";

function RemoveRecipes({ items, clearAll }) {
  function clear(e) {
    if (window.confirm("Are you sure?")) {
      clearAll();
    }
  }

  return (
    <div>
      {items.length > 0 && (
        <Button className="removed"
          variant="contained"
          onClick={clear}
          color="secondary"
          disableElevation
        >
          Remove All Recipes
        </Button>
      )}
    </div>
  );
}

export default RemoveRecipes;
