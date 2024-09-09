import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react"
import { useState } from "react"

export function DynamicImage({ image, author, text, timestamp, pfp }: { image: string; author: string; text: string, timestamp: string; pfp: string }) {
  const [imageUrl, setImageUrl] = useState(pfp)
  const [error, setError] = useState(false)

  const handleImageError = () => {
    setError(true)
    setImageUrl("/placeholder.webp")
  }

  if (error) {
    return null
  }

  return (
    <Card key={image} className="w-full overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
        <div className="relative pb-[100%]">
                    <img
                      alt={`Post by ${author}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      src={image}
                    />
                  </div>
        </div>
        <div className="md:w-1/2 flex flex-col">
          <CardHeader className="flex-row items-center gap-4 p-4">
            <Avatar>
              <AvatarImage alt={author} src={imageUrl} />
              <AvatarFallback>{author}</AvatarFallback>
            </Avatar>
            <div className="font-semibold">{author}</div>
          </CardHeader>
          <CardContent className="p-4 flex-grow overflow-auto">
            <div className="text-sm">
              <span className="font-semibold">{author}</span> {text}
            </div>
            <div className="mt-4 space-y-2">
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4 border-t">
            <div className="flex items-center gap-4 w-full">
              <Button size="icon" variant="ghost">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Like</span>
              </Button>
              <Button size="icon" variant="ghost">
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Comment</span>
              </Button>
              <Button size="icon" variant="ghost">
                <Send className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              <Button size="icon" variant="ghost" className="ml-auto">
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Save</span>
              </Button>
            </div>
            <div className="mt-2 text-sm font-semibold">0 likes</div>
            <div className="mt-4 flex w-full items-center gap-2">
              <Input placeholder="Add a comment..." className="flex-grow" />
              <Button size="sm">Post</Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  )

  // if (image.includes("/ipfs")) {
  //   let rawUrl = new URL(image);
  //   rawUrl.search = "";

  //   return (
  //     <div>
  //       <div className="relative flex flex-col gap-2">
  //         <DialogTrigger>
  //           <Expand className="absolute opacity-60 bottom-2 right-2" />
  //         </DialogTrigger>
  //         <TooltipProvider>
  //           <Tooltip>
  //             <TooltipTrigger asChild>
  //               <img
  //                 src={imageUrl}
  //                 className="object-cover sm:max-w-[500px]"
  //                 alt="image"
  //                 onError={handleImageError}
  //               />
  //             </TooltipTrigger>
  //             <TooltipContent>
  //               <p className="sm:max-w-[500px] max-w-screen">{text}</p>
  //             </TooltipContent>
  //           </Tooltip>
  //         </TooltipProvider>
  //       </div>
  //       <p className="font-bold text-gray-500">@{author}</p>
  //       <DialogContent className="sm:max-h-screen sm:max-w-screen max-w-screen max-h-screen overflow-scroll">
  //         <img
  //           src={rawUrl.toString()}
  //           className="object-scale-down m-auto max-w-screen max-h-screen"
  //           alt="image"
  //           onError={handleImageError}
  //         />
  //       </DialogContent>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="flex flex-col gap-2">
  //       <TooltipProvider>
  //         <Tooltip>
  //           <TooltipTrigger asChild>
  //             <img
  //               src={imageUrl}
  //               className="object-cover sm:max-w-[500px]"
  //               alt="image"
  //               onError={handleImageError}
  //             />
  //           </TooltipTrigger>
  //           <TooltipContent>
  //             <p className="sm:max-w-[500px] max-w-screen">{text}</p>
  //           </TooltipContent>
  //         </Tooltip>
  //       </TooltipProvider>

  //       <p className="font-bold text-gray-500">@{author}</p>
  //     </div>
  //   );
}
