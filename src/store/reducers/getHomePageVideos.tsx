import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from ".."
import axios from "axios"
import { YOUTUBE_API_URL } from "../../utils/data"
import { HomePageVideos } from "../../types"
import { parseData } from "../../utils"

const API_KEY = 'AIzaSyA6WeBdDTcQ86pvxgLbDIZ9QIIgflGyIg4'

export const getHomePageVideos = createAsyncThunk(
  "clonetubeApp/homePageVidoes",
  async (isNext: boolean, { getState }) => {
    const {
      clonetubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    )
    const parsedData: HomePageVideos[] = await parseData(items)
    return { parsedData: [...videos, ...parsedData], nextPageToken }
  }
)