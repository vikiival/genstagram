import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";

type FeedCardProps = {
  image: string;
  author: string;
  text: string;
  timestamp: string;
  pfp: string;
  fid?: number;
  user?: any;
  score?: number;
  calculateRank?: boolean;
};

export function DynamicImage(
  { image, author, text, timestamp, pfp, user, calculateRank, fid }: FeedCardProps,
) {
  const [imageUrl, setImageUrl] = useState(pfp);
  const [error, setError] = useState(false);

  const [rank, setRank] = useState<any>(0);
  const [top, setTop] = useState<number>(0);

  const handleImageError = () => {
    setError(true);
    setImageUrl("/placeholder.webp");
  };

  if (error) {
    return null;
  }

  async function fetchRank(handle: string) {
    try {
      if (!handle) {
        return;
      }
      const feedData = await fetch(`/api/rank?user=${handle}`);
      const ranks = await feedData.json();
      console.log(ranks);
      const scoring = ranks.at(0);
      if (scoring) {
        setRank(scoring.rank);
        setTop(100 - Number(scoring.percentile));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (calculateRank && user.username) {
      fetchRank(user.username);
    }
  }, [calculateRank, user.username]);

  return (
    <Card key={image} className="w-full max-w-3xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full sm:w-1/2">
          <div className="relative pb-[100%]">
            <img
              alt={`Post by ${author}`}
              className="absolute inset-0 h-full w-full object-cover"
              src={image}
              onError={handleImageError}
            />
          </div>
        </div>
        <div className="sm:w-1/2 flex flex-col">
          <CardHeader className="flex-row items-center gap-4 p-4">
            <Avatar>
              <AvatarImage alt={author} src={imageUrl} />
              <AvatarFallback>{author}</AvatarFallback>
            </Avatar>
            <div className="font-semibold">{author}
              {rank ? (
                <span className="text-gray-500"> (#{rank})</span>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow overflow-auto">
            <div className="text-sm">
              {/* <span className="font-semibold">{author}</span>  */}
              {text}
            </div>
            <div className="mt-4 space-y-2">
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start p-4 border-t">
            <div className="flex items-center gap-4 w-full">
              <Button disabled size="icon" variant="ghost">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Like</span>
              </Button>
              <Button disabled size="icon" variant="ghost">
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Comment</span>
              </Button>
              <Button disabled size="icon" variant="ghost">
                <Send className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              <Button disabled size="icon" variant="ghost" className="ml-auto">
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Save</span>
              </Button>
            </div>
            {user
              ? (
                <>
                  <div className="mt-2 text-sm font-semibold">
                    {user.followerCount} followers
                  </div>
                  <div className="mt-2 text-sm font-semibold">
                    {user.followingCount} following
                  </div>
                </>
              )
              : null}
                        {top
              ? (
                <div className="mt-2 text-sm font-semibold">
                  {top} % of Farcaster users
                </div>
              )
              : null}
            {/* <div className="mt-4 flex w-full items-center gap-2">
              <Input placeholder="Add a comment..." className="flex-grow" />
              <Button size="sm">Post</Button>
            </div> */}
          </CardFooter>
        </div>
      </div>
    </Card>
  );

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
