import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React from "react";

export default function LinkButtons() {
  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button>
        <Link
          className="navigationButton"
          to="/">
          New query
        </Link>
      </Button>
      <Button>
        <Link
          className="navigationButton"
          to="/allUserQueries">
          I want to see all my queries
        </Link>
      </Button>
    </ButtonGroup>
  );
}
