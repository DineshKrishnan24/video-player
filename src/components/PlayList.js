import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  makeStyles,
  IconButton,
  GridList,
  GridListTile,
  ListSubheader,
} from "@material-ui/core";

import {
  changePlayVideo,
  reorderVideoList,
  deletInVideoList,
} from "../store/actions";
import { CloseRounded, PlayCircleFilledRounded } from "@material-ui/icons";

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  thumbnail: {
    height: "100%",
    width: "100%",
  },
  list: {
    height: "432px",
  },
  dragger: {
    cursor: "dragger",
  },
});

const handleDragStart = (e, vedioId) => {
  e.dataTransfer.setData("id", vedioId);
};

const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e, vedioId, dispatch) => {
  dispatch(reorderVideoList(e.dataTransfer.getData("id"), vedioId));
};

export default function PlayList(props) {
  const classes = useStyle();
  const { state, dispatch } = props;
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={98}
        className={state.length > 3 && classes.list}
        cols={3}
      >
        <GridListTile key="Subheader" cols={3} style={{ height: "50px" }}>
          <ListSubheader component="div">
            Play List (Autoplay / Re-order / Play Any)
          </ListSubheader>
        </GridListTile>
        {state.map((vedio) => {
          return (
            <GridListTile key={vedio.id} cols={3}>
              <Card
                onClick={() => {
                  dispatch(changePlayVideo(vedio.id));
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, vedio.id)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, vedio.id, dispatch)}
                className={classes.dragger}
              >
                <Grid container>
                  <Grid item xs={4}>
                    <CardMedia
                      className={classes.thumbnail}
                      image={vedio.thumbnail}
                      title={`Video ${vedio.id}`}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardActionArea>
                      <IconButton
                        aria-label="delete"
                        style={{ float: "right", padding: "0px" }}
                        onClick={() =>
                          dispatch(deletInVideoList(vedio.id, false))
                        }
                      >
                        <CloseRounded fontSize="small" />
                      </IconButton>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Video {vedio.id}{" "}
                          {vedio.current && (
                            <PlayCircleFilledRounded fontSize="small" />
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          noWrap
                        >
                          {vedio.url}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Grid>
                </Grid>
              </Card>
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}
