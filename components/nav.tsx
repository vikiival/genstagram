import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useFarcasterIdentity } from "@/utils/use-farcaster-identity"
import { Auth } from "./auth"
import { ChannelSwitch } from "./channel-change"
import { LoginWindow } from "./login-window"
import { ThemeToggle } from "./theme-toggle"

export function Nav({ setChannel }: any) {
  const { farcasterUser, loading, startFarcasterSignerProcess, logout } =
    useFarcasterIdentity();

  return (
    <div className="flex justify-between w-full items-center sm:w-full max-w-3xl mt-6">
      <Dialog>
        <div className="flex flex-col">
          <h1 className="font-display sm:text-4xl text-3xl">genstagram</h1>
          <p>
            powered by{" "}
            <a
              href="https://koda.art"
              className="underline text-md sm:text-lg"
              target="_blank"
            >
              koda.art
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <ChannelSwitch setChannel={setChannel} />
          <ThemeToggle />
          <Auth />
        </div>
        <DialogContent className="sm:max-w-[425px] max-w-[375px]">
        <DialogTitle className="DialogTitle">Edit profile</DialogTitle>
          <LoginWindow
            farcasterUser={farcasterUser}
            loading={loading}
            startFarcasterSignerProcess={startFarcasterSignerProcess}
            logout={logout}
          ></LoginWindow>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}
