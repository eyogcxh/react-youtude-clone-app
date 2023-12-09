import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from ".."
import axios from "axios"
import { YOUTUBE_API_URL } from "../../utils/data"
import { HomePageVideos } from "../../types"

const API_KEY = 'AIzaSyBok2oCIDrRXk3wNrwScUSRKTzTUgmj3LY'

export const getHomePageVideos = createAsyncThunk('clonetubeApp/homePageViseos',
 async (isNext: boolean, { getState }) => {
    const {
      clonetubeApp: { nextPageToken: nextPageTokenState, videos },
    } = getState() as RootState;
    const { data: { items, nextPageToken } } = await axios.get(`${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
      isNext ? `pageToken=${nextPageTokenState}` : ""}`
    )
    const parsedData: HomePageVideos[] = await parseData(items)
  }
)