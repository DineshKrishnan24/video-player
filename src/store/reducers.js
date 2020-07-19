import * as types from "./ActionTypes";

export default function reducers(state, action) {
  const newVideos = [...state];
  switch (action.type) {
    case types.ADD_VIDEO:
      let vedioId = action.payload.url
        .split(/v\/|v=|youtu\.be\//)[1]
        .split(/[?&]/)[0];
      newVideos.push({
        id: state.length + 1,
        url: action.payload.url,
        current: state.length === 0,
        vedioId,
        thumbnail: `https://img.youtube.com/vi/${vedioId}/hqdefault.jpg`,
      });
      localStorage.setItem("vedios", JSON.stringify(newVideos));
      return newVideos;
    case types.DELETE_VIDEO:
      const newState = newVideos.filter(
        (video) => video.id !== action.payload.id
      );
      newState.forEach((video, i) => (video.id = i + 1));
      if (newState.length > 0 && action.payload.isNextPlay)
        newState[0].current = true;
      localStorage.setItem("vedios", JSON.stringify(newState));
      return newState;
    case types.CHANGE_PLAY_VIDEO:
      newVideos.forEach((video, i) => {
        if (video.id === action.payload.id) video.current = true;
        else video.current = false;
      });
      localStorage.setItem("vedios", JSON.stringify(newVideos));
      return newVideos;
    case types.CHANGE_ORDER:
      const { currentId, newId } = action.payload;
      [newVideos[currentId], newVideos[newId]] = [
        newVideos[newId],
        newVideos[currentId],
      ];
      localStorage.setItem("vedios", JSON.stringify(newVideos));
      return newVideos;
  }
}
