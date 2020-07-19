import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ReactPlayer from "react-player";
import { deletInVideoList } from "../store/actions";
import PlayList from "./PlayList";

const useStyle = makeStyles({
  root: {
    margin: "10px",
    width: "98%",
  },
});

export default function VedioDisplay(props) {
  const { state, dispatch } = props;
  const [currentVedio, setCurrentVedio] = useState(
    state.find((video) => video.current)
  );
  const classes = useStyle();
  useEffect(() => {
    let currentVedio = state.find((video) => video.current);
    setCurrentVedio(currentVedio);
  }, [state]);
  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item xs={12} lg={8}>
        <ReactPlayer
          width="inherit"
          height="432px"
          url={currentVedio ? currentVedio.url : ""}
          controls
          playing={true}
          onEnded={() => dispatch(deletInVideoList(currentVedio.id))}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <PlayList state={state} dispatch={dispatch} />
      </Grid>
    </Grid>
  );
}
