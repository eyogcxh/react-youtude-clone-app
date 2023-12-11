import { configureStore, createSlice } from "@reduxjs/toolkit"
import { InitialState } from "../types"
import { getHomePageVideos } from "./reducers/getHomePageVideos"

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: '',
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: []
}

const CloneTudeSlice = createSlice({
  name: 'clonetubeApp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData
      state.nextPageToken = action.payload.nextPageToken
    })
  },
})

export const store = configureStore({
  reducer: {
    clonetubeApp: CloneTudeSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch