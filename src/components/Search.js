import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import { addToVideoList } from "../store/actions";

const useStyle = makeStyles({
  header: {
    height: "10%",
    background: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: "12px",
    marginLeft: "25px",
  },
});

const isValidUrl = (url, state) => {
  return (
    /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/g.test(url) &&
    !state.some((vedio) => vedio.url === url)
  );
};

const isAlreadyAdded = (state) => {
  return state;
};

export default function Search(props) {
  const classes = useStyle();
  const { state, dispatch } = props;
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  return (
    <>
      <Grid className={classes.header}>
        <Typography variant="h5" align="center">
          Video Player
        </Typography>
      </Grid>
      <Grid align="center">
        <TextField
          style={{ width: "25%" }}
          label="You Tube Link"
          error={error}
          value={url}
          helperText={error ? "Invalid url or Already exist" : ""}
          onChange={(e) => setUrl(e.target.value)}
        ></TextField>
        <Button
          color="primary"
          className={classes.button}
          startIcon={<AddRounded />}
          variant="contained"
          onClick={() => {
            if (isValidUrl(url, state)) {
              setError(false);
              dispatch(addToVideoList(url));
              setUrl("");
            } else {
              setError(true);
            }
          }}
        >
          Add
        </Button>
      </Grid>
    </>
  );
}
