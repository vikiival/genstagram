"use client"

import React, { useState, useEffect } from "react"
import FeedCard from "./feed-card"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Feed({ channel }: any) {
  const [feed, setFeed]: any = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextPageToken, setNextPageToken] = useState("")

  async function fetchData(nextPage: any, initialLoad: boolean) {
    try {
      if (initialLoad) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }
      const data = JSON.stringify({
        channel: channel,
        nextPage: nextPage,
      })
      const feedData = await fetch("/api/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
      const feed = await feedData.json()

      const isEmbedValid = (item: any) => item.castAddBody.embeds[0]?.url
      const isUrlValid = (item: any) =>
        !item.castAddBody.embeds[0]?.url.includes("stream.warpcast.com")

      const filteredFeed = feed.filter(
        (item: any) =>
          isEmbedValid(item) && isUrlValid(item),
      )

      setFeed((prevFeed: any) => [...prevFeed, ...filteredFeed])
      setNextPageToken(feed[0].pageToken)
      setLoading(false)
      setLoadingMore(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setLoadingMore(false)
    }
  }

  function refetchData() {
    fetchData(nextPageToken, false)
  }

  useEffect(() => {
    setFeed([]) // Clear the feed state
    fetchData("", true)
  }, [channel])

  return (
    // <div className="mt-1 flex  flex-col items-center justify-start">
    <div className="min-h-screen container mx-auto px-4 py-8">
     {loading ? (
        <Loader2 className=" mt-1 mx-auto h-16 w-16 animate-spin" />
      ) : (
          // {/* <ScrollArea className="h-[calc(80vh-1rem)] w-full max-w-3xl mx-auto"> */}
            <div className="flex flex-col space-y-8">
              {feed ? (
                feed.map((item: any, index: any) => (
                  <FeedCard
                    key={index}
                    image={item.castAddBody.embeds[0].url}
                    author={item.fid || "anon"}
                    text={item.castAddBody.text}
                    timestamp={item.timestamp}
                    pfp={item.pfp}
                  />
                ))
              ) : (
                <h1>Failed to fetch Posts</h1>
              )}
              {loadingMore ? (
                <Button disabled>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              ) : (
                <Button variant="secondary" onClick={refetchData}>
                  More
                </Button>
              )}
        </div>
      )}
    </div>
  )
}
