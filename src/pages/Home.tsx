import { useEffect } from "react"

import { HomePageVideos } from "../types"

import { clearVideos } from "../store"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { getHomePageVideos } from "../store/reducers/getHomePageVideos"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import InfiniteScroll from "react-infinite-scroll-component"
import Spinner from "../components/Spinner"
import Card from "../components/Card"

const Home = () => {
  const dispatch = useAppDispatch()
  const videos = useAppSelector((state) => state.clonetubeApp.videos)

  useEffect(() => {
    return () => {
      dispatch(clearVideos())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getHomePageVideos(false))
  }, [dispatch])

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>  
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
        <InfiniteScroll 
          dataLength={videos.length}
          next={() => dispatch(getHomePageVideos(true))}
          hasMore={videos.length < 500}
          loader={<Spinner />}
          height={650}
        >
          <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
            {videos.map((item: HomePageVideos) => (
              <Card
                key={item.videoId} 
                data={item} 
              />
            ))}
          </div>
        </InfiniteScroll> 
        ) : <Spinner />}
      </div>
    </div>
  )
}

export default Home 