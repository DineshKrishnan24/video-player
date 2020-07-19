import * as types from "./ActionTypes";

export function addToVideoList(url) {
  return {
    type: types.ADD_VIDEO,
    payload: {
      url,
    },
  };
}

export function deletInVideoList(id, isNextPlay = true) {
  return {
    type: types.DELETE_VIDEO,
    payload: {
      id,
      isNextPlay,
    },
  };
}

export function changePlayVideo(id) {
  return {
    type: types.CHANGE_PLAY_VIDEO,
    payload: {
      id,
    },
  };
}

export function reorderVideoList(currentId, newId) {
  return {
    type: types.CHANGE_ORDER,
    payload: {
      currentId: currentId - 1,
      newId: newId - 1,
    },
  };
}
