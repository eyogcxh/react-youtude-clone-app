import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."
import { RecommendedVideos } from "../../types"
import { YOUTUBE_API_URL } from "../../utils/data"
import { parseRecommendedData } from "../../utils"

const API_KEY = 'AIzaSyA6WeBdDTcQ86pvxgLbDIZ9QIIgflGyIg4'

export const getRecommendedVideos = createAsyncThunk(
  "clonetubeApp/getRecommendedVideos",
  async (videoId: string, { getState }) => {
    const {
      clonetubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState() as RootState;

    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    )

    const parsedData: RecommendedVideos[] = await parseRecommendedData(
      items,
      videoId
    )

    return { parsedData }
  }
)