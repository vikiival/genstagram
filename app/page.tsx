"use client";
import { useState } from "react";
import UploadForm from "@/components/upload-form";
import Feed from "@/components/feed";
import { LoginWindow } from "@/components/login-window";
import { useFarcasterIdentity } from "@/utils/use-farcaster-identity";
import type { FarcasterUser } from "@/utils/types/farcaster-user";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/nav";
// import People from "@/components/people"
import RankedFeed from "@/components/ranked-feed"

export default function Page({}: {
  searchParams: Record<string, string>;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState(
    // "chain://eip155:8453/erc721:0xe7a43b5942f15fddeb9733fdcc57c6232f1d5aa0",
    "gen-art"
  );

  const { farcasterUser, loading, startFarcasterSignerProcess, logout } =
    useFarcasterIdentity();

  return (
    <div className="flex flex-col min-h-screen w-full sm:px-0 px-3 justify-center items-center gap-6 mb-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <Nav setChannel={setChannel} />
        <Separator className="sm:w-full w-sm max-w-3xl" />
        {/* <DialogTrigger asChild>
          <Button className="sm:w-[500px] w-full mt-4" variant="outline">
            +
          </Button>
        </DialogTrigger> */}
        {/* <Feed channel={channel} setChannel={setChannel} /> */}
        {/* <People channel={channel} setChannel={setChannel} /> */}
        <RankedFeed channel={channel} setChannel={setChannel} />
        <DialogContent className="sm:max-w-[425px] max-w-[375px]">
          {farcasterUser?.status === "approved" ? (
            <UploadForm farcasterUser={farcasterUser as FarcasterUser} />
          ) : (
            <LoginWindow
              farcasterUser={farcasterUser}
              loading={loading}
              startFarcasterSignerProcess={startFarcasterSignerProcess}
              logout={logout}
            ></LoginWindow>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
