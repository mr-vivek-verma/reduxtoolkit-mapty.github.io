import {
  createSlice
} from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    data: [],
    status: false,
    obj: {
      type: null,
      distance: null,
      duration: null,
      cadence: null,
      marker : null,
      message : null,
    },
    marker:[]
  },
  reducers: {
    add(state, action) {
      state.status = action.payload.status;
      state.marker = action.payload.marker;
      state.obj.type = action.payload.type;
      state.obj.distance = action.payload.distance;
      state.obj.duration = action.payload.duration;
      state.obj.cadence = action.payload.cadence;
      state.obj.marker = action.payload.marker;
      state.obj.message = action.payload.message;
      if (
        !action.payload.status &&
        action.payload.distance.length > 0 &&
        action.payload.duration.length > 0 &&
        action.payload.cadence.length > 0
      ) {
        state.data.push(action.payload);
      }
    },
    remove(state, action) {
      state.data = [];
      state.status = false;
      state.obj = {
        type: null,
        distance: null,
        duration: null,
        cadence: null,
        marker : null,
        message : null,
      };
      state.marker=[]
    },
  },
});

export const {
  add,
  remove
} = mapSlice.actions;
export default mapSlice.reducer;